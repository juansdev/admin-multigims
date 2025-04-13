import {useSortable} from "@dnd-kit/sortable";
import {Button} from "@/components/ui/button";
import {GripVerticalIcon} from "lucide-react";
import * as React from "react";

export function DragHandle({id}: { id: number }) {
    const {attributes, listeners} = useSortable({
        id,
    })
    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent cursor-pointer"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground"/>
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}