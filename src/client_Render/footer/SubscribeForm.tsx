"use client";

import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

export default function SubscribeForm() {
      const [email, setEmail] = useState<string>("");
    
      const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
          alert(`Thank you for subscribing with: ${email}`);
          setEmail("");
        }
      };
    
    
    return (
        <form onSubmit={handleSubscribe} className="flex gap-2 flex-row">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg w-[95%] px-2 py-2.5 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#47B083] dark:focus:ring-[#47B083] transition-colors duration-200"
                required
            />
            <button
                type="submit"
                className="bg-[#47B083] hover:bg-[#3a9d72] dark:hover:bg-[#3a9d72] hover:cursor-pointer text-white rounded-lg px-4 py-2.5 transition-colors duration-200 flex items-center"
            >
                <ArrowRight className="md:ml-1" size={18} />
            </button>
        </form>
    )
}
