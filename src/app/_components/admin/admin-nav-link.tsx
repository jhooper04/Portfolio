import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    to: string,
    children: ReactNode,
    end?: boolean,
};

const AdminNavLink = ({ to, children, end }: Props) => {
    return (
        <NavLink 
            to={to}
            end={end}
            className={({ isActive }) => classNames(
                "block hover:bg-slate-700 p-2 pl-4",
                isActive ? "bg-slate-800" : null,
            )}
        >
            {children}
        </NavLink>
    );
};

export default AdminNavLink;