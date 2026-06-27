"use client";
import { useEffect, useState } from 'react';
import { X, Heart, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import SafeMotion from '@/wrappers/SafeMotion';
import { useSelector } from 'react-redux';


// Types
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


const WishlistSidebar = ({ isOpen, onClose }: WishlistSidebarProps) => {
  const data = useSelector((state: any) => state?.wishlist.items)
  const [items, setItems] = useState<Product[]>(data);
  const [isAnimating, setIsAnimating] = useState(false);
  const [totalItems , setTotalitems] = useState<number>(0);
  const [totalPrice , setTotalprice] = useState<number>(0)


  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const moveToCart = (item: Product) => {
    console.log('Moving to cart:', item);
    removeItem(item.id);


  };

  const moveAllToCart = () => {
    items.forEach(moveToCart);
  };

  
   
     useEffect(()=>{
        const total = items?.reduce((sum, item) => sum + item.quantity, 0);
     setTotalitems(total)
     const price = items?.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     setTotalprice(price)
     },[])
     
  
  

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  };


  return (

    <div
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-gray-900  transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl dark:shadow-gray-900/50' : 'translate-x-full'
        } ${isAnimating ? 'translate-x-full' : ''}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Heart className="w-5 h-5 text-[#47B083] dark:text-[#47B083]" fill="currentColor" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-[#47B083] dark:text-[#47B083]">My Wishlist</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{totalItems} items</p>
          </div>
        </div>
        <button
          title='close'
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 hover:cursor-pointer"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-3">
          {items?.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
                Start adding your favorite products to keep track of items you love
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-[#47B083] dark:bg-[#47B083] hover:cursor-pointer hover:opacity-90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            // Items List
            <div className="space-y-4">

              {items?.map((item, index) => (
                <SafeMotion
                  layout
                  key={item.id}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.5 }}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3"

                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                          Image
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.color} • {item.size}
                      </p>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-[#47B083] dark:text-[#47B083]">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 hover:cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Minus size={14} className="text-gray-600 dark:text-gray-300" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full hover:cursor-pointer bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Plus size={14} className="text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => moveToCart(item)}
                            className="p-2 text-[#47B083] dark:text-[#47B083] hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200 hover:cursor-pointer"
                            title="Add to cart"
                          >
                            <ShoppingBag size={16} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 hover:cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SafeMotion>
              ))}

            </div>
          )}
        </div>

        {/* Footer - Only show when items exist */}
        {items?.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 mb-[5.5rem]">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-400">Total ({totalItems} items)</span>
              <span className="font-bold text-lg text-[#47B083] dark:text-[#47B083]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={moveAllToCart}
                className="w-full bg-[#47B083] dark:bg-[#47B083] hover:cursor-pointer text-white py-3 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span>Add All to Cart</span>
              </button>
              <button
                onClick={handleClose}
                className="w-full border hover:cursor-pointer hover:opacity-90 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default WishlistSidebar;
