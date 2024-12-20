import { HomeModernIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { motion } from 'framer-motion';
import { PageSections } from "../../shared/PageSections";
import HeadingText from "../../shared/HeadingText";
import Benefit from "./Benefit";
import ActionButton from "../../shared/ActionButton";
import BenefitsPageGraphic from "../../assets/BenefitsPageGraphic.png"


const benefits = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: 'State of the Art Facilitites',
        description: 'Experience the future of fitness with our top-tier equipment and luxurious facilities. From spacious workout areas to advanced cardio machines, FitBuddy offers a premium environment designed to elevate your training.'
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: "100's of diverse Classes",
        description: " Discover your passion with our wide range of fitness classes. Whether you're into high-intensity workouts, calming yoga, or exhilarating dance, we have something for everyone. Our diverse offerings cater to all fitness levels and interests."
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: 'Experts and Pro trainers',
        description: "Benefit from expert guidance from our certified trainers. With personalized training plans and motivational support, they'll help you achieve your fitness goals and make the most of your workouts."
    }
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }  // To stagger children one by one after a delay of 0.2
    }
}

const Benefits = ({ setSelectedPage }) => {
    return (
        <section
            id="benefits"
            className="mx-auto min-h-full w-5/6 py-20"
        >
            <motion.div
                onViewportEnter={() => setSelectedPage(PageSections.Benefits)}
            >
                {/* Header */}
                <motion.div
                    className="md:my-5 md:w-3/5"
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -70 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <HeadingText>MORE THAN JUST A GYM</HeadingText>
                    <p className="my-5 text-sm">
                        Experience the pinnacle of fitness at FitBuddy.
                        Our world-class equipment, expert trainers, and engaging classes are designed to guide you effortlessly toward your ultimate fitness goals.
                        We believe in providing personalized care to each and every member, ensuring your journey is both challenging and rewarding.
                        Join the FitBuddy community and discover the transformative power of fitness.
                    </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                    className="mt-5 items-center justify-between gap-8 md:flex"
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    variants={container}
                >
                    {benefits.map(benefit =>
                        <Benefit
                            key={benefit.title}
                            icon={benefit.icon}
                            description={benefit.description}
                            setSelectedPage={setSelectedPage}
                        />
                    )}
                </motion.div>

                {/* Graphics and Description */}
                <div className="mt-16 items0center justify-between gap-20 md:mt-28 md:flex">
                    {/* Graphic */}
                    <img className='mx-auto' alt="" src={BenefitsPageGraphic} />

                    {/* Description */}
                    <div>

                        {/* Title */}
                        <div className="relative">
                            <div
                                className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] content-abstractwaves">
                                <motion.div
                                    initial='hidden'
                                    whileInView='visible'
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    variants={{
                                        hidden: { opacity: 0, x: 60 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <HeadingText>THOUSANDS OF HAPPY MEMBERS GETTING {" "}
                                        <span className="text-primary-500">FIT</span>
                                    </HeadingText>
                                </motion.div>
                            </div>
                        </div>

                        {/* Description */}
                        <motion.div
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                hidden: { opacity: 0, x: 60 },
                                visible: { opacity: 1, x: 0 }
                            }}
                        >
                            <p className="my-5">Witness the incredible transformations of our thousands of satisfied members.
                                From beginners to fitness enthusiasts, our supportive community has helped countless individuals achieve their health and wellness goals.
                                Join us and discover the power of positive change.</p>
                            <p className="mb-5">
                                Embark on a fitness journey unlike any other.
                                With our expert guidance, state-of-the-art facilities, and inspiring community, you'll find the motivation and support you need to reach your full potential.
                                Experience the joy of achieving your fitness goals and become part of our thriving community.
                            </p>
                        </motion.div>

                        {/* Button */}
                        <div className="relative mt-16">
                            <div className="z-0 before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                                <ActionButton setSelectedPage={setSelectedPage}>Join Now</ActionButton>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Benefits;