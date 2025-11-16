import SafeMotion from '@/wrappers/SafeMotion';
import {
  Award,
  Users,
  Globe,
  Heart,
  Shield,
  Truck,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';


interface statusTypes {
  icon: React.ReactNode,
  number: string,
  label: string
}
interface valuesTypes {
  icon: React.ReactNode,
  title: string,
  description: string

}

interface teamTypes {
  name: string,
  role: string,
  image: string,
  description: string

}


const stats: statusTypes[] = [
  { icon: <Users size={32} />, number: "50K+", label: "Happy Customers" },
  { icon: <Globe size={32} />, number: "100+", label: "Countries Served" },
  { icon: <Award size={32} />, number: "15+", label: "Years Experience" },
  { icon: <Truck size={32} />, number: "1M+", label: "Products Delivered" }
];

const values: valuesTypes[] = [
  {
    icon: <Heart size={28} />,
    title: "Passion for Quality",
    description: "Every pair is crafted with attention to detail and superior materials."
  },
  {
    icon: <Shield size={28} />,
    title: "Trust & Reliability",
    description: "Your satisfaction and trust are our top priorities."
  },
  {
    icon: <Globe size={28} />,
    title: "Global Community",
    description: "Connecting shoe lovers worldwide with premium footwear."
  },
  {
    icon: <Award size={28} />,
    title: "Excellence",
    description: "Setting industry standards for quality and service."
  }
];

const team: teamTypes[] = [
  {
    name: "Mohammad Ali",
    role: "Founder & CEO",
    image: "/assets/contactus/founder.avif",
    description: "Passionate about bringing comfort and style together."
  },
  {
    name: "Sheikh Sahal",
    role: "Head of Design",
    image: "/assets/contactus/head_of_design.avif",
    description: "Creative visionary behind our unique collections."
  },
  {
    name: "Umar bin ali",
    role: "Customer Success",
    image: "/assets/contactus/Receptionist.avif",
    description: "Ensuring every customer has the best experience."
  }
];

export default function AboutUs() {

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-[#47B083]">SoleStride</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Where every step tells a story. We&apos;re passionate about bringing you the perfect blend
            of style, comfort, and quality in every pair of shoes.
          </p>
        </SafeMotion>

        {/* Hero Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Journey Began with a Single Step
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Founded in 2008, SoleStride started as a small boutique with a big dream: to revolutionize
              the way people experience footwear. Today, we&apos;re a global community of shoe enthusiasts
              dedicated to quality, comfort, and style.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              From running trails to city streets, from boardrooms to ballrooms, we believe the right
              pair of shoes can transform your day and elevate your confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">30-Day Returns</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#47B083] to-[#3A9E75] rounded-2xl p-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-white/90 leading-relaxed">
                  To empower every individual to walk with confidence, comfort, and style by providing
                  exceptional footwear that combines innovative design with uncompromising quality.
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </SafeMotion>

        {/* Stats Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <SafeMotion
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#47B083] mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </SafeMotion>
          ))}
        </SafeMotion>

        {/* Values Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <SafeMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-[#47B083] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </SafeMotion>
            ))}
          </div>
        </SafeMotion>

        {/* Team Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <SafeMotion
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 relative dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <Image fill alt={member.name} src={member.image} className='object-cover rounded-full' />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-[#47B083] font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.description}
                  </p>
                </div>
              </SafeMotion>
            ))}
          </div>
        </SafeMotion>

        {/* CTA Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#47B083] to-[#3A9E75] rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who have found their perfect stride with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#47B083] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Shop Collection
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#47B083] transition-colors duration-300">
              Learn More
            </button>
          </div>
        </SafeMotion>
      </div>
    </section>
  );
};

