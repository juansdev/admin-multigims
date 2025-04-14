import type {DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {IDataSelectors, ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import React from "react";
import {z} from "zod";
import {IconCircle, IconCircleCheckFilled, IconGenderAgender, IconMoonFilled} from "@tabler/icons-react";

export const handleDragEnd = (event: DragEndEvent,
                              dataIds: UniqueIdentifier[],
                              setData: React.Dispatch<React.SetStateAction<z.infer<typeof ISchemaDataTable>[]>>) => {
    const {active, over} = event
    if (active && over && active.id !== over.id) {
        setData((data) => {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            return arrayMove(data, oldIndex, newIndex)
        });
    }
}

export const updateDataSelectors = (dataSelectors: IDataSelectors[]) => {
    dataSelectors = dataSelectors.map(data => {
        if (data.label === "all") data.quantity = dataSelectors.reduce(
            (previousValue, currentValue) => {
                return previousValue + currentValue.quantity;
            }, 0
        );
        return data;
    });
    return dataSelectors.sort((a, b) => a.id - b.id);
}

export const getRowStatusByStatus = (status: string) => {
    let rowStatus: React.JSX.Element;
    switch (status) {
        case "En línea":
            rowStatus = <>{status} <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400"/></>;
            break;
        case "Ausente":
            rowStatus = <>{status} <IconMoonFilled className="fill-yellow-600 dark:fill-yellow-500"/></>;
            break;
        case "No molestar":
            rowStatus = <>{status} <IconGenderAgender className="fill-red-700 dark:fill-red-600"/></>;
            break;
        default:
            rowStatus = <>{status} <IconCircle className="fill-neutral-500 dark:fill-neutral-400"/></>;
            break;
    }
    return rowStatus;
}

export const getDataByKey = (data: z.infer<typeof ISchemaDataTable>[], currentRol: string): z.infer<typeof ISchemaDataTable>[] => {
    data = data.filter(data => data.roles.filter(rol => rol.name === currentRol).length);
    return data;
}