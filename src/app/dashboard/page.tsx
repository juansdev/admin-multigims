import {DataTable} from "@/components/data-table";
import data from "@/data/members.json";
import roles from "@/data/roles.json";

export default function Page() {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <DataTable data={data} roles={roles}/>
            </div>
        </div>
    )
}
