"use client";
import { ThemedButton, type AdminPageProps } from "app/_components/admin/common";
import { Asset, Client, FileParameter } from "lib/admin-api";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import FolderSelectAdmin, { FolderOption } from "app/_components/admin/assets/folder-select";
import AdminHeader from "../admin-header";

const CreateAssetAdmin: React.FunctionComponent<AdminPageProps> = ({ client, routes }) => {
    const [file, setFile] = useState<FileParameter>();
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [generateThumbnails, setGenerateThumbnails] = useState(false);
    const [folder, setFolder] = useState<FolderOption | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const handleFolderChange = (value: FolderOption | null) => {
        setFolder(value);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            const reader = new FileReader();

            reader.readAsDataURL(e.target.files[0]);
            setFile({ data: e.target.files[0], fileName: e.target.files[0].name });
        }
    };

    const submitForm: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const uploadAction = async () => {
            let result: Asset;

            try {
                result = await client.assetsUpload(1, 
                    file, 
                    caption, 
                    description, 
                    '', 
                    imageWidth, 
                    imageHeight, 
                    generateThumbnails, 
                    folder == null ? 0 : parseInt(folder.value) 
                );
            }
            catch {
                setIsSubmitting(false);
                result = new Asset();
            }

            return result;
        };

        uploadAction()
            .then((result) => { setResultMessage("Success"); })
            .then(() => setIsSubmitting(false))
            .catch(console.error);
    }

    return (
        <div>
            <AdminHeader routes={routes} />
            <form className="bg-base shadow-md rounded flex flex-col w-full justify-center items-center p-12">
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        File
                    </label>
                    <input id="file" name="file" type="file" onChange={(e) => handleFileChange(e)}
                        className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Folder
                    </label>
                    <FolderSelectAdmin id="" client={client} value={folder} onChange={handleFolderChange} />
                </div>
                <div className="mb-4 w-full">
                    <ThemedButton type="submit" onClick={submitForm} disabled={isSubmitting}>
                        Upload
                    </ThemedButton>
                </div>
            </form>
        </div>
    );
}

export default CreateAssetAdmin;