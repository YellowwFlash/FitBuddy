import Benefits from "../scenes/Benefits/benefits"
import ContactUs from "../scenes/Contact Us/contactus";
import Home from "../scenes/Home/home"
import OurClasses from "../scenes/Our Classes/ourclasses";

const Main = ({ setSelectedPage }) => {
    return (
        <>
            <Home setSelectedPage={setSelectedPage} />
            <Benefits setSelectedPage={setSelectedPage} />
            <OurClasses setSelectedPage={setSelectedPage} />
            <ContactUs setSelectedPage={setSelectedPage} />
        </>
    )
}

export default Main;