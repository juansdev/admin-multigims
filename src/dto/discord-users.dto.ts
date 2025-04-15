import {z} from "zod";
import {ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState} from "@tanstack/react-table";
import React from "react";

export const ISchemaRolesTableDto = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string()
});

export const ISchemaDataTableDto = z.object({
    id: z.string(),
    username: z.string(),
    handle: z.string(),
    status: z.string(),
    aboutMe: z.string(),
    memberDate: z.string(),
    roles: z.array(ISchemaRolesTableDto),
    avatarUrl: z.string(),
    bannerUrl: z.string()
});

export interface IDataTableDto {
    data: z.infer<typeof ISchemaDataTableDto>[];
    roles: z.infer<typeof ISchemaRolesTableDto>[];
}

export interface IDataSelectorsDto {
    "id": number;
    "label": string;
    "quantity": number;
}

export interface IGetTableDto {
    data: z.infer<typeof ISchemaDataTableDto>[];
    columns: ColumnDef<z.infer<typeof ISchemaDataTableDto>>[];
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