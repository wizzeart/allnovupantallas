import { Category } from "@/components/Footer/footer";
import { FloatingNabvar } from "@/components/navbar/floatingNavbar";
import ProductsComponent from "@/components/products/productsComponent";
import { Hero } from "@/components/ui/hero";

export interface Products {
    id: number,
    nombre: string,
    precio: number,
    categoria: string,
    galleryImageUrls: string[],
    caracteristicas: string,
    description: string,
}

export interface Products2 {
    id: number,
    nombre: string,
    precio: number,
    imagenUrl: string
    categoria?: string,
    relatedProducts: Products2[],
    galleryImageUrls: string[],
    descripcionCorta?: string,
    descripcion?: string,
}

export interface PageParams {
    params: { slug: string }
    searchParams: { [key: string]: string | undefined }
}


export const revalidate = 30;

export default async function ProductsPage({ searchParams }: PageParams) {
    const resolvedSearchParams = await searchParams;
    const categoriaParam = resolvedSearchParams['categoria'] || '10';

    try {
        const categoriasResponse = await fetch('https://allnovu.com/gestion/api/categorias', {
            next: {
                revalidate: 3600,
                tags: ['categorias']
            }
        });

        if (!categoriasResponse.ok) {
            throw new Error(`Error HTTP: ${categoriasResponse.status}`);
        }

        const categorias = await categoriasResponse.json();

        if (!Array.isArray(categorias)) {
            throw new Error('Formato de categorías incorrecto');
        }

        const categoriaEncontrada = categorias.find((cat: Category) =>
            cat.id.toString() === categoriaParam
        );

        if (!categoriaEncontrada) {
            throw new Error(`Categoría ${categoriaParam} no encontrada`);
        }


        const [categoriaProductsRes, allProductsRes] = await Promise.all([

            fetch(`https://allnovu.com/gestion/api/categorias/${categoriaEncontrada.id}/products`, {
                next: {
                    revalidate: 30, // 30 segundos - productos frescos
                    tags: [`categoria-${categoriaEncontrada.id}`]
                }
            }),

            fetch('https://allnovu.com/gestion/api/products', {
                next: {
                    revalidate: 60,
                    tags: ['productos-todos']
                }
            })
        ]);

        if (!categoriaProductsRes.ok) {
            throw new Error(`Error cargando productos de categoría: ${categoriaProductsRes.status}`);
        }

        if (!allProductsRes.ok) {
            throw new Error(`Error cargando todos los productos: ${allProductsRes.status}`);
        }

        const [productosDeCategoria, todosLosProductos] = await Promise.all([
            categoriaProductsRes.json(),
            allProductsRes.json()
        ]);

        // 4. FILTRAR PRODUCTOS (igual que tu lógica original)
        const productosFiltrados: Products2[] = todosLosProductos.filter((producto: Products2) =>
            productosDeCategoria.some((item: { id: number }) => item.id === producto.id)
        );

        // 5. AÑADIR DATOS EXTRA SI ES NECESARIO
        const productosConInfoCompleta = productosFiltrados.map(producto => ({
            ...producto,
            // Asegurar que tenga propiedades requeridas
            imagenUrl: producto.imagenUrl || '/placeholder.jpg',
            descripcionCorta: producto.descripcionCorta || producto.descripcion || '',
            relatedProducts: producto.relatedProducts || []
        }));

        return (
            <div className="flex h-full bg-white min-h-screen w-full flex-col items-center pt-6 pb-12">
                <Hero />
                <div className="flex flex-col gap-4 px-4">
                    <FloatingNabvar categorias={categorias || []} />
                    <ProductsComponent productos={productosConInfoCompleta || []} />
                </div>
            </div>
        );

    } catch (error) {
        console.error('Error en ProductsPage:', error);

        // Página de error con posibilidad de reintentar
        return (
            <div className="flex h-full bg-white min-h-screen w-full flex-col items-center pt-6 pb-12">
                <Hero />
                <div className="flex flex-col gap-4 px-4 max-w-4xl w-full">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold text-red-700 mb-2">
                            Error cargando productos
                        </h2>
                        <p className="text-red-600 mb-4">
                            {error instanceof Error ? error.message : 'Error desconocido'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}