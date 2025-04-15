import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {getDataByKey} from "@/helpers/data-table.helper";
import {IGetTableDto} from "@/dto/discord-users.dto";

export function useTableForRole({
                             data,
                             currentRol,
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
                                }: IGetTableDto) {
    const dataUpdated = getDataByKey(data, currentRol);
    return useReactTable({
        data: dataUpdated.length ? dataUpdated : data,
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
}