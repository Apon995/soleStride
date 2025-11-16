import { Package } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotFoundProduct() {
    return (
        <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <Link href={"products/new"} className="bg-[#47B083] hover:bg-[#3A9E75] text-white px-6 py-2 rounded-xl transition-colors duration-200">
                Add New Product
            </Link>
        </div>
    )
}
