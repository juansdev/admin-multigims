"use client"

import * as React from "react";
import {
    IconChevronDown,
    IconCircle,
    IconCircleCheckFilled,
    IconDotsVertical,
    IconGenderAgender,
    IconLayoutColumns,
    IconMoonFilled
} from "@tabler/icons-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import {IDataTable, ISchemaDataTable} from "@/interfaces/components/data-table.interface";
import {TableTabsContent} from "@/components/dataTable/components/table-tabs-content";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {z} from "zod";
import {DragHandle} from "@/components/ui/drag-handle";
import {TableCellViewer} from "@/components/dataTable/components/table-cell-viewer";


const dataSelectors = {
    creators_roblox: {
        "id": 0,
        "label": "Creadores Roblox",
        "quantity": 1
    },
    designers: {
        "id": 1,
        "label": "Diseñadores",
        "quantity": 7
    },
    editors: {
        "id": 2,
        "label": "Editores",
        "quantity": 5
    },
    programmers: {
        "id": 3,
        "label": "Programadores",
        "quantity": 10
    },
    moderators: {
        "id": 4,
        "label": "Moderadores",
        "quantity": 3
    },
    creators_minecraft: {
        "id": 5,
        "label": "Creadores Minecraft",
        "quantity": 8
    },
    marketing: {
        "id": 6,
        "label": "Marketing",
        "quantity": 2
    }
};

const getRowStatusByStatus = (status: string) => {
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
        cell: () => (
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
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Copiar Nombre</DropdownMenuItem>
                    <DropdownMenuItem>Favorito</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export function DataTable({data}: Readonly<IDataTable>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    });
    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-3"
        >
            <div className="flex flex-col items-start justify-start px-4 lg:px-6 gap-3">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="outline">
                    <SelectTrigger
                        className="flex w-fit @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"all"}>Todos</SelectItem>
                        {
                            Object.entries(dataSelectors).map(
                                ([key, value]) =>
                                    <SelectItem key={value.id} value={key}>{value.label}</SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
                <TabsList
                    className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="all">Todos <Badge variant="secondary">{Object.entries(dataSelectors).reduce(
                        (previousValue, currentValue) => {
                            const value = currentValue[1];
                            return previousValue + value.quantity;
                        }, 0)}</Badge></TabsTrigger>
                    {
                        Object.entries(dataSelectors).map(
                            ([key, value]) =>
                                <TabsTrigger key={value.id} value={key}>
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
                            {table
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
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <TableTabsContent data={data} table={table} columns={columns}/>
            </TabsContent>
            <TabsContent
                value="past-performance"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="focus-documents"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    )
}