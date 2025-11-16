"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion"
import { CheckCircle, MessageCircle, Send } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 5000);
    };




    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{once:true}}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
        >
            <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="text-[#47B083]" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Send us a Message
                </h2>
            </div>

            {/* Success Message */}
            {isSubmitted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                        <CheckCircle size={20} />
                        <span className="font-medium">Message sent successfully!</span>
                    </div>
                    <p className="text-green-600 dark:text-green-300 text-sm mt-1">
                        We&apos;ll get back to you within 24 hours.
                    </p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 outline-0 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 outline-0 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border outline-0 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="What's this about?"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 outline-0 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors duration-200"
                        placeholder="Tell us how we can help you..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full hover:cursor-pointer bg-gradient-to-r from-[#47B083] to-[#3A9E75] text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    )
}
