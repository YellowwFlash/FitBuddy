import { PageSections } from "../../shared/PageSections";
import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import image5 from "../../assets/image5.png"
import image6 from "../../assets/image6.png"
import { motion } from 'framer-motion';
import HeadingText from "../../shared/HeadingText";
import Class from "./Class";


const classes = [
    {
        name: 'Weight Training Classes',
        description: 'Build strength, sculpt your body, and achieve your fitness goals with our expert-led weight training classes.',
        image: image1
    },
    {
        name: 'Yoga Classes',
        description: 'Improve your flexibility, strength, and mental well-being with our expertly guided yoga classes.',
        image: image2
    },
    {
        name: 'Ab Core Classes',
        description: 'Strengthen your core, improve your posture, and enhance your overall fitness with our targeted ab core classes.',
        image: image3
    },
    {
        name: 'Adventure Classes',
        description: 'Discover your inner adventurer and conquer new heights with our exhilarating classes.',
        image: image4
    },
    {
        name: 'Fitness Classes',
        description: 'Find the perfect workout for you with our variety of fitness classes.',
        image: image5
    },
    {
        name: 'Training Classes',
        description: 'Elevate your fitness journey with our expert-led training classes.',
        image: image6
    },
]

const OurClasses = ({ setSelectedPage }) => {
    return (
        <section
            id="ourclasses"
            className="w-full bg-primary-100 py-40"
        >
            <motion.div
                onViewportEnter={() => setSelectedPage(PageSections.OurClasses)}
            >
                <motion.div
                    className="mx-auto w-5/6"
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: 60 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <div className="md:w-3/5">
                        <HeadingText>OUR CLASSES</HeadingText>
                        <p className="py-5">
                            Discover a world of fitness possibilities with our diverse range of classes.
                            From high-intensity workouts to calming yoga sessions, our expertly designed classes cater to all fitness levels and interests.
                            Join a supportive community of like-minded individuals and experience the transformative power of exercise.
                            Let our classes inspire you to reach new heights and achieve your fitness goals.
                        </p>
                    </div>
                </motion.div>
                {/* Side scrolling! */}
                <div className="mt-10 h-[353px] w-full overflow-x-autp overflow-y-hidden">
                    <ul className="w-[2800px] whitespace-nowrap z-[-10]">
                        {classes.map((item, index) => {
                            return <Class
                                key={`${item.name}-${index}`}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                            />
                        })}
                    </ul>
                </div>
            </motion.div>
        </section>
    )
}

export default OurClasses;