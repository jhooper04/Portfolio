
type Props = {
    isOpen: boolean,
    onClose: () => void,
};

const SideMenu = ({ isOpen, onClose }: Props) => {

    let classes = "fixed top-0 w-[240px] h-screen z-50 bg-surface-light-0 dark:bg-surface-dark-0 p-5 flex flex-col space-y-5 text-neutral-light dark:text-neutral-dark duration-300";
    classes += isOpen ? ' left-0' : ' left-[-250px]';

    return (
        <div className={classes}>
            <button className="text-right text-4xl" onClick={() => onClose()} aria-label="Close navigation">&times;</button>
            <a className="navtext" href="#about">About</a>
            <a className="navtext" href="#experience">Experience</a>
            <a className="navtext" href="#projects">Projects</a>
            <a className="navtext" href="#blog">Blog</a>
            <a className="navtext" href="#contact">Contact</a>
        </div>
    );
};

export default SideMenu;