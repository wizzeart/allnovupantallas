"use client";

import {
    Home,
    Navigation,
    Hash,
    Package,
    CreditCard,
    Clock,
    Wallet,
    Banknote,
    ShoppingBag
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { z } from "zod";
import * as React from "react";
import { ShopSchema } from "@/lib/shopType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createOrder, Municipio } from "@/lib/actions/products";
import { PayPalButtonsWrapper } from "./paypalBotton";
import { toast } from "sonner";
import { useCart } from "./cart-provider";
import { useRouter } from "next/navigation";
import PaintedKeyboard from "../keyboard/keyboardComponent";

interface VehicleFormProps extends React.HTMLAttributes<HTMLDivElement> {
    shippingCost?: number;
    total: number;
    municipios?: Municipio[]
    subtotal: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type FormData = z.infer<typeof ShopSchema> & {
    observaciones?: string;
    metodoPago?: string;
};

type MetodoPago = 'efectivo' | 'paypal';

type ActiveInput = 'name' | 'tel' | 'direccion' | 'entreCalle' | 'entreCalle2' | 'numeroCasa' | 'reparto' | 'observaciones' | null;

export function ShopForm({
    className,
    shippingCost,
    total,
    subtotal,
    municipios,
    setOpen,
    ...props
}: VehicleFormProps) {
    const [selectProvincia, setSelectedprovincia] = useState('')
    const [selectMunicipio, setSelectedMunicipio] = useState('')
    const [metodoPago, setMetodoPago] = useState<MetodoPago>('efectivo');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [activeInput, setActiveInput] = useState<ActiveInput>(null);

    const { items, updateQuantity, removeItem, clearCart } = useCart()
    const router = useRouter()

    // Refs para cada campo de entrada
    const nameRef = useRef<HTMLInputElement>(null);
    const telRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);
    const entreCalleRef = useRef<HTMLInputElement>(null);
    const entreCalle2Ref = useRef<HTMLInputElement>(null);
    const numeroCasaRef = useRef<HTMLInputElement>(null);
    const repartoRef = useRef<HTMLInputElement>(null);
    const observacionesRef = useRef<HTMLTextAreaElement>(null);
    const municipioSanti = [
        {
            id: 'Trinidad',
            name: "Trinidad",
            direccion: "Camilo Cienfuegos s/n e/ José Martí y Miguel Calzada",
            horarioSemana: "Lunes a Viernes de 8:30 am a 5:00 pm",
            horarioFimde: "Sábado de 8:30 am a 12:00 pm"
        },
        {
            id: "Sancti_Spiritus", name: "Sancti Spiritus", direccion: "Independencia Sur #8 e/ Ave de los Mártires y Ernesto Valdéz Muñoz, Boulevard de SS",
            horarioSemana: "Lunes a Viernes de 8:30 am a 5:00 pm",
            horarioFimde: "Sábado de 8:30 am a 12:00 pm"
        },
        {
            id: "Taguasco", name: "Taguasco", direccion: "Abel Santamaria #33 Esquina Eladio Hernández, Carretera Central",
            horarioSemana: "Todos los días de 8:30 am a 5:00 pm",
            horarioFimde: " "
        }


    ]
    const form = useForm<FormData>({
        resolver: zodResolver(ShopSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            tel: "",
            direccion: "",
            entreCalle: "",
            entreCalle2: "",
            municipio: "",
            numeroCasa: "",
            reparto: "",
            observaciones: "",
            provinci: '',
            metodoPago: 'efectivo'
        },
    });

    // Función para manejar clics del teclado
    const handleKeyClick = (key: string) => {
        if (!activeInput) return;

        const fieldName = activeInput;
        const currentValue = form.getValues()[fieldName] || '';

        if (key === "backspace") {
            form.setValue(fieldName, currentValue.slice(0, -1));
        } else if (key === "enter") {
            form.setValue(fieldName, currentValue + "\n");
        } else if (key === "space") {
            form.setValue(fieldName, currentValue + " ");
        } else {
            form.setValue(fieldName, currentValue + key);
        }

        // Mantener el foco en el input activo
        focusActiveInput();
    };

    // Enfocar el input activo
    const focusActiveInput = () => {
        switch (activeInput) {
            case 'name':
                nameRef.current?.focus();
                break;
            case 'tel':
                telRef.current?.focus();
                break;
            case 'direccion':
                direccionRef.current?.focus();
                break;
            case 'entreCalle':
                entreCalleRef.current?.focus();
                break;
            case 'entreCalle2':
                entreCalle2Ref.current?.focus();
                break;
            case 'numeroCasa':
                numeroCasaRef.current?.focus();
                break;
            case 'reparto':
                repartoRef.current?.focus();
                break;
            case 'observaciones':
                observacionesRef.current?.focus();
                break;
        }
    };

    // Manejar el foco en los inputs
    const handleInputFocus = (input: ActiveInput) => {
        setActiveInput(input);
        setShowKeyboard(true);
    };

    const handleSubmitForm = async () => {
        try {
            const data = form.getValues();
            const order = await createOrder(data, items, 'USD efectivo')

            if (order.status === 'success') {
                toast.success("Pedido enviado exitosamente");
                clearCart()
                router.push("/")
            }
            else {
                toast.error("Hubo un error al procesar tu pedido:" + order.msg);
            }
        } catch (error) {
            console.log("Error al enviar el pedido:", error);
            toast.error("Hubo un error al procesar tu pedido");
        }
    };

    // Cerrar teclado con Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showKeyboard) {
                setShowKeyboard(false);
                setActiveInput(null);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [showKeyboard]);

    return (
        <div className={className} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Formulario Principal */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Información de Envío
                                    </CardTitle>
                                    <CardDescription>
                                        Completa tus datos para procesar el pedido
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Información Personal */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="provinci"
                                                    render={({ field, fieldState }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel>Provincia*</FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                    >
                                                                        <FormControl>
                                                                            <SelectTrigger className={fieldState.error ? "border-destructive" : ""}>
                                                                                <SelectValue placeholder="Selecciona una provincia" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="LA_HABANA" onClick={() =>
                                                                                setSelectedprovincia(
                                                                                    "LA_HABANA"
                                                                                )
                                                                            }>
                                                                                La Habana
                                                                            </SelectItem>
                                                                            <SelectItem value="SANCTI_SPIRITUS" onClick={() =>
                                                                                setSelectedprovincia(
                                                                                    "SANCTI_SPIRITUS"
                                                                                )
                                                                            }>
                                                                                Sancti Spiritus
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                                {!fieldState.error && field.value && (
                                                                    <FormDescription className="text-green-600">
                                                                        ✓ Válido
                                                                    </FormDescription>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="municipio"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Municipio</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    disabled={!selectProvincia}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger className={fieldState.error ? "border-destructive" : ""}>
                                                                            <SelectValue placeholder="Selecciona una provincia" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {selectProvincia !== "SANCTI_SPIRITUS" ? (
                                                                            <>
                                                                                {municipios?.filter((municipio) => municipio.xprovincia_id === selectProvincia).map((item) => (
                                                                                    <SelectItem
                                                                                        value={item.xmunicipio_id}
                                                                                        key={item.xmunicipio_id}
                                                                                        className="hover:bg-primary dark:hover:bg-primary"
                                                                                        onClick={() =>
                                                                                            setSelectedMunicipio(
                                                                                                item.xmunicipio
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {item.xmunicipio}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </>

                                                                        ) : (
                                                                            <>
                                                                                {municipioSanti.map((item) => (
                                                                                    <SelectItem
                                                                                        value={item.id}
                                                                                        key={item.name}
                                                                                        className="hover:bg-primary dark:hover:bg-primary"
                                                                                        onClick={() =>
                                                                                            setSelectedMunicipio(
                                                                                                item.name
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {item.name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </>
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Nombre Completo *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: Juan Pérez García"
                                                                    {...field}
                                                                    readOnly
                                                                    ref={nameRef}
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('name')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="tel"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Teléfono *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="54492475"
                                                                    {...field}
                                                                    ref={telRef}
                                                                    readOnly
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('tel')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Dirección */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="direccion"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-1">
                                                                <Navigation className="h-4 w-4" />
                                                                Calle Principal *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: 23"
                                                                    {...field}
                                                                    readOnly
                                                                    ref={direccionRef}
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('direccion')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="entreCalle"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Entre Calle *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: 2"
                                                                    {...field}
                                                                    ref={entreCalleRef}
                                                                    readOnly
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('entreCalle')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="entreCalle2"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Y Calle *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: 4"
                                                                    {...field}
                                                                    readOnly
                                                                    ref={entreCalle2Ref}
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('entreCalle2')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="numeroCasa"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-1">
                                                                <Hash className="h-4 w-4" />
                                                                Número *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: 38"
                                                                    {...field}
                                                                    readOnly
                                                                    ref={numeroCasaRef}
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('numeroCasa')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="reparto"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-1">
                                                                <Home className="h-4 w-4" />
                                                                Reparto *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej: Miramar"
                                                                    {...field}
                                                                    ref={repartoRef}
                                                                    readOnly
                                                                    className={fieldState.error ? "border-destructive" : ""}
                                                                    onFocus={() => handleInputFocus('reparto')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            {!fieldState.error && field.value && (
                                                                <FormDescription className="text-green-600">
                                                                    ✓ Válido
                                                                </FormDescription>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Observaciones */}
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="observaciones"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Notas para la entrega (opcional)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Ej: Llamar antes de llegar, dejar en la portería, instrucciones especiales..."
                                                            className="min-h-[100px] resize-none"
                                                            {...field}
                                                            readOnly
                                                            ref={observacionesRef}
                                                            onFocus={() => handleInputFocus('observaciones')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator />

                                    {/* Método de Pago */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            Método de Pago
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Opción Efectivo */}
                                            {selectProvincia !== 'SANCTI_SPIRITUS' ? (
                                                <div
                                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${metodoPago === 'efectivo'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    onClick={() => setMetodoPago('efectivo')}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-full ${metodoPago === 'efectivo'
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-gray-100'
                                                            }`}>
                                                            <Banknote className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">Pago en Efectivo</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Paga cuando recibas tu pedido
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                                (
                                                    <div className="flex flex-col">
                                                        <div
                                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${metodoPago === 'efectivo'
                                                                ? 'border-primary bg-primary/5'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                            onClick={() => setMetodoPago('efectivo')}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`p-2 rounded-full ${metodoPago === 'efectivo'
                                                                    ? 'bg-primary text-primary-foreground'
                                                                    : 'bg-gray-100'
                                                                    }`}>
                                                                    <Banknote className="h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold">Recogida en tienda</h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Paga cuando recojas en tienda
                                                                    </p>

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <p className="mt-2">
                                                            {municipioSanti.find(item => item.name === selectMunicipio)?.direccion}
                                                        </p>
                                                    </div>

                                                )
                                            }

                                            {/* Opción PayPal */}
                                            <div>
                                                <div
                                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${metodoPago === 'paypal'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    onClick={() => setMetodoPago('paypal')}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-full ${metodoPago === 'paypal'
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-gray-100'
                                                            }`}>
                                                            <Wallet className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">Pago con PayPal</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Paga su pedido con Pay Pal
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones según método de pago */}
                                    <div className="flex justify-end pt-6">
                                        {metodoPago === 'efectivo' && (
                                            <Button
                                                type="button"
                                                onClick={handleSubmitForm}
                                                variant="default"
                                                size="lg"
                                                disabled={!form.formState.isValid}
                                                className="px-8 py-6 text-lg flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            >
                                                <Banknote className="h-5 w-5" />
                                                Confirmar Pedido
                                            </Button>
                                        )}

                                        {metodoPago === 'paypal' && (
                                            <PayPalButtonsWrapper setOpen={setOpen} form={form} total={total} subtotal={subtotal} shippingCost={shippingCost} />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Resumen de Compra (Siempre visible) */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6 h-[600px] flex flex-col">
                                <CardHeader className="flex-shrink-0">
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Resumen de Compra
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-1 overflow-y-auto p-6">
                                    {/* Productos */}
                                    <div className="space-y-3">
                                        <h4 className="font-semibold">Productos</h4>
                                        {items?.map((producto, index) => (
                                            <div key={index} className="flex justify-between text-sm py-2">
                                                <div>
                                                    <span className="font-medium">{producto.name}</span>
                                                    <span className="text-muted-foreground ml-2">
                                                        x{producto.quantity}
                                                    </span>
                                                </div>
                                                <span>${(producto.price * producto.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="my-4" />

                                    {/* Desglose de Costos */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between py-1">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-muted-foreground">Envío</span>
                                            <span>${shippingCost?.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    {/* Total */}
                                    <div className="flex justify-between items-center text-lg font-bold py-4">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>

                                    {/* Método de Pago Seleccionado */}
                                    <div className="space-y-3 py-4">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Método de Pago
                                        </h4>
                                        <div className="text-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`p-1 rounded ${metodoPago === 'efectivo'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {metodoPago === 'efectivo'
                                                        ? <Banknote className="h-4 w-4" />
                                                        : <Wallet className="h-4 w-4" />
                                                    }
                                                </div>
                                                <span className="font-medium">
                                                    {selectProvincia !== "SANCTI_SPIRITUS" ? (
                                                        <>
                                                            {metodoPago === 'efectivo'
                                                                ? "Pago en Efectivo"
                                                                : "Pago con PayPal"}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {metodoPago === 'efectivo'
                                                                ? "Recogida en tienda"
                                                                : "Pago con PayPal"}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground text-xs">
                                                {selectProvincia !== "SANCTI_SPIRITUS" ?
                                                    (
                                                        <>
                                                            {metodoPago === 'efectivo'
                                                                ? "Pagas cuando recibes tu pedido"
                                                                : "Pago seguro con tarjeta de crédito/débito"}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {metodoPago === 'efectivo'
                                                                ? "Pagas cuando recojas tu pedido"
                                                                : "Pago seguro con tarjeta de crédito/débito"}
                                                        </>
                                                    )
                                                }

                                            </p>
                                        </div>
                                    </div>

                                    {/* Tiempo de Entrega */}
                                    <div className="space-y-3 py-4">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            {selectProvincia !== "SANCTI_SPIRITUS" ? (
                                                <>
                                                    <Clock className="h-4 w-4" />
                                                    Tiempo de Entrega
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="h-4 w-4" />
                                                    Horarios de recogida
                                                </>
                                            )}
                                        </h4>
                                        <div className="text-sm text-muted-foreground">
                                            {selectProvincia !== "SANCTI_SPIRITUS" ? (
                                                <>
                                                    <p>Entre 24-48 horas hábiles</p>
                                                    <p className="text-xs mt-1">Horario: Lunes a Viernes 8:00 am - 7:00 pm</p>
                                                    <p className="text-xs mt-1">Horario: Sábado 8:00 am - 2:00 pm</p>
                                                </>
                                            ) : (<>
                                                <p>Entre 24-48 horas hábiles</p>
                                                <p className="text-xs mt-1">Horario: {municipioSanti.find(item => item.name === selectMunicipio)?.horarioSemana}</p>
                                                {selectMunicipio !== 'Taguasco' && (
                                                    <p className="text-xs mt-1">Horario: {municipioSanti.find(item => item.name === selectMunicipio)?.horarioFimde}</p>
                                                )}
                                            </>)}

                                        </div>
                                    </div>

                                    {/* Espacio adicional para asegurar scroll */}
                                    <div className="py-4"></div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>

            {/* Teclado flotante */}
            {showKeyboard && (
                <div className="fixed bottom-6 right-6 z-50">
                    <PaintedKeyboard
                        onKeyClick={handleKeyClick}
                        onClose={() => {
                            setShowKeyboard(false);
                            setActiveInput(null);
                        }}
                        onTabPress={() => {
                            // Define el orden de los inputs
                            const inputOrder: ActiveInput[] = [
                                'name',
                                'tel',
                                'direccion',
                                'entreCalle',
                                'entreCalle2',
                                'numeroCasa',
                                'reparto',
                                'observaciones'
                            ];

                            if (activeInput) {
                                // Encontrar el índice actual
                                const currentIndex = inputOrder.indexOf(activeInput);
                                // Calcular el siguiente índice (circular)
                                const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % inputOrder.length;
                                console.log(nextIndex);
                                handleInputFocus(inputOrder[nextIndex]);
                            } else {
                                // Si no hay input activo, empezar con el primero
                                handleInputFocus('name');
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}