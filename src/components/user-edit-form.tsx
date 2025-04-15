"use client"

import type React from "react";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";
import {AtSign, Camera, Globe, Key, Loader2, Lock, MapPin, Phone, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import userData from "@/data/user.json";
import departmentsData from "@/data/departments.json";
import {profileFormSchema, securityFormSchema} from "@/helpers/user-edit-form.helper";

export function UserEditForm() {
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            jobTitle: userData.job_title,
            department: userData.department,
            location: userData.location,
            phone: userData.phone,
            website: userData.website
        },
    });

    const securityForm = useForm<z.infer<typeof securityFormSchema>>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            setIsUploading(true)
            // Simulamos una carga
            setTimeout(() => {
                setIsUploading(false)
                toast.success("Foto de perfil actualizada exitosamente")
            }, 1500)
        }
    }

    function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
        setIsSaving(true)
        // Simulamos una petición a la API
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Perfil actualizado exitosamente")
            console.log(data)
        }, 1000)
    }

    function onSecuritySubmit(data: z.infer<typeof securityFormSchema>) {
        setIsSaving(true)
        // Simulamos una petición a la API
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Contraseña cambiada exitosamente")
            securityForm.reset({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            console.log(data)
        }, 1000)
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Configuración de Cuenta</h1>
                    <p className="text-muted-foreground">Gestione tu configuración de cuenta y establece tus
                        preferencias.</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-fit">
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="security">Seguridad</TabsTrigger>
                </TabsList>

                {/* Pestaña de Perfil */}
                <TabsContent value="profile" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Foto de Perfil</CardTitle>
                            <CardDescription>Actualiza tu foto de perfil. El tamaño recomendable es
                                256x256px.</CardDescription>
                        </CardHeader>
                        <CardContent
                            className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name}/>
                                <AvatarFallback>
                                    {userData.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="avatar" className="cursor-pointer">
                                        <div
                                            className="flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                                            <Camera className="mr-2 h-4 w-4"/>
                                            Subir Nueva Imagen
                                        </div>
                                        <span className="sr-only">Upload New Image</span>
                                    </Label>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                        disabled={isUploading}
                                    />
                                    {isUploading && (
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Loader2 className="h-3 w-3 animate-spin"/>
                                            Subiendo...
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Tamaño máximo 2MB.</p>
                            </div>
                        </CardContent>
                        <Separator/>
                        <Form {...profileForm}>
                            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                                <CardContent className="space-y-6 pt-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={profileForm.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Nombre Completo</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <User
                                                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                            <Input className="pl-8" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Correo electrónico</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <AtSign
                                                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                            <Input className="pl-8" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={profileForm.control}
                                        name="bio"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Cuentenos sobre ti"
                                                              className="min-h-32 resize-none" {...field} />
                                                </FormControl>
                                                <FormDescription>Una descripción breve de tu perfil. Max 500
                                                    caracteres.</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={profileForm.control}
                                            name="jobTitle"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Cargo</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="department"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Departamento</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione un departamento"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                departmentsData.map(departmentData =>
                                                                    <SelectItem
                                                                        key={departmentData.id}
                                                                        value={departmentData.name}>
                                                                        {departmentData.name}
                                                                    </SelectItem>
                                                                )
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={profileForm.control}
                                            name="location"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Dirección</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <MapPin
                                                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                            <Input className="pl-8"
                                                                   placeholder="Ciudad, País" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="phone"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Celular</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Phone
                                                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                            <Input className="pl-8" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={profileForm.control}
                                            name="website"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Página Web</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Globe
                                                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                            <Input className="pl-8"
                                                                   placeholder="https://example.com" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="mt-3 flex justify-between">
                                    <Button variant="outline" type="button" onClick={() => profileForm.reset()}>
                                        Revertir Cambios
                                    </Button>
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        Guardar Cambios
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </TabsContent>

                {/* Pestaña de Seguridad */}
                <TabsContent value="security" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cambiar Contraseña</CardTitle>
                            <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura.</CardDescription>
                        </CardHeader>
                        <Form {...securityForm}>
                            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={securityForm.control}
                                        name="currentPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Contraseña Actual</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Key
                                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                        <Input
                                                            className="pl-8"
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={securityForm.control}
                                        name="newPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Nueva Contraseña</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock
                                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                        <Input className="pl-8" type="password" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    La contraseña debe de tener al menos 8 caracteres y incluir
                                                    mayúscula, minúscula, y numeros.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={securityForm.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock
                                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                        <Input
                                                            className="pl-8"
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="mt-3 flex justify-between">
                                    <Button variant="outline" type="button" onClick={() => securityForm.reset()}>
                                        Revertir Cambios
                                    </Button>
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        Actualizar Contraseña
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
