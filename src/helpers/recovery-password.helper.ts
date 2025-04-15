import * as z from "zod";

export const recoveryPasswordSecurityFormSchema = z
    .object({
        password: z
            .string()
            .min(8, {message: "La contraseña debe de tener al menos 8 caracteres."})
            .regex(/[A-Z]/, {message: "La contraseña debe de tener al menos 1 letra mayuscula."})
            .regex(/[a-z]/, {message: "La contraseña debe de tener al menos 1 letra minuscula."})
            .regex(/\d/, {message: "La contraseña debe de tener al menos 1 número."}),
        confirmPassword: z.string().min(1, {message: "Por favor confirmar su contraseña."})
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"]
    });