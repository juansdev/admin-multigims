import {z} from "zod";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter, DrawerHeader, DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {useIsMobile} from "@/hooks/use-mobile";
import DiscordProfile from "@/components/discord-profile";

export function TableCellViewer({item}: { item: z.infer<typeof ISchemaDataTable> }) {
    const isMobile = useIsMobile();
    const profileData = {
        username: "Miguel",
        handle: "miguelhigueradev",
        status: "Passionate about development",
        aboutMe: ["Tech nerd", "& enthusiast", "INTP"],
        birthDate: "Feb 9 1999",
        roles: [
            {name: "JavaScript", color: "#faa61a"},
            {name: "TypeScript", color: "#5865f2"},
            {name: "Java", color: "#faa61a"},
            {name: "PHP", color: "#7E69AB"},
            {name: "React", color: "#5865f2"},
            {name: "Vue", color: "#3ba55c"}
        ],
        avatarUrl: "/avatars/avatar.jpeg",
        bannerUrl: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1470&auto=format&fit=crop",
        spotifyData: {
            songTitle: "The Stargazer",
            artist: "Barry Uhl",
            album: "The Stargazer's Bible",
            albumCover: "https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79",
            currentTime: "0:14",
            totalDuration: "3:13"
        }
    };
    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.header}</DrawerTitle>
                    <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription>
                </DrawerHeader>
                <div className="min-h-screen flex items-center justify-center bg-discord-darker-blue p-4">
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