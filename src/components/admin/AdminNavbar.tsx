"use client";
import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Sun, Moon

} from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '../customButtons/ThemeToggle';
import { useDispatch } from 'react-redux';
import { authModalShow } from '@/redux/auth/AuthToggleSlice';


const AdminNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userModalRef = useRef<HTMLDivElement | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement | null>(null);
  const notificationModal = useRef<HTMLDivElement | null>(null);
  const notificationIcon = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();


  const notifications = [
    { id: 1, text: 'New order #1234 received', time: '2 min ago', unread: true },
    { id: 2, text: 'Product "Nike Air Max" is low in stock', time: '1 hour ago', unread: true },
    { id: 3, text: 'Customer review received', time: '3 hours ago', unread: false }
  ];


  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      if (
        userModalRef.current &&
        e.target instanceof Node &&
        !userModalRef.current.contains(e.target) &&
        profileBtnRef.current &&
        e.target instanceof Node &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationModal.current &&
        e.target instanceof Node &&
        !notificationModal.current.contains(e.target) &&
        notificationIcon.current &&
        e.target instanceof Node &&
        !notificationIcon.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ">
      <div className="flex items-center justify-between px-2 py-3 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(authModalShow())}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>

          {/* Breadcrumb or Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              Welcome back, Admin! 👋
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center md:space-x-3">
          {/* Search */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 outline-none border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#47B083] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-64 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className='lg:block hidden '>
            <ThemeToggle scrolled={true} />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              ref={notificationIcon}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative hover:cursor-pointer"
            >
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div ref={notificationModal} className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                    >
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <button className="w-full text-center py-2 text-sm text-[#47B083] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              ref={profileBtnRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex hover:cursor-pointer items-center md:space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#47B083] to-[#3A9E75] rounded-full flex items-center justify-center">
                <div className="text-white font-semibold text-sm">A</div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div ref={userModalRef} className="absolute right-2 top-12 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#47B083] to-[#3A9E75] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Admin User</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">admin@solestride.com</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <User size={16} />
                    <span>My Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex lg:hidden items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    {theme === 'dark' ? (
                      <Sun size={16} />
                    ) : (
                      <Moon size={16} />
                    )}
                    <span>{theme ===
                      "dark" ? "Light" : "Dark"}</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;