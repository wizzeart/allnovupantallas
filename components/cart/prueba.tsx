'use client'

import { ShopSchema } from "@/lib/shopType";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from "zod";
import { CartItemDisplay } from "./cartComponent";
import { toast } from "sonner";
import { useCart } from "./cart-provider";

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

export function PayPalButtonsWrapperPrueba({ form, shippingCost, subtotal, total, setOpen }: PayPalButtonsWrapperProps) {
    const [paypalError, setPaypalError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const { items, updateQuantity, removeItem, clearCart } = useCart()

    // Configuración para SANDBOX (pruebas)
    const paypalOptions = {
        clientId: "AcdZXJ6HHyIHqje9kZXZ64LzJfEH15D33UFilYXfTmOPOul44KtFk97dOjqs-PvkXAGQeKadUQP0-gXu", // Client ID de SANDBOX
        currency: "USD",
        intent: "capture",
        "disable-funding": "sofort,paylater,venmo", // Deshabilitar métodos adicionales
        components: "buttons", // Solo botones
        "data-sdk-integration-source": "developer-studio", // Para tracking
        "enable-funding": "card", // Habilitar tarjeta de crédito
        "debug": true, // Modo debug para ver logs
    };

    const createOrder = (data: any, actions: any) => {
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

    const onApprove = async (data: any, actions: any) => {
        try {
            setIsProcessingPayment(true);
            const details = await actions.order.capture();
            console.log("Pago completado:", details);

            // Obtener datos del formulario
            const formData = form.getValues();

            // Combinar datos para enviar al servidor
            const orderData = {
                ...formData,
                paymentMethod: 'paypal',
                paypalOrderId: details.id,
                paypalPayerId: details.payer.payer_id,
                total: total,
                items: items,
                subtotal: subtotal,
                shippingCost: shippingCost,
                paymentStatus: 'completed',
                paymentDetails: details
            };

            console.log("Datos del pedido para enviar:", orderData);
            setOpen(false)
            clearCart()
            toast.success("Se ha realizado su pedido correctamente")


            // Aquí enviarías los datos a tu servidor
            // await fetch('/api/orders', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(orderData)
            // });



        } catch (error) {
            console.error("Error al procesar el pago:", error);
            toast.error("Hubo un error al procesar el pago. Por favor, intenta de nuevo.")
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const onError = (err: any) => {
        console.error('❌ Error PayPal:', err);
        setPaypalError(true);
        return (
            toast.error('Error con PayPal Sandbox: ' + err.message)
        )

    };

    return (
        <PayPalScriptProvider
            options={paypalOptions}
            deferLoading={false}
        >
            <div className="w-full space-y-4">
                {/* Mensaje informativo para Sandbox */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 font-medium">
                        🧪 <strong>MODO PRUEBA (SANDBOX)</strong>
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                        Usa estas credenciales para probar:
                    </p>
                    <ul className="text-xs text-yellow-700 mt-2 list-disc pl-4">
                        <li><strong>Email:</strong> sb-43u8om30625317@personal.example.com</li>
                        <li><strong>Contraseña:</strong> 12345678</li>
                        <li><strong>Tarjeta prueba:</strong> 4032034816190890 (Visa)</li>
                        <li><strong>CVV:</strong> 123 | <strong>Fecha:</strong> Cualquier futura</li>
                    </ul>
                </div>

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
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />

                {/* Botón alternativo para pruebas rápidas */}
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-sm text-gray-600 mb-2">
                        Para probar rápidamente sin PayPal:
                    </p>
                    <button
                        onClick={() => {
                            console.log('✅ Simulando pago exitoso');
                            alert('✅ Pago simulado exitoso (modo desarrollo)');
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                        Simular Pago Exitoso
                    </button>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}