import DetailsComponent, { Products, Products2 } from "@/components/details/details";
import { detailsProduct, getProducts } from "@/lib/actions/products";

export default async function ProductosDetailsPage({ params }: { params: Promise<{ productos: string }> }) {

    const { productos } = await params;
    const productDetails = await detailsProduct(parseInt(productos))
    if (!productDetails) {
        return (
            <div>
                <h1>No hay</h1>
            </div>
        )
    }

    return (
        <div style={{ background: "linear-gradient(135deg, #1a2a6f 0%, #0088cc 100%)" }} className="dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <DetailsComponent product={productDetails} />
        </div>
    )
}