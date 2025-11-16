

import ContactForm from '@/client_Render/contact/ContactForm';
import SafeMotion from '@/wrappers/SafeMotion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HeadphonesIcon,
  CheckCircle,
} from 'lucide-react';






const contactInfo = [
  {
    icon: <MapPin size={24} />,
    title: "Visit Our Store",
    details: ["pallabi, mirpur - Dhaka 1216"],
    description: "Come experience our premium collection in person"
  },
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    details: ["+880 1308-050695"],
    description: "Mon-Fri from 8am to 6pm"
  },
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    details: ["support@solestride.com", "info@solestride.com"],
    description: "We'll respond within 24 hours"
  },
  {
    icon: <Clock size={24} />,
    title: "Business Hours",
    details: ["Monday - Friday: 9:00 - 20:00", "Saturday: 10:00 - 18:00", "Sunday: 12:00 - 16:00"],
    description: "Customer support available"
  }
];

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unworn items in original packaging."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide with various shipping options."
  },
  {
    question: "How can I track my order?",
    answer: "You'll receive a tracking number via email once your order ships."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and various local payment methods."
  }
];


export default function page() {
  
  


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#47B083] to-[#3A9E75] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SafeMotion
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{once:true}}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We&apos;re here to help you find the perfect stride. Reach out to us with any questions or concerns.
            </p>
          </SafeMotion>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <SafeMotion
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{once:true}}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let&apos;s Talk
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Have questions about our products or need assistance with your order?
                  Our friendly team is here to help you every step of the way.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <SafeMotion
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{once:true}}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-[#47B083]/10 rounded-lg text-[#47B083]">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </SafeMotion>
                ))}
              </div>

              {/* Support Features */}
              <SafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{once:true}}
                className="bg-gradient-to-br from-[#47B083] to-[#3A9E75] rounded-2xl p-6 text-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <HeadphonesIcon size={24} />
                  <h3 className="font-semibold text-lg">24/7 Support</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Our customer support team is available around the clock to assist you with any inquiries.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle size={16} className="text-green-300" />
                  <span>Live Chat Support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle size={16} className="text-green-300" />
                  <span>Email Support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle size={16} className="text-green-300" />
                  <span>Phone Support</span>
                </div>
              </SafeMotion>
            </SafeMotion>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 ">
            <ContactForm/>

            {/* FAQ Section */}
            <SafeMotion
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{once:true}}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <SafeMotion
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{once:true}}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {faq.answer}
                    </p>
                  </SafeMotion>
                ))}
              </div>
            </SafeMotion>
          </div>
        </div>

        {/* Map Section */}
        <SafeMotion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{once:true}}
          className="mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Find Our Store
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Visit us at our flagship store in the heart of the city
              </p>
            </div>
            <div className="h-64 relative md:h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center ">
              <iframe className="absolute top-0 left-0 w-full h-full rounded-b-2xl"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58393.884554282144!2d90.28673163151501!3d23.832186842491797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c124b21679e3%3A0x48d7e114b00a18cb!2sPallabi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1761993482226!5m2!1sen!2sbd" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </SafeMotion>
      </div>
    </div>
  );
};

