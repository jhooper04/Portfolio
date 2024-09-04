"use client";
import type { AdminPageProps } from "app/_components/admin/common";
import { Asset } from "lib/admin-api";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../admin-header";
import DataTable, { DateFilter, DateSortType, DefaultColumnFilter, FetchDataParams } from "../data-table";
import { Column } from "react-table";

const ListAssetsAdmin: React.FunctionComponent<AdminPageProps> = ({ client, routes }) => {

    const columns: Array<Column<Asset>> = useMemo(
        () => [
           {
               Header: 'Filename',
               accessor: 'filename',
               Filter: DefaultColumnFilter,
           },
           {
               Header: 'Caption',
               accessor: 'caption',
               Filter: DefaultColumnFilter,
           },
           {
               Header: 'Description',
               accessor: 'description',
               Filter: DefaultColumnFilter,
           },
           {
               Header: 'Type',
               accessor: 'type',
               Filter: DefaultColumnFilter,
           },
           {
               Header: 'Folder',
               accessor: 'folderId',
               Filter: DefaultColumnFilter,
           },
           {
               Header: 'Created',
               accessor: 'created',
               Cell: ({ value }) => value.toLocaleDateString(), // Format date for display
               Filter: DateFilter, // Use custom date filter
               sortType: DateSortType, // Custom date sorting
           },
           {
               Header: 'Last Modified',
               accessor: 'lastModified',
               Cell: ({ value }) => value.toLocaleDateString(), // Format date for display
               Filter: DateFilter, // Use custom date filter
               sortType: DateSortType, // Custom date sorting
           },
       ],
       []
   );

    const fetchRequest = async (params: FetchDataParams) => {
        return await client.assetsList(
            1,
            params.pageIndex + 1,
            params.pageSize,
            params.sortBy.length ? params.sortBy[0].id : undefined,
            params.sortBy.length ? (params.sortBy[0].desc) : undefined
        );
    }

    return (
        <div className="p-4">
            <AdminHeader routes={routes} />

            <Link className="button-outline" to="create">Create Asset</Link>
            <Link className="button-outline" to="create-folder">Create Folder</Link>
            <hr />
            <DataTable columns={columns} fetchRequest={fetchRequest} />
        </div>
    );
}

export default ListAssetsAdmin;