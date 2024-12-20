import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import Logo from '../../assets/FitBuddy_logo.png';
import useMediaQuery from "../../hooks/useMediaQuery";
import Link from "./link";

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage, onLogin, onLogout, isLoggedIn }) => {
    const flexBetween = 'flex items-center justify-between';
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isAboveMediumScreens = useMediaQuery('(min-width: 1012px)');
    const navbarBackground = isTopOfPage ? '' : 'bg-primary-100 drop-shadow';

    return (
        <nav>
            <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        <img alt='logo' src={Logo} />
                        {isAboveMediumScreens ? (
                            <div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    <Link page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page='Benefits' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page='Our classes' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page='Workouts' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page='Meals' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page='Contact us' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                </div>
                                <div className={`${flexBetween} gap-8`}>
                                    {isLoggedIn ? (
                                        <>
                                            <p className="cursor-pointer">Welcome, Member!</p>
                                            <button className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
                                                onClick={onLogout}>Sign Out</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={onLogin} className="cursor-pointer border-none bg-transparent">Sign In</button>
                                            <button className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white "
                                                onClick={onLogin}>Become a Member</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button className="rounded-full bg-secondary-500 p-2" onClick={() => { setIsMenuToggled(!isMenuToggled) }}>
                                <Bars3Icon className="h-6 w-6 text-white" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                    <div className="flex justify-end p-12">
                        <button onClick={() => { setIsMenuToggled(!isMenuToggled) }}>
                            <XMarkIcon className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>
                    <div className='ml-[33%] flex flex-col gap-10 text-2xl'>
                        <Link page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        <Link page='Benefits' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        <Link page='Our classes' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        <Link page='Workouts' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        <Link page='Meals' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        <Link page='Contact us' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        {isLoggedIn ? (
                            <button className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white xs:w-4/5 sm:w-4/5"
                                onClick={onLogout}>Sign Out</button>
                        ) : (
                            <>
                                <button onClick={onLogin} className="cursor-pointer border-none bg-transparent ">Sign In</button>
                                <button className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white xs:w-4/5 sm:w-4/5"
                                    onClick={onLogin}>Become a Member</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;