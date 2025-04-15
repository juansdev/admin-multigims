import * as z from "zod";

export const profileFormSchema = z.object({
    name: z.string().min(2, {message: "El nombre debe tener al menos 2 caracteres."}),
    email: z.string().email({message: "Por favor ingrese un correo electrónico valido."}),
    bio: z.string().max(500, {message: "Biografia no debe de exceder los 500 caracteres."}).optional(),
    jobTitle: z.string().min(2, {message: "El cargo es requerido."}),
    department: z.string().min(2, {message: "Departamento es requerido."}),
    location: z.string().min(2, {message: "Dirección es requerido."}),
    phone: z.string().min(5, {message: "Número de celular es requerido."}),
    website: z.string().url({message: "Por favor ingresa una URL valida."}).optional().or(z.literal(""))
});

export const securityFormSchema = z
    .object({
        currentPassword: z.string().min(1, {message: "La contraseña actual es requerida."}),
        newPassword: z
            .string()
            .min(8, {message: "La contraseña debe de tener al menos 8 caracteres."})
            .regex(/[A-Z]/, {message: "La contraseña debe de tener al menos 1 letra mayuscula."})
            .regex(/[a-z]/, {message: "La contraseña debe de tener al menos 1 letra minuscula."})
            .regex(/\d/, {message: "La contraseña debe de tener al menos 1 número."}),
        confirmPassword: z.string().min(1, {message: "Por favor confirmar su contraseña."})
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"]
    });