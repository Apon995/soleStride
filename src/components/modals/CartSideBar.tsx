import { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import SafeMotion from '@/wrappers/SafeMotion';

interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
    inStock: boolean;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}


const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Nike Air Max 270',
        price: 150,
        originalPrice: 180,
        image: '/api/placeholder/80/80',
        size: 'US 9',
        color: 'Black/White',
        quantity: 1,
        inStock: true
    },
    {
        id: '2',
        name: 'Adidas Ultraboost 21',
        price: 180,
        image: '/api/placeholder/80/80',
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
        image: '/api/placeholder/80/80',
        size: 'US 10',
        color: 'Navy Blue',
        quantity: 1,
        inStock: false
    }
];

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
    const [items, setItems] = useState<CartItem[]>(mockCartItems);
    const [isAnimating, setIsAnimating] = useState(false);

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(id);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const moveToWishlist = (item: CartItem) => {
        // In a real app, this would dispatch an action to add to wishlist
        console.log('Moving to wishlist:', item);
        removeItem(item.id);
    };

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onClose();
            setIsAnimating(false);
        }, 300);
    };

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (

        <div
            className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-gray-900  transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl ' : 'translate-x-full'
                } ${isAnimating ? 'translate-x-full' : ''} flex flex-col`}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-[#47B083]/10 to-white dark:from-[#47B083]/20 dark:to-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#47B083] rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-[#47B083] dark:text-white">Shopping Cart</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{totalItems} items</p>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 px-6">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
                            Looks like you haven&apos;t added any items to your cart yet
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-6 py-3 bg-[#47B083] text-white rounded-lg hover:bg-[#3a9d72] transition-colors duration-200 font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    // Items List
                    <div className="p-3 space-y-4">
                        {items.map((item, index) => (
                            <SafeMotion
                               layout
                                key={item.id}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3, delay: index * 0.5 }}
                                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                            >
                                <div className="flex space-x-4">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                                                Image
                                            </div>
                                        </div>
                                        {!item.inStock && (
                                            <div className="absolute -top-1 -left-1">
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

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
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-full  hover:cursor-pointer bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!item.inStock}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className={`text-sm font-medium w-6 text-center ${!item.inStock ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-full hover:cursor-pointer bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!item.inStock}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Move to Wishlist */}
                                            <button
                                                onClick={() => moveToWishlist(item)}
                                                className="p-2 text-gray-400 hover:cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                                title="Move to wishlist"
                                            >
                                                <Heart size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SafeMotion>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer - Only show when items exist */}
            {items.length > 0 && (
                <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                    {/* Total */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-white">Total ({totalItems} items)</span>
                        <span className="font-bold text-lg text-[#47B083] dark:text-[#47B083]">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link
                            href="/cart"
                            onClick={handleClose}
                            className="w-full bg-[#47B083] text-white py-3 rounded-lg hover:bg-[#3a9d72] transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                            <span>View Cart</span>
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/checkout"
                            onClick={handleClose}
                            className="w-full border border-[#47B083] text-[#47B083] dark:text-[#47B083] dark:border-[#47B083] py-3 rounded-lg hover:bg-[#47B083] hover:text-white dark:hover:bg-[#47B083] dark:hover:text-white transition-colors duration-200 font-medium text-center block"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={handleClose}
                            className="w-full text-gray-600 dark:text-gray-400 pt-2 hover:cursor-pointer rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>

                </div>

            )}
        </div>

    );
};

export default CartSidebar;

