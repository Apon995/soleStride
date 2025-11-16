"use client";


import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Heart,
  Truck,
  Shield,
  ArrowLeft,
  CreditCard,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import SafeMotion from '@/wrappers/SafeMotion';


interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number,
  inStock : boolean 
}

const initialCartItems:Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    image: '/assets/exampleShoes/img1.png',
    size: 'US 9',
    color: 'Black/White',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'Adidas Ultraboost 21',
    price: 180,
    image: '/assets/exampleShoes/img2.png',
    size: 'US 8.5',
    color: 'Core Black',
    quantity: 2,
    inStock: true
  },
  {
    id: '3',
    name: 'New Balance 574 Classic',
    price: 85,
    originalPrice: 100,
   image: '/assets/exampleShoes/img3.png',
    size: 'US 10',
    color: 'Navy Blue',
    quantity: 1,
    inStock: false
  }
];

export default function CartPage  ()  {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToWishlist = (item:Product) => {
    console.log('Moving to wishlist:', item);
    removeItem(item.id);
  };

  const applyCoupon = async () => {
    setIsApplyingCoupon(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsApplyingCoupon(false);
  
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; 
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  //  -----if-card-is-empty------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Empty Cart State */}
          <SafeMotion
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-gray-400 dark:text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to find your perfect pair!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-[#47B083] hover:bg-[#3A9E75] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Start Shopping</span>
              </Link>
              <Link
                href="/"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </SafeMotion>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Shopping Cart
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-[#47B083] hover:text-[#3A9E75] transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Continue Shopping</span>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Cart Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cart Items
                </h2>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <SafeMotion
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs text-center px-2">
                              Product Image
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {item.color} • {item.size}
                              </p>
                              
                              {/* Stock Status */}
                              {!item.inStock && (
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 mt-2">
                                  Out of Stock
                                </div>
                              )}
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-[#47B083] text-lg">
                                  ${item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                    ${item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                ${item.price} × {item.quantity}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={!item.inStock}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus size={16} className="text-gray-600 dark:text-gray-300" />
                              </button>
                              <span className={`text-lg font-medium w-8 text-center ${!item.inStock ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={!item.inStock}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus size={16} className="text-gray-600 dark:text-gray-300" />
                              </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => moveToWishlist(item)}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors duration-200"
                              >
                                <Heart size={18} />
                                <span className="text-sm font-medium hidden sm:block">Save</span>
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center space-x-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                              >
                                <Trash2 size={18} />
                                <span className="text-sm font-medium hidden sm:block">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SafeMotion>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg">
                <Truck className="text-[#47B083] mx-auto mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Free Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">On orders over $100</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg">
                <Shield className="text-[#47B083] mx-auto mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Secure Payment</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">100% protected</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg">
                <Lock className="text-[#47B083] mx-auto mb-2" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">30-day guarantee</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg sticky top-8"
            >
              {/* Summary Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Coupon Code */}
                <div>
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 outline-0 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">-${discount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="text-gray-900 dark:text-white font-medium">${tax.toFixed(2)}</span>
                  </div>

                  {/* Free Shipping Progress */}
                  {subtotal < 100 && (
                    <div className="bg-[#47B083]/10 dark:bg-[#47B083]/20 rounded-lg p-3">
                      <div className="flex justify-between text-xs text-[#47B083] dark:text-[#47B083] mb-1">
                        <span>Free shipping on orders over $100</span>
                        <span>${(100 - subtotal).toFixed(2)} to go</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#47B083] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-[#47B083]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full hover:cursor-pointer bg-gradient-to-r from-[#47B083] to-[#3A9E75] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2">
                  <CreditCard size={20} />
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                {/* Security Notice */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Lock size={14} />
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                    We accept:
                  </p>
                  <div className="flex justify-center space-x-4">
                    {['Visa', 'Mastercard', 'Mobile Banking'].map((method) => (
                      <div key={method} className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

