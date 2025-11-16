"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Home,  
  ShoppingBag, 

  MapPin,
  Footprints
} from 'lucide-react';


export default function NotFoundPage () {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{once:true}}
          className="text-center mb-4"
        >
          <Link href="/" className="inline-flex items-center space-x-2 text-[#47B083] hover:text-[#3A9E75] transition-colors duration-300 mb-8">
            <Footprints size={32} />
            <span className="text-2xl font-bold">SoleStride</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{once:true}}
            className="text-center lg:text-left"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{once:true}}
              className="text-8xl md:text-9xl font-black text-gray-300 dark:text-gray-700 mb-4 lg:mb-8"
            >
              404
            </motion.div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Lost Your <span className="text-[#47B083]">Stride</span>?
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Looks like this page has walked off! Don&apos;t worry - even the best shoes 
              sometimes take a wrong turn. Let&apos;s get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/"
                className="bg-[#47B083] hover:bg-[#3A9E75] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300  flex items-center justify-center space-x-2 shadow-lg"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </Link>
              
              <Link
                href="/"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Continue Shopping</span>
              </Link>
            </div>
           
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{once:true}}
            className="relative"
          >
            {/* Main Illustration */}
            <div className="relative bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/30 rounded-3xl p-8 shadow-2xl">
              
              {/* Lost Shoe Illustration */}
              <div className="relative h-64 md:h-80 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute left-1/4 top-1/4"
                >
                  <div className="w-16 h-8 bg-[#47B083] rounded-full rotate-45"></div>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute right-1/4 bottom-1/4"
                >
                  <div className="w-12 h-6 bg-[#3A9E75] rounded-full -rotate-12"></div>
                </motion.div>

                {/* Question Mark */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="text-6xl md:text-8xl text-[#47B083] font-black"
                >
                  ?
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-8"
                >
                  <Footprints size={24} className="text-gray-400 dark:text-gray-500" />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-8 left-4"
                >
                  <MapPin size={20} className="text-gray-400 dark:text-gray-500" />
                </motion.div>
              </div>

              {/* Message Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-6"
              >
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &quot;Even the perfect pair can&apos;t find this page!&quot;
                </p>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#47B083] to-[#3A9E75] rounded-3xl blur-xl opacity-10 -z-10"></div>
          </motion.div>
        </div>


        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{once:true}}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[#47B083] to-[#3A9E75] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help Finding Something?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help you find exactly what you&apos;re looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#47B083] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Support
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#47B083] transition-colors duration-300"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

