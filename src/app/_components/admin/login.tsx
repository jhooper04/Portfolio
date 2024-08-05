"use client";
import { ApiConfig, Auth, AuthRequest, Client, setAuthorizationToken } from "lib/admin-api";
import { MouseEventHandler, useState } from "react";
import { redirect } from "react-router-dom";
import type { AdminPageProps } from "./common";

const LoginAdmin: React.FunctionComponent<AdminPageProps> = ({client}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const loginAction = async () => {
            let result: Auth;

            try {
                result = await client.usersLogin({ email: email, password: password } as AuthRequest);
            }
            catch {
                setIsSubmitting(false);
                result = new Auth();
            }
            
            return result;
        };

        loginAction()
            .then((result) => { setAuthorizationToken(result?.token || null); if (result.token) window.location.href='/admin'; })
            .then(()=>setIsSubmitting(false))
            .catch(console.error);
    }

    return (
        <div>
            <h1>Login</h1>
            <form className="bg-base shadow-md rounded flex flex-col w-full justify-center items-center p-12">
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline"
                    />
                    
                </div>
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="shadow appearance-none border border-muted bg-base-alt rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4 w-full">
                    <button type="submit" className="button-primary" onClick={submitForm} disabled={isSubmitting}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginAdmin;