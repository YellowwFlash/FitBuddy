import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AnchorLink from "react-anchor-link-smooth-scroll";

const PageSections = {
    HOME: 'home',
    BENEFITS: 'benefits',
    OURCLASSES: 'ourclasses',
    CONTACTUS: 'contactus'
};

const Link = ({ page, selectedPage, setSelectedPage }) => {
    const location = useLocation();
    const formattedPage = page.toLowerCase().replace(/\s+/g, '');
    const isHomeSection = Object.values(PageSections).includes(formattedPage);

    const handleClick = () => {
        setSelectedPage(formattedPage);
        if (isHomeSection && location.pathname !== '/') {
            // If we're not on the home page, navigate to home first
            setTimeout(() => {
                const element = document.getElementById(formattedPage);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    if (isHomeSection) {
        return location.pathname === '/' ? (
            <AnchorLink
                className={`${selectedPage === formattedPage ? 'text-primary-500' : ''}
          transition duration-500 hover:text-primary-300`}
                href={`#${formattedPage}`}
                onClick={handleClick}
            >
                {page}
            </AnchorLink>
        ) : (
            <RouterLink
                to={`/#${formattedPage}`}
                className={`${selectedPage === formattedPage ? 'text-primary-500' : ''}
          transition duration-500 hover:text-primary-300`}
                onClick={handleClick}
            >
                {page}
            </RouterLink>
        );
    } else {
        return (
            <RouterLink
                to={`/${formattedPage}`}
                className={`${selectedPage === formattedPage ? 'text-primary-500' : ''}
          transition duration-500 hover:text-primary-300`}
                onClick={() => setSelectedPage(formattedPage)}
            >
                {page}
            </RouterLink>
        );
    }
};

export default Link;