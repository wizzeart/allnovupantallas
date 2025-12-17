// components/shop/PayPalButton.tsx
'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalButtonProps {
    total: number;
    items: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
    onSuccess: (detalles: any) => void;
    onError: (error: any) => void;
}

export default function PayPalButton({
    total,
    items,
    onSuccess,
    onError
}: PayPalButtonProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const createOrder = async () => {
        setIsProcessing(true);

        try {
            const response = await fetch('/api/paypal/crear-orden', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    total,
                    items,
                    shipping: 5.99, // Ajusta según tu envío
                    tax: 0.00,
                    currency: 'USD'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear orden');
            }

            return data.ordenId;
        } catch (error) {
            console.error('Error:', error);
            onError(error);
            return null;
        } finally {
            setIsProcessing(false);
        }
    };

    const onApprove = async (data: any, actions: any) => {
        setIsProcessing(true);

        try {
            const response = await fetch('/api/paypal/capturar-orden', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderID })
            });

            const detalles = await response.json();

            if (!response.ok) {
                throw new Error(detalles.error || 'Error al procesar pago');
            }

            onSuccess({
                ...detalles,
                orderId: data.orderID,
                payerId: data.payerID
            });

        } catch (error) {
            console.error('Error:', error);
            onError(error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Si no tienes el Client ID configurado, muestra un mensaje
    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                    PayPal no está configurado. Por favor, configura NEXT_PUBLIC_PAYPAL_CLIENT_ID en tus variables de entorno.
                </p>
            </div>
        );
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: "USD",
                intent: "capture"
            }}
        >
            <div className="w-full">
                {isProcessing && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-700">Procesando pago...</p>
                    </div>
                )}

                <PayPalButtons
                    style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal"
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={(err) => {
                        console.error('Error PayPal:', err);
                        onError(err);
                    }}
                    disabled={isProcessing}
                />
            </div>
        </PayPalScriptProvider>
    );
}