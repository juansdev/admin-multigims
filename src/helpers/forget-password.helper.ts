import * as z from "zod";

export const forgetPasswordSecurityFormSchema = z
    .object({
        email: z.string()
            .email({message: "Por favor ingrese un correo electrónico valido."})
    });