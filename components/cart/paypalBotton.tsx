'use client'

import { ShopSchema } from "@/lib/shopType";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from "zod";
import { CartItemDisplay } from "./cartComponent";
import { toast } from "sonner";
import { useCart } from "./cart-provider";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/actions/products";

type FormData = z.infer<typeof ShopSchema> & {
    observaciones?: string;
    metodoPago?: string;
};

interface PayPalButtonsWrapperProps {
    form: UseFormReturn<FormData>;
    shippingCost?: number;
    total: number;
    subtotal: number;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function PayPalButtonsWrapper({ form, shippingCost, subtotal, total, setOpen }: PayPalButtonsWrapperProps) {

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const { items, updateQuantity, removeItem, clearCart } = useCart()
    const router = useRouter()


    // Configuración para SANDBOX (pruebas)
    const paypalOptions = {
        clientId: "AX-sewmbuGs7huBqFMkUnPNTo-wQqTaq9yT1w8uWwgiNXROKjmyte9UEBENMjyKY9eHnNKLdt4z4kICC",
        currency: "USD",
        intent: "capture",
        "disable-funding": "sofort,paylater,venmo", // Deshabilitar métodos adicionales
        components: "buttons", // Solo botones
        "data-sdk-integration-source": "developer-studio", // Para tracking
        "enable-funding": "card", // Habilitar tarjeta de crédito
        "debug": true, // Modo debug para ver logs
    };

    const createOrder2 = (actions: any) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2), // Usar el total real del pedido
                    currency_code: "USD"
                },
                description: `Pedido de ${items?.length || 0} productos`,
            }],
            application_context: {
                shipping_preference: "NO_SHIPPING"
            }
        });
    };

    // Función cuando se aprueba el pago
    const onApprove = async (data: any, actions: any) => {
        try {
            setIsProcessingPayment(true);
            const details = await actions.order.capture();
            console.log("Pago completado:", details);

            const order = await createOrder(data, items, 'paypal')
            if (order.status === 'success') {
                setOpen(false)
                clearCart()
                toast.success("Se ha realizado su pedido correctamente")
                router.push('/')
            }
            else {
                toast.error("Hubo un error al procesar tu pedido:" + order);
            }

        } catch (error) {
            console.error("Error al procesar el pago:", error);
            toast.error("Hubo un error al procesar el pago. Por favor, intenta de nuevo.")
        } finally {
            setIsProcessingPayment(false);
        }
    };

    // Función para manejar errores
    const onError = (err: any) => {
        console.error("Error en PayPal:", err);
        alert("Ocurrió un error con PayPal. Por favor, intenta de nuevo o elige otro método de pago.");
    };

    return (
        <PayPalScriptProvider
            options={paypalOptions}
            deferLoading={false}
        >
            <div className="w-full space-y-4">

                {/* Botones de PayPal */}
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "paypal",
                        height: 48,
                        tagline: false
                    }}
                    createOrder={createOrder2}
                    onApprove={onApprove}
                    onError={onError}
                    disabled={isProcessingPayment || !form.formState.isValid}
                    forceReRender={[total, subtotal]}
                />
            </div>
        </PayPalScriptProvider>
    );
}