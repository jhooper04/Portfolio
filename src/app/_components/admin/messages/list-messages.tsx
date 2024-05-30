"use client";
import { Client, MessageList } from "lib/admin-api";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

type Props = {
    client: Client,
};

const ListMessagesAdmin = ({ client }: Props) => {
    const [messages, setMessages] = useState<MessageList | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({});

    const loadMessages = () => {
        setLoading(true);
        const fetchPosts = async () => {
            var messages = await client.messagesList(1);
            setMessages(messages);
        }
        fetchPosts().then(() => setLoading(false)).catch((reason) => setError(reason));
    }

    useEffect(loadMessages, [client]);


    const onDeleteClick = (id: number) => {
        
        const doDelete = async () => {
            var posts = await client.messagesDelete(id, 1);

            loadMessages();
        }
        doDelete().then(() => setLoading(false)).catch((reason) => setError(reason));
    }

    if (loading) {
        return (<div>Loading...</div>);
    }

    return (
        <div>
            <h1 className="pb-4 mb-4">Listing all messages</h1>
            <p className="mt-4">here is a post list</p>
            {messages?.items?.map((message) => (
                <div key={message.id}>
                    <h3 className="pt-4">{message.name} {message.email} {message.created.toDateString()}</h3>
                    <p className="pb-4">{message.body}</p>
                    <a onClick={() => onDeleteClick(message.id)} className="button-outline">Delete</a>
                </div>
            ))}
            {error && (
                <p className="mt-4 text-red-400">{error}</p>
            )}
        </div>
    );
}

export default ListMessagesAdmin;