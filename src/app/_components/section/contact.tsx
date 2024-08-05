"use client";
import { MouseEventHandler, useState } from "react";
import CircuitImage from "../svg/circuit";
import { ApiConfig, ApiException, Client, MessageRequest, Message } from "lib/admin-api";

type Props = {
    browserBaseApiUrl: string,
}

type Result = {
    succeeded: boolean,
    errors: string[],
};

export default function ContactSection({browserBaseApiUrl} : Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (name.length == 0) {
            setError("Name is required.");
            return;
        }
        if (email.length == 0) {
            setError("Email is required.");
            return;
        }
        if (body.length == 0) {
            setError("Message is required.");
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            setError("Please enter a valid email address.");
            return;
        }

        const client = new Client(new ApiConfig, browserBaseApiUrl);

        setIsSubmitting(true);

        const sendMessage = async (request: MessageRequest):Promise<Message> => {
            return await client.messagesSend(1, request);
        };

        sendMessage(new MessageRequest({name, email, body}))
            .then((result) => {
                if (result) {
                    setName(''); 
                    setEmail(''); 
                    setBody(''); 
                    setError(null);
                    setIsSuccess(true);
                    return result;
                }
                return result;
            })
            .catch((error: ApiException )=> {
                if (error.response) {
                    const err = (error.response as unknown as Result).errors;
                    if (err) setError((error.response as unknown as Result).errors?.join(' '));
                    else setError(error.message);
                }
                else {
                    setError(error.message);
                }
            })
            .finally(() => setIsSubmitting(false));
    };

    return (
        <section className="py-16 bg-base-alt" id="contact">
            <div className="w-full container mx-auto px-10">
                <h2 className="text-2xl font-bold leading-tight text-left">Contact</h2>

                <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                        <form className="bg-base shadow-md rounded flex flex-col w-full justify-center items-center p-12">
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline" 
                                />
                                
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="shadow appearance-none border border-muted bg-base-alt rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                                />
                                
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="email">
                                    Message
                                </label>
                                <textarea id="message" name="message" rows={4} cols={4}  value={body} onChange={(e) => setBody(e.target.value)}
                                    className="shadow appearance-none border border-muted bg-base-alt rounded w-full py-2 px-3 resize-none leading-tight focus:outline-none focus:shadow-outline" 
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <button type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
                                    Send
                                </button>
                                {error &&
                                    <p className="p-4 text-red-400">
                                        {error}
                                    </p>
                                }
                                {isSuccess &&
                                    <p className="p-4 text-green-400">
                                        Thank you for reaching out! Your message has been successfully sent. I&apos;ll get back to you as soon as possible. Have a great day!
                                    </p>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center items-center">
                        <CircuitImage className="" />
                    </div>
                </div>
            </div>
        </section>
    );
}