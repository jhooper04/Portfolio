import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useFilters, Column, TableInstance, usePagination, TableState, TableOptions } from 'react-table';

export interface FetchDataParams {
    pageSize: number;
    pageIndex: number;
    sortBy: Array<{ id: string; desc: boolean }>;
    filters: Array<{ id: string; value: string }>;
}

export const DefaultColumnFilter: React.FC<{
    column: { filterValue: string; setFilter: (value: string | undefined) => void };
}> = ({ column: { filterValue, setFilter } }) => (
    <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`Search...`}
    />
);

export const DateFilter: React.FC<{
    column: { filterValue: string; setFilter: (value: string | undefined) => void };
}> = ({ column: { filterValue, setFilter } }) => (
    <input
        type="date"
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value || undefined)}
    />
);

export const DateSortType = (rowA: any, rowB: any, columnId: string, desc: boolean) => {
    const dateA = rowA.original[columnId];
    const dateB = rowB.original[columnId];
    if (dateA < dateB) return desc ? 1 : -1;
    if (dateA > dateB) return desc ? -1 : 1;
    return 0;
};

interface DataList<DataRow> {
    items?: DataRow[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

type Props<DataRow extends object> = {
    columns: Array<Column<DataRow>>,
    fetchRequest: (params: FetchDataParams) => Promise<DataList<DataRow>>
};

const DataTable = <DataRow extends object,>({ columns, fetchRequest }: Props<DataRow>) => {
    const [data, setData] = useState<DataRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageCount, setPageCount] = useState<number>(0);
    const [totalRows, setTotalRows] = useState<number>(0);

    const fetchData = async (params: FetchDataParams) => {
        setLoading(true);

        try {
            const response = await fetchRequest(params);
            setData(response.items || []);
            setPageCount(Math.ceil(response.totalCount / pageSize));
            setTotalRows(response.totalCount);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize, sortBy, filters },
    } = useTable<DataRow>(
        {
            columns,
            data,
            manualSortBy: true,
            manualFilters: true,
            pageCount,
            initialState: {
                pageIndex: 0
            },
            fetchData,
            manualPagination: true,
        } as TableOptions<DataRow>,
        useFilters,
        useSortBy,
        usePagination, // Add usePagination hook here
    ) as TableInstance<DataRow> & {
        state: TableState<DataRow> & {
            pageIndex: number;
            pageSize: number;
            sortBy: Array<{ id: string; desc: boolean }>;
            filters: Array<{ id: string; value: string }>;
        };
    };

    useEffect(() => {
        fetchData({ pageSize, pageIndex, sortBy, filters });
    }, [pageIndex, pageSize, sortBy, filters]);

    return (
        <>
            <div className="overflow-scroll">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            const { key: groupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={groupKey} {...restHeaderGroupProps}>
                                    {headerGroup.headers.map((column: any) => {
                                        const { key: columnKey, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps());
                                        return (
                                            <th key={columnKey} {...restHeaderProps}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                </span>
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length}>Loading...</td>
                            </tr>
                        ) : rows.length > 0 ? (
                            rows.map((row) => {
                                prepareRow(row);
                                const { key: rowKey, ...restRowProps } = row.getRowProps();
                                return (
                                    <tr key={rowKey} {...restRowProps}>
                                        {row.cells.map((cell) => {
                                            const { key: cellKey, ...restCellProps } = cell.getCellProps();
                                            return (
                                                <td key={cellKey} {...restCellProps}>{cell.render('Cell')}</td>
                                            )
                                    })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>No Data Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                Page {pageIndex + 1} of {pageCount} | Total Rows: {totalRows}
            </div>
        </>
    );
};

export default DataTable;