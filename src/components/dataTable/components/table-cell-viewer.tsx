import {z} from "zod";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import {Button} from "@/components/ui/button";
import * as React from "react";

export function TableCellViewer({item}: { item: z.infer<typeof ISchemaDataTable> }) {
    return (
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
            {item.header}
        </Button>
    );
}