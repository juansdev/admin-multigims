import {z} from "zod";
import {ColumnDef, Row, Table} from "@tanstack/react-table";
import {ISchemaDataTableDto} from "@/dto/discord-users.dto";

export type IRowTabsContent = Row<z.infer<typeof ISchemaDataTableDto>>
export interface ITableTabsContent {
    data: z.infer<typeof ISchemaDataTableDto>[];
    columns: ColumnDef<z.infer<typeof ISchemaDataTableDto>>[];
    table: Table<z.infer<typeof ISchemaDataTableDto>>;
    currentRole: string;
}