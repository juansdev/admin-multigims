import {z} from "zod";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {useIsMobile} from "@/hooks/use-mobile";
import DiscordProfile from "@/components/discord-profile";
import {IDiscordProfileProps} from "@/interfaces/components/discord-profile.interface";

export function TableCellViewer({item}: { item: z.infer<typeof ISchemaDataTable> }) {
    const isMobile = useIsMobile();
    const profileData: IDiscordProfileProps = {
        username: "DragønX",
        handle: "dragonx72",
        status: "En línea",
        aboutMe: ["Desarrollador Web."],
        memberDate: "Oct 25 2015",
        roles: [
            {name: "Creadores Roblox", color: "#faa61a"},
            {name: "Diseñadores", color: "#5865f2"},
            {name: "Editores", color: "#faa61a"},
            {name: "Programadores", color: "#7E69AB"},
            {name: "Moderadores", color: "#5865f2"},
            {name: "Creadores Minecraft", color: "#3ba55c"},
            {name: "Marketing", color: "#3ba45c"}
        ],
        avatarUrl: "/avatars/avatar-discord.jpeg",
        bannerUrl: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1470&auto=format&fit=crop"
    };
    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1 hidden">
                    <DrawerTitle>{item.header}</DrawerTitle>
                    <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription>
                </DrawerHeader>
                <div className="min-h-screen flex items-start justify-center bg-discord-darker-blue">
                    <DiscordProfile {...profileData} />
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Salir</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}