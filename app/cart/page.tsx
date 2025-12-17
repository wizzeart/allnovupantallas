import CartComponent from "@/components/cart/cartComponent";
import { getProvincias_Municipio } from "@/lib/actions/products";
export const runtime = 'edge';

export default async function CartPage() {
    const municipios = await getProvincias_Municipio()
    return (
        <div className="bg-white">
            <CartComponent municipios={municipios} />
        </div>
    )
}
