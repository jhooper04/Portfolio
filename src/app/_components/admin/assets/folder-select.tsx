import { Client, Folder } from 'lib/admin-api';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

type Props = {
    client: Client,
    value: FolderOption | null,
    onChange: (value: FolderOption | null) => void,
};

export type FolderOption = {
    label: string,
    value: string, 
    children?: FolderOption[],
};

const FolderSelectAdmin: React.FunctionComponent<Props> = ({ client, value, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<FolderOption | null>(null);
    
    const loadOptions = (inputValue: string) =>
        new Promise<FolderOption[]>(async (resolve) => {

            const response = await client.assetsGetAllFolders(1);
            const result: FolderOption[] = [];

            const buildTree = ((originalfolders: Folder[], transformedFolders: FolderOption[]) => {

                originalfolders.forEach((folder) => {
                    const transformed: FolderOption = { label: folder.name, value: folder.id.toString() };

                    if (folder.subFolders !== undefined && folder.subFolders.length > 0) {
                        transformed.children = [];
                        buildTree(folder.subFolders, transformed.children);
                    }
                    transformedFolders.push(transformed);
                });
            });

            buildTree(response, result);

            resolve(result);
        });

    const handleSelectChange = (value: SingleValue<FolderOption>) => {
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptions} onChange={handleSelectChange} value={selectedValue} />
    );
}

export default FolderSelectAdmin;