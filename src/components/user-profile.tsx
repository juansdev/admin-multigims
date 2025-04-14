"use client"

import {AtSign, Calendar, Edit, Globe, MapPin, Phone, User, UserCog,} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import userData from "@/data/user.json";

export function UserProfile() {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <Card className="flex-1">
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name}/>
                            <AvatarFallback>
                                {userData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                                <Badge variant="outline" className="ml-2">
                                    {userData.title}
                                </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1">
                                <AtSign className="h-3.5 w-3.5"/>
                                {userData.email}
                            </CardDescription>
                            <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5"/>
                                {userData.location}
                            </CardDescription>
                        </div>
                        <Button size="sm" className="mt-4 md:mt-0">
                            <Edit className="mr-2 h-4 w-4"/>
                            Editar Perfil
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Bio</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{userData.bio}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Celular</p>
                                        <p className="text-sm text-muted-foreground">{userData.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <AtSign className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Correo electrónico</p>
                                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Página web</p>
                                        <p className="text-sm text-muted-foreground">{userData.website}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Ubicación</p>
                                        <p className="text-sm text-muted-foreground">{userData.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Información de la Cuenta</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Departamento</p>
                                        <p className="text-sm text-muted-foreground">{userData.department}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <UserCog className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Cargo</p>
                                        <p className="text-sm text-muted-foreground">{userData.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Fecha de Ingreso</p>
                                        <p className="text-sm text-muted-foreground">{userData.joined}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
