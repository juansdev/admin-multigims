import {z} from "zod";

export const ISchemaDataTable = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
});

export interface IDataTable {
    data: z.infer<typeof ISchemaDataTable>[];
}