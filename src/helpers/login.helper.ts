import * as z from "zod";

export const loginSecurityFormSchema = z
    .object({
        email: z.string()
            .email({message: "Por favor ingrese un correo electrónico valido."}),
        password: z
            .string()
            .min(1, {message: "Este campo debe ser diligenciado."})
    });