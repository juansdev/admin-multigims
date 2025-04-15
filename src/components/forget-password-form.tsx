import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {forgetPasswordSecurityFormSchema} from "@/helpers/forget-password.helper";

export function ForgetPasswordForm({
                                       className,
                                       ...props
                                   }: Readonly<React.ComponentPropsWithoutRef<"div">>) {
    const form = useForm<z.infer<typeof forgetPasswordSecurityFormSchema>>({
        resolver: zodResolver(forgetPasswordSecurityFormSchema),
        defaultValues: {
            email: ""
        }
    });

    function onSubmit(values: z.infer<typeof forgetPasswordSecurityFormSchema>) {
        console.log(values);
    }

    return <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
                <CardDescription>
                    Ingrese tu correo electrónico debajo para restablecer
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input type={"email"} required={true} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Se enviara un enlace a su correo electrónico donde podrás
                                        restablecer su contraseña.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={"w-full"}>
                            <Button className={"w-full"} type="submit">Envíar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>;
}