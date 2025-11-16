import { CreditCard, Gift, ShieldCheck, Truck } from "lucide-react";

const TrustBadge: React.FC = () => {
    return (
        <div className="bg-[#47B083] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-800  py-6 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: <Truck size={32} />, title: "Free Shipping", text: "On orders over $99" },
                        { icon: <Gift size={32} />, title: "Special Offers", text: "New deals every week" },
                        { icon: <CreditCard size={32} />, title: "Secure Payment", text: "100% protected" },
                        { icon: <ShieldCheck size={32} />, title: "Money Back", text: "30-day guarantee" }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left group transition-transform duration-200">
                            <div className="text-white bg-[#47B083] dark:bg-[#47B083] p-2 rounded-full border-2 border-white dark:border-[#47B083] group-hover:border-white/80 transition-colors duration-200">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-white dark:text-white">{item.title}</h3>
                                <p className="text-sm text-white/90 dark:text-white/80">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrustBadge