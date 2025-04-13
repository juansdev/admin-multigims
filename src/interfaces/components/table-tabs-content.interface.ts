import {z} from "zod";
import {ColumnDef, Table} from "@tanstack/react-table";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";

export interface ITableTabsContent {
    data: z.infer<typeof ISchemaDataTable>[];
    columns: ColumnDef<z.infer<typeof ISchemaDataTable>>[];
    table: Table<{
        id: number
        header: string
        type: string
        status: string
        target: string
        limit: string
        reviewer: string
    }>;
}