import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import ContactUsPageGraphic from "../../assets/ContactUsPageGraphic.png";
import HeadingText from "../../shared/HeadingText";
import { PageSections } from "../../shared/PageSections";


const ContactUs = ({ setSelectedPage }) => {

    const navigate = useNavigate();
    const inputStyles = "mb-5 w-full rounder-lg bg-primary-300 px-5 py-3 placeholder-white";
    const { register, trigger, formState: { errors } } = useForm();
    const onSubmit = async (e) => {
        const isValid = await trigger();
        if (!isValid)
            e.preventDefault()
        else {
            window.location.reload();
        }
    }

    return (
        <section id="contactus"
            className="mx-auto w-5/6 pt-24 pb-32">
            <motion.div
                onViewportEnter={() => setSelectedPage(PageSections.ContactUs)}>

                {/* Header */}
                <motion.div
                    className="md:w-3/5"
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -70 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <HeadingText>
                        <span className="text-primary-500">JOIN NOW</span> TO GET IN SHAPE
                    </HeadingText>
                    <p className="my-5">
                        Ready to take control of your health and fitness?
                        Join our supportive community and experience the transformative power of exercise.
                        With expert guidance, state-of-the-art facilities, and a variety of classes, we're here to help you achieve your goals and live your best life.
                    </p>
                </motion.div>

                {/* Form and image */}
                <div className="mt-10 justify-between gap-8 md:flex">
                    <motion.div
                        className="mt-10 basis-3/5 md:mt-0"
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <form target="_blank"
                            onSubmit={onSubmit}
                            action="https://formsubmit.co/23fa37085f131fb842061cf3724fde7b"
                            method="POST"
                        >

                            <input
                                className={inputStyles}
                                type="text"
                                placeholder="NAME"
                                {...register('name', {
                                    required: true,
                                    maxLength: 100
                                })}
                            />
                            {errors.name && (
                                <p className="mb-2 text-primary-500">
                                    {errors.name.type === 'required' && 'This field is required'}
                                    {errors.name.type === 'maxLength' && 'This field has maximum length of 100 chars'}
                                </p>
                            )}

                            <input
                                className={inputStyles}
                                type="email"
                                placeholder="EMAIL"
                                {...register('email', {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                })}
                            />
                            {errors.email && (
                                <p className="mb-2 text-primary-500">
                                    {errors.email.type === 'required' && 'This field is required'}
                                    {errors.email.type === 'pattern' && 'Invalid email address'}
                                </p>
                            )}

                            <textarea
                                className={inputStyles}
                                rows={4}
                                cols={50}
                                placeholder="MESSAGE"
                                {...register('message', {
                                    required: true,
                                    maxLength: 2000
                                })}
                                style={ {resize: "none"}}
                            ></textarea>
                            {errors.message && (
                                <p className="mb-2 text-primary-500">
                                    {errors.message.type === 'required' && 'This field is required'}
                                    {errors.message.type === 'maxLength' && 'This field has maximum length of 2000 chars'}
                                </p>
                            )}

                            <button
                                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transtion duration-500 hover:text-white"
                            >
                                SUMBIT
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        className="relative mt-16 basis-2/5 md:mt-0"
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <div className="md:before:content-evolvetext w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1]">
                            <img className="w-full" alt={`ContactUsPageGraphic`} src={ContactUsPageGraphic} />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default ContactUs;