import useMediaQuery from "../../hooks/useMediaQuery";
import ActionButton from "../../shared/ActionButton";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { PageSections } from "../../shared/PageSections";
import HomePageTextDecoration from "../../assets/HomePageTextDecoration.png"
import HomePageGraphic from "../../assets/HomePageGraphic.png"
import SponsorRedBull from "../../assets/SponsorRedBull.png"
import SponsorForbes from "../../assets/SponsorForbes.png"
import SponsorFortune from "../../assets/SponsorFortune.png"
import { motion } from 'framer-motion';

const Home = ({ setSelectedPage }) => {
    const isAboveMediumScreens = useMediaQuery('(min-width: 1012px)')

    return (
        <section
            id="home"
            className="gap-15 bg-gray-20 py-10 md:h-full md:pb-0"
        >

            {/* Image and main header */}
            <motion.div
                className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
                onViewportEnter={() => setSelectedPage('home')}
            >
                {/* Main header */}
                <div
                    className="z-10 mt-32 md:basis-3/5"
                >
                    {/* Headings */}
                    <motion.div
                        className="md:-mt-20"
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -70 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <div
                            className="relative"
                        >
                            <div
                                className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext"
                            >
                                <img alt="home-page-text" src={HomePageTextDecoration} />
                            </div>
                        </div>
                        <p
                            className="mt-8 text-sm"
                        >
                            Discover your inner athlete at FitBuddy.
                            Our state-of-the-art facility is more than just a gym; it's a haven for those seeking to transform their bodies and minds.
                            With a focus on personalized training, supportive community, and cutting-edge equipment, FitBuddy is your partner in achieving your fitness goals.
                            Immerse yourself in a vibrant atmosphere where sweat meets serenity, and watch your potential unfold.
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="mt-8 flex items-center gap-8 md:justify-start"
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -70 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <ActionButton setSelectedPage={setSelectedPage}>
                            Join Now
                        </ActionButton>
                        <AnchorLink
                            className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
                            onClick={() => setSelectedPage(PageSections.ContactUs)}
                            href={`#${PageSections.ContactUs}`}
                        >
                            <p>Learn More</p>
                        </AnchorLink>
                    </motion.div>
                </div>

                {/* Image */}
                <div
                    className="flex basis=3/5 justify-center md:z-10 md:ml-40 md:mt-166 md:justify-items-end"
                >
                    <img alt="home-page-graphic" src={HomePageGraphic} />
                </div>

            </motion.div>

            {/* Sponsors */}
            {isAboveMediumScreens && (
                <div
                    className="h-[150px] w-full bg-primary-100 py-10"
                >
                    <div
                        className="mx-auto w-5/6"
                    >
                        <div
                            className="flex w-3/5 items-center justify-between"
                        >
                            <img alt="redbull-sponsor" src={SponsorRedBull} />
                            <img alt="forbes-sponsor" src={SponsorForbes} />
                            <img alt="fortune-sponsor" src={SponsorFortune} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Home;