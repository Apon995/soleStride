"use client";

import React from "react";
import { product } from "@/Fakedata/Product";
import Card from "@/components/ui/Card";

export default function MainShop() {
    return (
        <div className="px-4 py-8 overflow-hidden max-w-7xl mx-auto">
            {product.map((category) => (
                <section key={category.name} className="mb-12">
                    <h2 className="text-2xl font-bold text-[#47B083] dark:text-white mb-4">
                        {category.name}
                    </h2>
                    <div className=" flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.items.map(( item , index:number) => (
                            <Card key={index}/>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
