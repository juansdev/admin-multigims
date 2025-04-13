import type {DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import React from "react";
import {z} from "zod";

export function handleDragEnd(event: DragEndEvent,
                              dataIds: UniqueIdentifier[],
                              setData: React.Dispatch<React.SetStateAction<z.infer<typeof ISchemaDataTable>[]>>) {
    const {active, over} = event
    if (active && over && active.id !== over.id) {
        setData((data) => {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            return arrayMove(data, oldIndex, newIndex)
        });
    }
}