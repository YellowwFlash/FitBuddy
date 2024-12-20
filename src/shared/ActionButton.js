import AnchorLink from "react-anchor-link-smooth-scroll";
import { PageSections } from "./PageSections";


const ActionButton = ({ children, setSelectedPage }) => {
return (
        <AnchorLink
            className='rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white'
            onClick={setSelectedPage(PageSections.ContactUs)}
            href={`#${PageSections.ContactUs}`}
        >
            {children}
        </AnchorLink>
    )
}

export default ActionButton