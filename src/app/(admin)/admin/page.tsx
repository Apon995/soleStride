
import React from 'react'

export default function page() {

  return (
    <div className="space-y-6 ">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$24,580</p>
          <p className="text-green-500 text-sm mt-1">+12% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,248</p>
          <p className="text-green-500 text-sm mt-1">+8% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Products</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">156</p>
          <p className="text-red-500 text-sm mt-1">-2% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Customers</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">5,678</p>
          <p className="text-green-500 text-sm mt-1">+15% from last month</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {/* Order items would go here */}
          <p className="text-gray-500 dark:text-gray-400">Recent orders will appear here...</p>
        </div>
      </div>

    </div>
  )
}
