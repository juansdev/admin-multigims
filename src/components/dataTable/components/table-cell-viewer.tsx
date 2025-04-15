import {z} from "zod";
import {ISchemaDataTableDto} from "@/dto/discord-users.dto";
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
import {useIsMobile} from "@/hooks/use-mobile.hook";
import DiscordProfile from "@/components/discord-profile";

export function TableCellViewer({item}: Readonly<{ item: z.infer<typeof ISchemaDataTableDto> }>) {
    const isMobile = useIsMobile();
    return (
        <Drawer direction={isMobile ? "bottom" : "right"} fadeFromIndex={-1} snapPoints={[]}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.username}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="min-h-screen flex flex-col items-start justify-center bg-discord-darker-blue">
                    <DrawerHeader className="gap-1 hidden">
                        <DrawerTitle>{item.username}</DrawerTitle>
                        <DrawerDescription>
                            Showing total visitors for the last 6 months
                        </DrawerDescription>
                    </DrawerHeader>
                    <DiscordProfile {...item} />
                    <DrawerFooter className={"w-full"}>
                        <DrawerClose asChild>
                            <Button variant="outline">Salir</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}