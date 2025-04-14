import {z} from "zod";
import {ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState} from "@tanstack/react-table";
import React from "react";

const ISchemaRolesDataTable = z.object({
    name: z.string(),
    color: z.string()
});
export const ISchemaDataTable = z.object({
    id: z.number(),
    username: z.string(),
    handle: z.string(),
    status: z.string(),
    aboutMe: z.string(),
    memberDate: z.string(),
    roles: z.array(ISchemaRolesDataTable),
    avatarUrl: z.string(),
    bannerUrl: z.string()
});

export interface IDataTable {
    data: z.infer<typeof ISchemaDataTable>[];
}

export interface IDataSelectors {
    [key: string]: {
        "id": number;
        "label": string;
        "quantity": number;
    }
}

export interface IGetTable {
    data: z.infer<typeof ISchemaDataTable>[];
    columns: ColumnDef<z.infer<typeof ISchemaDataTable>>[];
    currentRol: string;
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    columnVisibility: VisibilityState;
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    setPagination: React.Dispatch<React.SetStateAction<{
        pageIndex: number;
        pageSize: number;
    }>>;
}