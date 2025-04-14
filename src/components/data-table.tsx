"use client"

import * as React from "react";
import {IconChevronDown, IconDotsVertical, IconLayoutColumns,} from "@tabler/icons-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import {IDataSelectors, IDataTable, ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import {TableTabsContent} from "@/components/dataTable/components/table-tabs-content";
import {ColumnDef, ColumnFiltersState, SortingState, VisibilityState} from "@tanstack/react-table";
import {z} from "zod";
import {DragHandle} from "@/components/ui/drag-handle";
import {TableCellViewer} from "@/components/dataTable/components/table-cell-viewer";
import {getDataSelectors, getRowStatusByStatus, updateDataSelectors} from "@/helpers/data-table.helper";
import {GetTable} from "@/hooks/data-table.hook";

const columns: ColumnDef<z.infer<typeof ISchemaDataTable>>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({row}) => <DragHandle id={row.original.id}/>,
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({row}) => {
            return <TableCellViewer item={row.original}/>
        },
        enableHiding: false,
    },
    {
        accessorKey: "rol",
        header: "Rol",
        cell: ({row}) => (
            <div className="w-32">
                <ol className={"list-disc"} dangerouslySetInnerHTML={{
                    __html: row.original.roles.reduce((initial, current) => {
                        return initial + "<li>" + current.name + "</li>";
                    }, "")
                }}>
                </ol>
            </div>
        ),
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({row}) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {getRowStatusByStatus(row.original.status)}
            </Badge>
        ),
    },
    {
        id: "acciones",
        cell: ({row}) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical/>
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>
                        <button onClick={
                            async function () {
                                await navigator.clipboard?.writeText(row.original.username);
                            }
                        }>Copiar Nombre
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export function DataTable({data, roles}: Readonly<IDataTable>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const dataSelectors: IDataSelectors[] = getDataSelectors({data, roles});
    const updatedDataSelectors = updateDataSelectors(dataSelectors, data);
    const defaultValueTab: string = updatedDataSelectors[0].id.toString();
    return (
        <Tabs
            defaultValue={defaultValueTab}
            className="w-full flex-col justify-start gap-3"
        >
            <div className="flex flex-col items-start justify-start px-4 lg:px-6 gap-3">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue={defaultValueTab}>
                    <SelectTrigger
                        className="flex w-fit @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view"/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            updatedDataSelectors.map(value =>
                                <SelectItem key={value.id + "_1"}
                                            value={value.id.toString()}>
                                    {value.label}
                                </SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
                <TabsList
                    className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    {
                        updatedDataSelectors.map(value =>
                            <TabsTrigger key={value.id + "_2"}
                                         value={value.id.toString()}>
                                    {value.label} <Badge variant="secondary">{value.quantity}</Badge>
                                </TabsTrigger>
                        )
                    }
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns/>
                                <span className="hidden lg:inline">Personalizar Columnas</span>
                                <span className="lg:hidden">Columnas</span>
                                <IconChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {GetTable({
                                data,
                                currentRol: "Todos",
                                columns,
                                sorting,
                                columnVisibility,
                                rowSelection,
                                columnFilters,
                                pagination,
                                setRowSelection,
                                setSorting,
                                setColumnFilters,
                                setColumnVisibility,
                                setPagination
                            })
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {
                updatedDataSelectors.map(value =>
                    <TabsContent
                        key={value.id + "_3"}
                        value={value.id.toString()}
                        className={"relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"}
                    >
                        <TableTabsContent data={data} table={GetTable({
                            data,
                            currentRol: value.label,
                            columns,
                            sorting,
                            columnVisibility,
                            rowSelection,
                            columnFilters,
                            pagination,
                            setRowSelection,
                            setSorting,
                            setColumnFilters,
                            setColumnVisibility,
                            setPagination
                        })} columns={columns}/>
                    </TabsContent>
                )
            }
        </Tabs>
    )
}