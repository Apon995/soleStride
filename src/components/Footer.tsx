

import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Footprints,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "@/client_Render/footer/SubscribeForm";



interface objItems {
  id: number;
  title: string;
  image: string;
}

interface quickLinks {
  id: number,
  label: string,
  route: string
}


const we_accpect: objItems[] = [
  { id: 1, title: "visa", image: "/assets/we_accpect/visa.png" },
  { id: 2, title: "master", image: "/assets/we_accpect/master.png" },
  { id: 3, title: "american", image: "/assets/we_accpect/american.png" },
];

const secure_payment: objItems[] = [
  { id: 1, title: "bkash", image: "/assets/secure_payment/bkash.webp" },
  { id: 2, title: "nagad", image: "/assets/secure_payment/nagad.png" },
  { id: 3, title: "rocket", image: "/assets/secure_payment/Rocket.png" },
];


const quickLinks = [
  { id: 1, label: "Home", route: "/" },
  { id: 2, label: "About us", route: "/about" },
  { id: 3, label: "Contact us", route: "/contact" },
  { id: 4, label: "Shopping cart", route: "/cart" },
];


export default function Footer() {




  return (
    <div className="w-full border-t dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-12 lg:gap-4">
          {/* Brand Section */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center space-x-2 text-[#47B083] ">
              <Footprints size={32} />
              <span className="text-2xl font-bold">SoleStride</span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400">
              Premium footwear for every step of your journey. Quality, comfort,
              and style in every pair.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, link: "/" },
                { icon: <Facebook size={20} />, link: "/" },
                { icon: <Twitter size={20} />, link: "/" },
                { icon: <Linkedin size={20} />, link: "/" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  className="bg-[#F1F1F1] dark:bg-gray-800 hover:bg-[#47B083] dark:hover:bg-[#47B083] hover:text-white p-2 rounded-full transition-colors duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.route}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-[#47B083] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Running Shoes",
                "Casual Sneakers",
                "Basketball Shoes",
                "Training Shoes",
                "Sandals",
                "Hiking Boots",
              ].map((category, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-[#47B083] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: <MapPin size={18} />,
                    text: "pallabi, mirpur - Dhaka 1216",
                  },
                  { icon: <Phone size={18} />, text: "01308050695" },
                  {
                    icon: <Mail size={18} />,
                    text: "SoleStrideshop@gmail.com",
                  },
                ].map((contact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-[#47B083] mt-0.5">{contact.icon}</div>
                    <span className="text-gray-600 dark:text-gray-400">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Subscribe to get special offers, free giveaways, and new releases
              </p>
              <SubscribeForm />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-gray-600 dark:text-gray-400 mb-3">We Accept</h4>
              <div className="flex gap-4 flex-wrap">
                {we_accpect.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <Image
                      width={30}
                      height={30}
                      alt={item?.title}
                      src={item.image}
                      style={{ width: "auto", height: "auto" }}
                      className="filter dark:invert-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-600 dark:text-gray-400 mb-3">Secure Payment</h4>
              <div className="flex gap-4 flex-wrap">
                {secure_payment.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <Image
                      width={25}
                      height={25}
                      src={item.image}
                      alt={item?.title}
                       style={{ width: "auto", height: "auto" }}
                      className="filter dark:invert-0 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-100 dark:bg-gray-800 py-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} SoleStride. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {["Privacy Policy", "Terms of Service", "Returns Policy"].map(
                (policy, index) => (
                  <Link
                    key={index}
                    href="/"
                    className="text-gray-500 dark:text-gray-400 hover:text-[#47B083] dark:hover:text-[#47B083] text-sm transition-colors duration-200"
                  >
                    {policy}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

