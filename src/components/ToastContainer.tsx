"use client";
import { useToast } from '@/providers/TostProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useEffect, useRef } from 'react';


type ToastType =  'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // in ms
}

interface ToastItemProps {
  toast: Toast;
  index: number;
  onRemove: (id: string) => void;
  getToastIcon: (type: ToastType) => React.ReactNode;
  getToastStyles: (type: ToastType) => string;
}



const ToastContainerSimple = () => {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (type: string) => {
    const iconProps = { size: 20 };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case 'error':
        return <XCircle {...iconProps} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="text-yellow-500" />;
      case 'info':
        return <Info {...iconProps} className="text-blue-500" />;
      default:
        return <Info {...iconProps} className="text-[#47B083]" />;
    }
  };

  const getToastStyles = (type: string) => {
    const baseStyles = "rounded-2xl shadow-2xl border backdrop-blur-sm";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50/95 dark:bg-green-900/20 border-green-200 dark:border-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50/95 dark:bg-red-900/20 border-red-200 dark:border-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50/95 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50/95 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800`;
      default:
        return `${baseStyles} bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-700`;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[10000] space-y-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            index={index}
            onRemove={removeToast}
            getToastIcon={getToastIcon}
            getToastStyles={getToastStyles}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, index, onRemove, getToastIcon, getToastStyles }: ToastItemProps) => {
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (toast.duration === 0) return;

    timerRef.current = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [toast.id, toast.duration, onRemove]);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onRemove(toast.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={getToastStyles(toast.type)}
      style={{ zIndex: 10000 - index }}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getToastIcon(toast.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-sm ${
              toast.type === 'success' ? 'text-green-900 dark:text-green-100' :
              toast.type === 'error' ? 'text-red-900 dark:text-red-100' :
              toast.type === 'warning' ? 'text-yellow-900 dark:text-yellow-100' :
              toast.type === 'info' ? 'text-blue-900 dark:text-blue-100' :
              'text-gray-900 dark:text-white'
            }`}>
              {toast.title}
            </h4>
            {toast.message && (
              <p className={`mt-1 text-sm ${
                toast.type === 'success' ? 'text-green-700 dark:text-green-300' :
                toast.type === 'error' ? 'text-red-700 dark:text-red-300' :
                toast.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                toast.type === 'info' ? 'text-blue-700 dark:text-blue-300' :
                'text-gray-700 dark:text-gray-300'
              }`}>
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
          >
            <X size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Simple progress bar */}
        {toast.duration !== 0 && (
          <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
              className={`h-full rounded-full ${
                toast.type === 'success' ? 'bg-green-500' :
                toast.type === 'error' ? 'bg-red-500' :
                toast.type === 'warning' ? 'bg-yellow-500' :
                toast.type === 'info' ? 'bg-blue-500' :
                'bg-[#47B083]'
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ToastContainerSimple;