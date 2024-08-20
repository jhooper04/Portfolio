import classNames from "classnames";
import { Client } from "lib/admin-api";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

export type RouteInfo = {
    name: string,
    component: (client: Client, routes: { [path: string]: RouteInfo }) => JSX.Element,
    subroutes?: { [path: string]: RouteInfo },
    hidden?: boolean,
};

export type AdminPageProps = {
    client: Client,
    routes: { [path: string]: RouteInfo }
};


type ThemedButtonProps = {
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ThemedButton: FunctionComponent<ThemedButtonProps> = ({ className, ...standardProps }: ThemedButtonProps) => {
    const combinedClassName = classNames('button-primary', className);
    return (
        <button className={combinedClassName} {...standardProps}>
            {standardProps.children}
        </button>
    );
};
