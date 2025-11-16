import { useToast } from "@/providers/TostProvider";


export const useToasts = () => {
  const { addToast, removeToast, toasts } = useToast();

  const successToast = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'success', title, message, duration });
  };

  const errorToast = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'error', title, message, duration });
  };

  const warningToast = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'warning', title, message, duration });
  };

  const infoToast = (title: string, message?: string, duration?: number) => {
    addToast({ type: 'info', title, message, duration });
  };


  const addedToCart = (productName: string) => {
    successToast('Added to Cart', `${productName} has been added to your cart.`);
  };

  const addedToWishlist = (productName: string) => {
    successToast('Added to Wishlist', `${productName} has been added to your wishlist.`);
  };

  const orderPlaced = (orderId: string) => {
    successToast('Order Placed!', `Your order #${orderId} has been confirmed.`);
  };

  const loggedIn = () => {
    successToast('Welcome Back!', `Hello , good to see you again!`);
  };

  const loggedOut = () => {
    infoToast('Logged Out', 'You have been successfully logged out.');
  };

  const productOutOfStock = (productName: string) => {
    warningToast('Out of Stock', `${productName} is currently out of stock.`);
  };

  const couponApplied = (code: string, discount: string) => {
    successToast('Coupon Applied!', `Code "${code}" applied. ${discount} discount.`);
  };

  const couponError = (message: string) => {
    errorToast('Coupon Error', message);
  };

  return {
 
    successToast,
    errorToast,
    warningToast,
    infoToast,
    removeToast,
    toasts,
    addedToCart,
    addedToWishlist,
    orderPlaced,
    loggedIn,
    loggedOut,
    productOutOfStock,
    couponApplied,
    couponError,
  };
};