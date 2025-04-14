import {z} from "zod";

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