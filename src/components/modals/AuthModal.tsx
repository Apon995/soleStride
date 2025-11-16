import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";
import useFirebaseAuth from "@/hooks/useFIrebaseAuth";
import { useDispatch } from "react-redux";
import { authModalClose } from "@/redux/auth/AuthToggleSlice";
import { FirebaseError } from "firebase/app";
import { useToasts } from "@/hooks/useToasts";

interface AuthModalProps {
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  checked?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const authRef = useRef<HTMLDivElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isChecked, setIsChecked] = useState(false);
  const { login, signup, loginWithGoogle } = useFirebaseAuth();
  const { loggedIn, errorToast } = useToasts();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!isLogin && !isChecked)
      return setErrors({
        checked: "Please agree to the Terms of Service and Privacy Policy",
      });
    setIsLoading(true);
    const newError: FormErrors = {};

    try {
      if (isLogin) {
        const res = await login(formData.email, formData.password);
        console.log(res);
        if (res && res?.uid && res?.email) {
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          loggedIn();
          onClose();
        }
      } else {
        const res = await signup(formData.email, formData.password);
        if (res && res?.uid && res?.email) {
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          loggedIn();

          onClose();
        }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            newError.email = "Please enter a valid email address.";
            break;

          case "auth/too-many-requests":
            newError.password = "Too many attempts. Try again later.";
            break;

          case "auth/network-request-failed":
            newError.email = "Network error. Please check your connection.";
            break;

          case "auth/invalid-credential":
          case "auth/wrong-password":
            newError.password = "Invalid email or password.";
            break;

          case "auth/user-not-found":
            newError.email = "No user found with this email.";
            break;
          case "auth/email-already-in-use":
            newError.email = "This email is already registered.";
            break;

          case "auth/weak-password":
            newError.password = "Password must be at least 6 characters long.";
            break;

          case "auth/missing-password":
            newError.password = "Please enter a password.";
            break;

          case "auth/operation-not-allowed":
            newError.email = "Email/password sign-up is disabled.";
            break;

          default:
            newError.password = "Something went wrong. Please try again.";
            break;
        }
      } else {
        newError.password = "Unexpected error occurred.";
      }

      setErrors(newError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const res = await loginWithGoogle();
      if (res?.uid && res?.displayName && res?.email) {
        dispatch(authModalClose());
        loggedIn();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            errorToast("Popup was closed before completing sign-in!", "", 4000);
            break;

          case "auth/popup-blocked":
            errorToast("Popup was blocked by your browser", "", 4000);
            break;
        }
      } else {
        errorToast(
          "something went wrong try again !",
          "internal server error",
          4000
        );
      }
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setErrors({});
    }
  };

  const passwordStrength: string = formData.password
    ? formData.password.length < 6
      ? "Weak"
      : formData.password.length < 10
      ? "Medium"
      : "Strong"
    : "";

  useEffect(() => {
    const clickOutSide = (e: MouseEvent) => {
      if (
        authRef.current &&
        e.target instanceof Node &&
        !authRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", clickOutSide);
    return () => document.removeEventListener("mousedown", clickOutSide);
  }, [onClose]);

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 dark:bg-black/70">
      <motion.div
        ref={authRef}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="relative w-full max-w-md"
      >
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-y-auto shadow-2xl max-h-screen scrollbar-hide dark:shadow-gray-900/50">
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-[#47B083] to-[#3A9E75] text-white py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative z-10"
            >
              <h1 className="text-3xl font-bold mb-1">SoleStride</h1>
              <p className="text-white/90 text-sm">
                {isLogin ? "Welcome back!" : "Join our community"}
              </p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-900 px-6 py-8 sm:px-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Login to your account
                  </h2>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center active:scale-95 duration-300 hover:cursor-pointer justify-center space-x-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mb-6"
                  >
                    <GoogleIcon />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Continue with Google
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
                      or
                    </span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.password}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-[#47B083] focus:ring-[#47B083] bg-white dark:bg-gray-800"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-[#47B083] dark:text-[#47B083] font-medium hover:underline hover:cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full hover:cursor-pointer active:scale-95 duration-300 bg-gradient-to-r from-[#47B083] to-[#3A9E75] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Logging in...</span>
                        </>
                      ) : (
                        <span>Login</span>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-[#47B083] dark:text-[#47B083]  font-semibold hover:underline transition-all hover:cursor-pointer"
                      >
                        Create account
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Create your account
                  </h2>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center hover:cursor-pointer justify-center space-x-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mb-6"
                  >
                    <GoogleIcon />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Continue with Google
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
                      or
                    </span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.fullName}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 hover:cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.password}
                        </motion.p>
                      )}
                      {formData.password && !errors.password && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                          <span
                            className={`font-medium ${
                              passwordStrength === "Weak"
                                ? "text-red-500 dark:text-red-400"
                                : passwordStrength === "Medium"
                                ? "text-yellow-500 dark:text-yellow-400"
                                : "text-green-500 dark:text-green-400"
                            }`}
                          >
                            Password strength: {passwordStrength}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47B083] focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex flex-col items-start text-sm">
                      <label className="flex items-start space-x-3">
                        <input
                          checked={isChecked}
                          onChange={handleCheck}
                          type="checkbox"
                          className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-[#47B083] focus:ring-[#47B083] hover:cursor-pointer bg-white dark:bg-gray-800"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-[#47B083] dark:text-[#47B083] font-medium hover:underline hover:cursor-pointer"
                          >
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button
                            type="button"
                            className="text-[#47B083] dark:text-[#47B083] font-medium hover:underline hover:cursor-pointer"
                          >
                            Privacy Policy
                          </button>
                        </span>
                      </label>

                      {errors.checked && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 dark:text-red-400 text-sm"
                        >
                          {errors.checked}
                        </motion.p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full hover:cursor-pointer active:scale-95 duration-300 bg-gradient-to-r from-[#47B083] to-[#3A9E75] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <span>Create Account</span>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-[#47B083] dark:text-[#47B083] font-semibold hover:underline transition-all hover:cursor-pointer"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:cursor-pointer z-50 text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
