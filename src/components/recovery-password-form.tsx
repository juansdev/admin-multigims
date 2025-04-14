"use client";

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React from "react";

export function RecoveryPasswordForm({
                                         className,
                                         ...props
                                     }: Readonly<React.ComponentPropsWithoutRef<"div">>) {
    const formSchema = z.object({
        password: z
            .string()
            .min(1, {message: "Este campo debe ser diligenciado."}),
        confirmPassword: z
            .string()
            .min(1, {message: "Este campo debe ser diligenciado."})
    }).superRefine(({confirmPassword, password}, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "La contraseña no coincide",
                path: ['confirmPassword']
            });
        }
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Reestablecer contraseña</CardTitle>
                    <CardDescription>
                        Ingrese tu nueva contraseña debajo para reestablecer
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nueva contraseña</FormLabel>
                                        <FormControl>
                                            <Input required={true} type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Repetir contraseña</FormLabel>
                                        <FormControl>
                                            <Input required={true} type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full"}>
                                <Button type="submit" className="w-full">
                                    Envíar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
