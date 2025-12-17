import { z } from 'zod';

// Definir los enums basados en tu base de datos
export const ShopSchema = z.object({
    name: z.string().min(1, 'El nombre del cliente es requerido'),
    tel: z.string().min(8, "El número es requerido").max(11, "El número debe tener 8 dígitos").regex(/^\d+$/, "El número debe contener solo dígitos"),
    direccion: z.string().min(1, "La dirección es requerida"),
    entreCalle: z.string().min(1, "El campo entre calles es requerido"),
    entreCalle2: z.string().min(1, "El campo entre calles es requerido"),
    municipio: z.string().min(3, "El municipio es requerido"),
    provinci: z.string().min(3, "La provincia es requerida"),
    numeroCasa: z.string().min(1, "El número de casa es requerido"),
    reparto: z.string().min(3, "El reparto es requerido"),
    observaciones: z.string().optional(),

});

