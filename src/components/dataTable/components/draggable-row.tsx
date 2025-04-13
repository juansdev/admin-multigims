import {flexRender, Row} from "@tanstack/react-table";
import {z} from "zod";
import {useSortable} from "@dnd-kit/sortable";
import {TableCell, TableRow} from "@/components/ui/table";
import {CSS} from "@dnd-kit/utilities";
import * as React from "react";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";

export function DraggableRow({row}: { row: Row<z.infer<typeof ISchemaDataTable>> }) {
    const {transform, transition, setNodeRef, isDragging} = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}