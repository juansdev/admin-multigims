import type {DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {IDataSelectors, IDataTable, ISchemaDataTable} from "@/interfaces/components/data-table.interface";
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

export const updateDataSelectors = (dataSelectors: IDataSelectors[], data: z.infer<typeof ISchemaDataTable>[]) => {
    dataSelectors.push({
        "id": 0,
        "label": "Todos",
        "quantity": data.length
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

export const getDataByKey = (data: z.infer<typeof ISchemaDataTable>[], currentRol: string): z.infer<typeof ISchemaDataTable>[] => data.filter(data => data.roles.filter(rol => rol.name === currentRol).length);

export const getDataSelectors = ({data, roles}: Readonly<IDataTable>) => {
    let dataSelectors: IDataSelectors[] = [];
    for (const value of data) {
        dataSelectors = value.roles.reduce((prev, rol) => {
            const id = roles.find(originalRol => rol.name === originalRol.name)!.id;
            const existId = !!(prev.find((valuePrev: IDataSelectors) => valuePrev.id === id)?.id);
            const currentQuantity = prev.find((valuePrev: IDataSelectors) => valuePrev.label === rol.name)?.quantity;
            let selector: IDataSelectors;
            const label = roles.find(originalRol => rol.name === originalRol.name)!.name;
            if ([id, label].every(val => val)) {
                if (currentQuantity !== undefined)
                    selector = {
                        id,
                        label,
                        quantity: currentQuantity + 1
                    };
                else selector = {
                    id,
                    label,
                    quantity: 1
                };
                if (!existId) prev.push(selector);
                else prev = prev.map(value => {
                    if (value.id === id) value = selector;
                    return value;
                });
            }
            return prev;
        }, dataSelectors);
    }
    return dataSelectors;
}