"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  ChevronUp,
  Footprints,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import AuthModal from "./modals/AuthModal";
import WishlistSidebar from "./modals/WishListSideBar";
import CartSidebar from "./modals/CartSideBar";
import ThemeToggle from "./customButtons/ThemeToggle";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { authModalClose, authModalShow } from "@/redux/auth/AuthToggleSlice";
import useFirebaseAuth from "@/hooks/useFIrebaseAuth";
import { useToasts } from "@/hooks/useToasts";

const navItems = [
  { id: 1, Top_announcement_bar: true, free_shipping_over: "1004" },
  { id: 2, label: "Home", route: "/" },
  {
    id: 3,
    label: "Men",
    route: "/",
    highlight: false,
    subItems: ["Running", "Casual", "Basketball", "Training"],
  },
  {
    id: 4,
    label: "Women",
    route: "/",
    subItems: [
      "Sneakers",
      "Sandals",
      "Athletic",
      "Heels",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Running",
      "Casual",
      "Basketball",
      "Training",
    ],
  },
  {
    id: 5,
    label: "New Arrivals",
    route: "/",
    highlight: true,
    subItems: ["shoe", "cased"],
  },
  { id: 6, label: "Best Sellers", route: "/" },
  { id: 7, label: "Sale", route: "/", highlight: true },
];

const Navbar = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const dispatch = useDispatch();
  const isAuthModal = useSelector((state: RootState) => state.authToggle.value);
  const { user, userLoading, logout } = useFirebaseAuth();
  const {loggedOut } = useToasts();

  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [isSubmenu, setIsSubmenu] = useState<{ [key: number]: boolean }>({});
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isWishlist, setIsWhishlist] = useState<boolean>(false);
  const [isCart, setIsCart] = useState<boolean>(false);
  const [isUserShow, setIsUserShow] = useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const userModalRef = useRef<HTMLDivElement | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      if (currentTheme !== "dark") {
        setScrolled(window.scrollY > 20);
      }
    };
    if (currentTheme === "dark") {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentTheme]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        searchRef.current &&
        e.target instanceof Node &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchActive(false);
      }
      if (
        userModalRef.current &&
        e.target instanceof Node &&
        !userModalRef.current.contains(e.target) &&
        profileBtnRef.current &&
        e.target instanceof Node &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setIsUserShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery("");
      setSearchActive(false);
    }
  };

  const handleToggle = (id: number) => {
    setIsSubmenu((pre) => ({
      ...pre,
      [id]: !pre[id],
    }));
  };

  const handleHideBars = (): void => {
    setIsSidebar(false);
    setIsWhishlist(false);
    setIsCart(false);
  };

  const handleWishlistOpen = (): void => {
    setIsWhishlist(true);
    dispatch(authModalClose());
    setIsSidebar(false);
  };

  const handleCartOpen = (): void => {
    setIsCart(true);
    setIsWhishlist(false);
    setIsSidebar(false);
    dispatch(authModalClose());
  };

  const handleUserShow = () => {
    if (userLoading) return;

    if (user) {
      setIsUserShow(!isUserShow);
    } else {
      dispatch(authModalShow());
    }
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    
    await logout();
    setIsUserShow(false);
    loggedOut();
    setLoadingLogout(false);
  };

  return (
    <div className="w-full fixed top-0 z-50">
      <div
        className={`w-full transition-all duration-300 py-3 
    ${scrolled
            ? "bg-white dark:bg-gray-900 dark:bg-none "
            : "bg-gradient-to-r from-[#47B083] to-[#3A9E75] dark:bg-none dark:bg-gray-900"
          }
  `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href={"/"}
                className={` inline-flex items-center space-x-2 text-2xl hover:cursor-pointer ${scrolled ? "text-[#47B083] dark:text-white" : "text-white"
                  }`}
              >
                <Footprints size={32} />
                <span className="text-2xl font-bold">SoleStride</span>
                
              </Link>
            </div>

            {/* Desktop Navigation start*/}
            <div className="hidden xl:flex gap-1 items-center">
              {navItems.map((item, idx) => (
                <div key={idx} className="group relative">
                  <Link
                    href={"/"}
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors font-medium
                ${scrolled
                        ? `hover:bg-[#47B083]/10 dark:hover:bg-[#47B083]/20 ${item?.highlight
                          ? "text-[#47B083] dark:text-[#47B083] font-semibold"
                          : "text-gray-800 dark:text-white"
                        }`
                        : `hover:bg-white/20 ${item?.highlight
                          ? "text-white font-semibold"
                          : "text-white"
                        }`
                      }`}
                  >
                    {item.label}
                    {item.subItems && (
                      <ChevronDown size={16} className="mt-0.5" />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {item.subItems && (
                    <div
                      className={`absolute max-h-[89vh] scrollbar-hide overflow-y-auto left-0 top-full mt-1 w-48 rounded-lg shadow-lg py-2 opacity-0 invisible 
                group-hover:opacity-100 group-hover:visible transition-all duration-300
                ${scrolled
                          ? "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                          : "bg-[#47B083] backdrop-blur-sm"
                        }
                      
                      `}
                    >
                      {item.subItems.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={`${item.route}/${subItem.toLowerCase()}`}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-[#47B083]/10 dark:hover:bg-[#47B083]/20
                      ${scrolled
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-white"
                            }`}
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-2">
              <div className="relative flex items-center">
                {/* Search input */}
                <div
                  ref={searchRef}
                  className={`hidden md:flex items-center transition-all duration-300 ease-in-out transform origin-right
              ${searchActive
                      ? "opacity-100 scale-100 w-64"
                      : "opacity-0 scale-95 w-0 pointer-events-none"
                    }`}
                >
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center w-full"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search shoes..."
                      className={`${scrolled
                          ? "focus:border-[#47B083] focus:border-2 focus:border-r-0 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                          : "border-0"
                        } w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg px-4 py-[7px] text-sm focus:outline-none dark:placeholder-gray-400`}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#47B083] text-white px-4 py-2.5 rounded-r-lg hover:bg-[#3A9E75] transition-colors"
                    >
                      <Search size={18} />
                    </button>
                  </form>
                </div>

                {/* Icons group */}
                <div
                  className={`hidden md:flex items-center
                 gap-2 transition-all duration-300 ease-in-out transform origin-right
              ${!searchActive
                      ? "visible scale-100 w-56 opacity-100"
                      : "invisible opacity-0 w-0 scale-95 pointer-events-none"
                    }`}
                >
                  <button
                    onClick={() => setSearchActive(true)}
                    className={`p-2 rounded-full hover:cursor-pointer transition-colors ${scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-white hover:bg-white/20"
                      }`}
                  >
                    <Search size={22} />
                  </button>
                  {/* -------wishlist---- */}
                  <button
                    onClick={() => setIsWhishlist(true)}
               
                    className={`p-2 rounded-full hover:cursor-pointer relative ${scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-white hover:bg-white/20"
                      }`}
                  >
                    <Heart size={22} />
                    <span className="absolute -top-1 -right-1 bg-[#47B083] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  {/* ---shoppping-cart---- */}
                  <button
                    onClick={handleCartOpen}
                  
                    className={`p-2 hover:cursor-pointer rounded-full relative ${scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-white hover:bg-white/20"
                      }`}
                  >
                    <ShoppingCart size={22} />
                    <span className="absolute -top-1 -right-1 bg-[#47B083] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      5
                    </span>
                  </button>
                  {/* ----profile---- */}
                  <div className="relative">
                    <button
                      ref={profileBtnRef}
                      disabled={userLoading}
                      onClick={handleUserShow}
                      className={`p-2 hover:cursor-pointer rounded-full ${scrolled
                          ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          : "text-white hover:bg-white/20"
                        }`}
                    >
                      <RxAvatar size={24} />
                    </button>

                    {isUserShow && (
                      <div
                        ref={userModalRef}
                        className={`absolute left-[-120px] top-12 w-64 rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 z-50
                           ${scrolled
                            ? "bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-700 shadow-gray-200 dark:shadow-gray-900"
                            : "bg-white/95 dark:bg-gray-900/95 border-white/20 dark:border-gray-700 shadow-gray-200 dark:shadow-gray-900"
                          }`}
                      >
                        {/* User Info Header */}
                        <div
                          className={`p-4 border-b ${scrolled
                              ? "border-gray-100 dark:border-gray-700"
                              : "border-white/20 dark:border-gray-700"
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#47B083] to-[#3A9E75] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                JS
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                {user?.displayName}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="p-3 bg-gradient-to-r from-[#47B083]/5 to-[#3A9E75]/5 border-b border-gray-100 dark:border-gray-700">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white text-sm">
                                3
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                Orders
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white text-sm">
                                12
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                Wishlist
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white text-sm">
                                2
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                Points
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-2">
                          {[
                            {
                              icon: "👤",
                              label: "My Profile",
                              href: "/profile",
                            },
                            {
                              icon: "📦",
                              label: "My Orders",
                              href: "/orders",
                              badge: "3",
                            },
                            {
                              icon: "❤️",
                              label: "Wishlist",
                              href: "/wishlist",
                              badge: "12",
                            },
                            {
                              icon: "📍",
                              label: "Saved Addresses",
                              href: "/addresses",
                            },
                            { icon: "👟", label: "My Sizes", href: "/sizes" },
                          ].map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group hover:bg-[#47B083]/10 dark:hover:bg-[#47B083]/20"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-base">{item.icon}</span>
                                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#47B083] dark:group-hover:text-[#47B083] transition-colors">
                                  {item.label}
                                </span>
                              </div>
                              {item.badge && (
                                <span className="bg-[#47B083] text-white text-xs px-2 py-1 rounded-full min-w-6 text-center">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        {/* Logout Button */}
                        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                          <button
                            onClick={handleLogout}
                            className=" flex flex-row items-center justify-between hover:cursor-pointer space-x-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-base">🚪</span>
                              <span className="font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                                Logout
                              </span>
                            </div>

                            <div>
                              {loadingLogout && (
                               <div className="w-5 h-5 border-2 dark:border-white dark:border-t-transparent border-black border-t-transparent rounded-full animate-spin" />
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <ThemeToggle scrolled={scrolled} />
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className={`xl:hidden hover:cursor-pointer p-2 rounded-full ${scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                  }`}
                onClick={() => setIsSidebar(true)}
                aria-label={isSidebar ? "Close menu" : "Open menu"}
              >
                {isSidebar ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        onClick={handleHideBars}
        className={`fixed inset-0 bg-black/60 dark:bg-black/70 z-40 transition-opacity ${isSidebar || isWishlist || isCart
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }`}
      ></div>

      {/* Mobile menu panel --- sidebar*/}
      <div
        className={`fixed top-0 overflow-y-auto right-0 max-h-screen w-80 bg-white dark:bg-gray-900 z-50  transform transition-transform duration-300 ${isSidebar
            ? "translate-x-0 shadow-2xl dark:shadow-gray-900/50"
            : "translate-x-full"
          }`}
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <Link
            href={"/"}
            className={` inline-flex items-center space-x-2 text-xl hover:cursor-pointer text-[#47B083] dark:text-white `}
          >
            <Footprints size={32} />
            <span className="text-2xl font-bold">SoleStride</span>
          </Link>
          <button
            onClick={() => setIsSidebar(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-5">
          {/* Search in mobile menu */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shoes..."
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#47B083] bg-white dark:bg-gray-800 text-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500"
              />
            </div>
          </form>

          {/* Mobile navigation */}
          <div className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                {item.label && (
                  <div className="block py-3.5 font-medium">
                    <div className="flex justify-between items-center">
                      <Link
                        className="text-gray-800 dark:text-gray-200 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors"
                        href={item?.route}
                      >
                        {item.label}
                      </Link>
                      {item.subItems && (
                        <button
                          onClick={() => handleToggle(item.id)}
                          className="text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors"
                        >
                          {isSubmenu[item.id] ? (
                            <ChevronDown
                              size={18}
                              className="text-gray-400 dark:text-gray-500"
                            />
                          ) : (
                            <ChevronUp
                              size={18}
                              className="text-gray-400 dark:text-gray-500"
                            />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile submenu */}
                <div
                  className={`pl-4 pb-2 transition-all duration-300 ease-in-out ${isSubmenu[item.id] && item?.subItems
                      ? "visible w-full h-full opacity-100"
                      : "invisible w-0 h-0 opacity-0 overflow-hidden"
                    }
                  
                  `}
                >
                  {item?.subItems?.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      href={`/`}
                      className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile account links */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-4">
            <button
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors hover:cursor-pointer"
              onClick={handleWishlistOpen}
            >
              <Heart size={20} />
              <span>Wishlist</span>
              <span className="ml-auto bg-[#47B083] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button
              onClick={handleCartOpen}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors"
            >
              <ShoppingCart size={20} />
              <span>Shopping Cart</span>
              <span className="ml-auto bg-[#47B083] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-[#47B083] dark:hover:text-[#47B083] transition-colors hover:cursor-pointer"
              onClick={() => dispatch(authModalShow())}
            >
              <RxAvatar size={22} />
              <span>My Account</span>
            </button>
          </div>
        </div>
      </div>

      {/*-----wish-list--------*/}
      <WishlistSidebar
        isOpen={isWishlist}
        onClose={() => setIsWhishlist(false)}
      />
      <CartSidebar isOpen={isCart} onClose={() => setIsCart(false)} />

      {isAuthModal && <AuthModal onClose={() => dispatch(authModalClose())} />}
    </div>
  );
};

export default Navbar;
