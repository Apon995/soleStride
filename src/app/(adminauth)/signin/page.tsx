"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useToasts } from "@/hooks/useToasts";

export default function LoginPage() {
    const { errorToast, successToast } = useToasts();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [redirectTo , setRedirectTo] = useState('/');
    useEffect(()=>{
        const redirect =
        searchParams.get("redirect") || '/';

        setRedirectTo(redirect);
    

    },[searchParams])
    

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return "Incorrect Password !";
        }

        if (!/(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
            return "Incorrect Password !";
        }
        if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
            return "Incorrect Password !";
        }

        return "";
    };

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validatePassword(form.password);
        if (validation) {
            return errorToast(validation);
        }

        try {
            const res = await fetch('/api/adminauth', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    data.errors.forEach((err: string) =>
                        errorToast(err)
                    );
                    return;
                }

                return errorToast(data.error)
            }

            successToast(data.message)
            router.push(redirectTo)
          
            

        }
        catch (error: any) {
            errorToast(error)

        }




    };

    return (
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">

            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
               Admin Sign in
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-[#8C8C8C] cursor-pointer select-none"
                    >
                        {!showPassword ? <EyeOff /> : <Eye />}
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#47B083] hover:bg-[#3A9E75] text-white py-3 rounded-lg font-semibold transition hover:cursor-pointer"
                >
                    Sign In
                </button>

            </form>

            
        </div>
    );
}