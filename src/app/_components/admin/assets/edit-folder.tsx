"use client";
import type { AdminPageProps } from "app/_components/admin/common";
import { Client, Folder, FolderRequest } from "lib/admin-api";
import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    client: Client,
};

const CreateFolderAdmin: React.FunctionComponent<AdminPageProps> = ({ client }) => {

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [accessRoles, setaccessRoles] = useState('');
    const [parentFolderId, setparentFolderId] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const submitForm: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const uploadAction = async () => {
            let result: Folder;

            try {
                result = await client.assetsCreateFolder(1, { slug, name, accessRoles, parentFolderId } as FolderRequest );
            }
            catch {
                setIsSubmitting(false);
                result = new Folder();
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
            <h1 className="pb-4">Create Asset Folder</h1>
            <Link className="button-outline" to="/admin/assets">Back</Link>
            <form className="bg-base shadow-md rounded flex flex-col w-full justify-center items-center p-12">
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input id="name" name="name" type="text" value={name} onChange={(e)=>setName(e.currentTarget.value)}
                        className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <label className="block text-sm font-bold mb-2" htmlFor="slug">
                        Slug
                    </label>
                    <input id="slug" name="slug" type="text" value={slug} onChange={(e)=>setSlug(e.currentTarget.value)}
                        className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4 w-full">
                    <button type="submit" className="button-primary" onClick={submitForm} disabled={isSubmitting}>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateFolderAdmin;