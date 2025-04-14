import {z} from "zod";
import {ColumnDef, Row, Table} from "@tanstack/react-table";
import {ISchemaDataTable} from "@/interfaces/components/data-table.interface";

export type IRowTabsContent = Row<z.infer<typeof ISchemaDataTable>>
export interface ITableTabsContent {
    data: z.infer<typeof ISchemaDataTable>[];
    columns: ColumnDef<z.infer<typeof ISchemaDataTable>>[];
    table: Table<z.infer<typeof ISchemaDataTable>>;
}