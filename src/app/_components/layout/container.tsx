import classNames from "classnames";

type Props = {
    className: string,
    children: React.ReactNode,
}

const Container = ({ className, children }:Props) => {

    return (
        <div className={classNames('container w-full mx-auto px-10', className)}>
            {children}
        </div>
    );
}

export default Container;