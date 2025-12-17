'use server'

import { Products, Products2 } from "@/app/(landing)/page";
import { CartItem } from "@/components/cart/cart-provider";
import { FormData } from "@/components/cart/shopForm";
import { Category } from "@/components/Footer/footer";


export interface Municipio {
    xmunicipio_id: string,
    xmunicipio: string,
    xprovincia_id: string
}
export async function getProducts() {
    try {
        const url = "https://vendedor.growsolutions.biz/api/v1/"

        const datos = {
            "apikey": "G3BMK2VHSOE73CI9GSCN1V1HI6XCIEMTW8IMBKHJTYLKN",
            "action": "get-products-allnovu"
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        };
        const productsList = await fetch(url, options);
        if (productsList.ok) {
            const productosJson = await productsList.json()

            if (!Array.isArray(productosJson.items)) {
                throw new Error('La respuesta no es un array');
            }
            const productos: Products[] = await Promise.all(productosJson.items.map(async (prod: any) => {
                const description = await limpiarHTML(prod.xobs)
                const caracteristicas = await limpiarHTML(prod.xresumen)

                return {
                    id: prod.xarticulo_id,
                    nombre: prod.xarticulo,
                    precio: prod.xprecio_coste,
                    categoria: prod.xcategoria,
                    caracteristicas,
                    description,

                }
            }))
            return productos
        }
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function getProducts2() {

    try {
        const apiUrl = 'https://allnovu.com/gestion/api/products';


        const productsList = await fetch(apiUrl);
        if (productsList.ok) {
            const productosJson: Products2[] = await productsList.json()
            return productosJson;
        }
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function getCategory() {
    try {
        const uri = "https://allnovu.com/gestion/api/categorias"
        const categorys = await fetch(uri);
        if (categorys.ok) {
            const categorias = await categorys.json()

            if (!Array.isArray(categorias)) {
                throw new Error('La respuesta no es un array');
            }

            return categorias
        }
    }
    catch (error) {
        console.log("Error: ", error)
        return []
    }

}
export async function getProductbyCategory(categoria: string) {
    const backendUrl = 'https://allnovu.com/gestion'

    try {
        let productsData: Products2[] = [];
        const categorias = await getCategory();

        const category: Category = categorias?.find((cat) => cat.id.toString() === categoria) || null;
        const [productsRes] = await Promise.all([
            fetch(`${backendUrl}/api/categorias/${category.id}/products`),

        ]);

        if (!productsRes.ok) {
            throw new Error('La respuesta de la red no fue exitosa.');
        }


        productsData = await productsRes.json();
        const products: Products2[] | undefined = await getProducts2()
        const productoEncontrado = products?.filter((producto) => {
            return productsData.find((item) => item.id === producto.id)
        })
        return productoEncontrado;
    }
    catch (error) {
        console.log(error)
        return []
    }

}
export async function getProduct2(id: number) {
    const backendUrl = 'https://allnovu.com/gestion'
    try {
        const response = await fetch(`${backendUrl}/api/products/${id}`);
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue exitosa.');
        }
        const data: Products2 = await response.json();
        const productos = await getProducts2();
        const productoEncontrado = productos?.find(p => p.nombre.toUpperCase() === data.nombre.toUpperCase());
        const newData = {
            ...data,
            descripcion: productoEncontrado ? productoEncontrado.descripcion : '',
            descripcionCorta: productoEncontrado ? productoEncontrado.descripcionCorta : '',
        };
        return newData as Products2;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function detailsProduct(id: number) {
    try {
        const products: Products2 | null = await getProduct2(id)

        if (!products) {
            return null
        }
        return products
    }
    catch (error) {
        console.log(error)
        return null

    }
}

export async function getProvincias_Municipio() {
    const provincias_aceptadas = [
        "LA_HABANA",
    ]
    try {
        const url = "https://vendedor.growsolutions.biz/api/v1/"

        const datos = {
            "apikey": "G3BMK2VHSOE73CI9GSCN1V1HI6XCIEMTW8IMBKHJTYLKN",
            "action": "get-municipios"
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        };
        const municipios = await fetch(url, options)
        if (municipios.ok) {
            const municipiosJson = await municipios.json()
            const municipioFinal = municipiosJson.items.filter((municipio: Municipio) => provincias_aceptadas.some(id => id === municipio.xprovincia_id))
            return municipioFinal
        }

    }
    catch (error) {
        console.log(error)
        return []
    }


}
export async function limpiarHTML(htmlString: string) {
    if (typeof document === 'undefined') {
        let cleaned = htmlString;

        // Paso 1: Convertir spans con font-weight a <strong> (necesitamos capturar contenido anidado)
        cleaned = cleaned.replace(/<span[^>]*font-weight:\s*(?:700|bold)[^>]*>([\s\S]*?)<\/span>/gi, '<strong>$1</strong>');

        // Paso 2: Convertir spans con background:yellow a <mark>
        cleaned = cleaned.replace(/<span[^>]*background:\s*yellow[^>]*>([\s\S]*?)<\/span>/gi, '<mark>$1</mark>');

        // Paso 3: Limpiar tags de Office y atributos
        cleaned = cleaned
            .replace(/<o:p><\/o:p>/g, '')
            .replace(/<o:p>/g, '')
            .replace(/<\/o:p>/g, '')
            .replace(/\s+style="[^"]*"/g, '')
            .replace(/\s+class="[^"]*"/g, '');

        // Paso 4: Limpiar spans restantes (que no tienen formato importante)
        cleaned = cleaned
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '');

        // Paso 5: Convertir h3 y h4 a estructura más semántica
        cleaned = cleaned
            .replace(/<h3[^>]*>/g, '<h3>')
            .replace(/<h4[^>]*>/g, '<h4>');

        // Paso 6: Limpiar entidades HTML y caracteres especiales
        cleaned = cleaned
            .replace(/&nbsp;/g, ' ')
            .replace(/&quot;/g, '"')
            .replace(/\s+/g, ' ');

        // Paso 7: Limpiar párrafos vacíos y <br> múltiples
        cleaned = cleaned
            .replace(/<p>\s*<\/p>/g, '')
            .replace(/<p>\s*<br>\s*<\/p>/g, '')
            .replace(/(<br>\s*){2,}/g, '<br>');

        // Paso 8: Asegurar que <strong> anidados se simplifiquen
        cleaned = cleaned.replace(/<strong>\s*<strong>/g, '<strong>').replace(/<\/strong>\s*<\/strong>/g, '</strong>');

        return cleaned.trim();
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.innerHTML;
}

export async function searchProducts(query: string) {
    const backendUrl = 'https://allnovu.com/gestion';
    try {
        const response = await fetch(`${backendUrl}/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Search failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}
function dividirNombre(nombreCompleto: string) {
    const partes = (nombreCompleto || '').trim().split(/\s+/);

    return {
        nombre1: partes[0] || '',
        nombre2: partes[1] || '',
        apellido1: partes[2] || '',
        apellido2: partes[3] || ''
    };
}
export async function createOrder(data: FormData, items: CartItem[], metodoPago: string) {
    const {
        name,
        tel,
        direccion,
        entreCalle,
        entreCalle2,
        municipio,
        provinci,
        numeroCasa,
        reparto,
        observaciones
    } = data;

    const { nombre1, nombre2, apellido1, apellido2 } = dividirNombre(name);
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Mes de 01-12
    const dia = String(ahora.getDate()).padStart(2, '0');
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    const productosTotal = await getProducts().then(data => data?.filter(producto => items.some(item => item.name.toUpperCase() === producto.nombre.toUpperCase())))
    const productos = items.map((item) => ({
        "articulo_id": productosTotal?.find(producto => item.name.toUpperCase() === producto.nombre.toUpperCase())?.id,
        "cantidad": item.quantity
    }));
    try {
        const url = "https://vendedor.growsolutions.biz/api/v1/"
        const customer = {
            "apikey": "LZO4WQH0BE0WLNHMGLPPNJPSYMMOTAY0K48BHOLNPVTHO",
            "action": "get-customers"
        }
        const optionsCustomer = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };
        const customers = await fetch(url, optionsCustomer);
        if (customers.ok) {
            //escenario de que el cliente exista
            const customersJson = await customers.json()
            const nameCustomer = customersJson.items.find((customer: any) => customer.xcliente === name)
            if (nameCustomer) {
                const dataJson = {
                    "apikey": "LZO4WQH0BE0WLNHMGLPPNJPSYMMOTAY0K48BHOLNPVTHO",
                    "action": "create-order",
                    "ord_fecha": fechaFormateada,
                    "ord_destino_id": "1",
                    "rem_cliente_id": nameCustomer.xcliente_id,
                    "des_nombre1": nombre1,
                    "des_nombre2": nombre2,
                    "des_apellido1": apellido1,
                    "des_apellido2": apellido2,
                    "des_dir1": direccion,
                    "des_numero": numeroCasa,
                    "des_apartamento": "",
                    "des_piso": "",
                    "des_entre_calle1": entreCalle,
                    "des_entre_calle2": entreCalle2,
                    "des_codpostal": "20901",
                    "des_municipio": municipio,
                    "des_provincia": provinci,
                    "des_phone": tel,
                    "des_ci": "12345678901",
                    "products": productos,
                    'obs': observaciones || '',
                    'fpago': [metodoPago]
                }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataJson)
                };
                const response = await fetch(url, options);

                if (response.ok) {
                    const data = await response.json()
                    return data
                }
            }
        }
        //escenario de que el cliente no exista
        console.log("No existe cliente")
        const json = {
            "apikey": "LZO4WQH0BE0WLNHMGLPPNJPSYMMOTAY0K48BHOLNPVTHO",
            "action": "create-order",
            "ord_fecha": fechaFormateada,
            "ord_destino_id": "1",
            "rem_nombre1": nombre1,
            "rem_nombre2": nombre2,
            "rem_apellido1": apellido1,
            "rem_apellido2": apellido2,
            "rem_email": "pantallas@allnovu.com",
            "rem_movil": tel,
            "rem_pais_id": "49",
            "des_nombre1": nombre1,
            "des_nombre2": nombre2,
            "des_apellido1": apellido1,
            "des_apellido2": apellido2,
            "des_dir1": direccion,
            "des_numero": numeroCasa,
            "des_apartamento": reparto,
            "des_piso": "2",
            "des_entre_calle1": entreCalle,
            "des_entre_calle2": entreCalle2,
            "des_codpostal": "28001",
            "des_municipio": municipio,
            "des_provincia": provinci,
            "des_phone": tel,
            "des_ci": "12345678901",
            "products": productos,
            'obs': observaciones || '',
            'fpago': metodoPago
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json()
            return data
        }
    }
    catch (error) {
        console.log(error)
        return null
    }

}