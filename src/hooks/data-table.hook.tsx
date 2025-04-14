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
import {IGetTable} from "@/interfaces/components/data-table.interface";

export function GetTable({
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
                         }: IGetTable) {
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