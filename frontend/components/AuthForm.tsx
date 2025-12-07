// src/components/AuthForm.tsx
"use client";
import React, { useState, useMemo, FormEvent } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import logo from "../image/logo.png";
// Define the types for the component props
type AuthFormType = "createaccount" | "login";

// --- START: Helper Components defined OUTSIDE AuthForm ---

// 1. Social Button Component (Stable)
const SocialButton: React.FC<{ Icon: React.ElementType; label: string }> = ({
  Icon,
  label,
}) => (
  <button
    type="button"
    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </button>
);

// 2. Input Field Component (Stable)
// Note: This component now requires showPassword and setShowPassword as props
const InputField: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  isPassword?: boolean;
  id: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  hint,
  isPassword = false,
  id,
  showPassword,
  setShowPassword,
}) => (
  <div className="mb-0">
    <label htmlFor={id} className="text-gray-900 font-medium mb-2 block">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        // This line is correct and uses the state passed from the parent
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-500 transition-all duration-150 font-normal text-base"
        required
      />
      {/* Password Show/Hide Toggle */}
      {isPassword && (
        <button
          type="button"
          // Calls the setShowPassword function passed from AuthForm
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-150"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <AiOutlineEye className="w-5 h-5" />
          ) : (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
    {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
  </div>
);
// --- END: Helper Components defined OUTSIDE AuthForm ---

interface AuthFormProps {
  type: AuthFormType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  // --- State Management ---
  const [showPassword, setShowPassword] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Derived Values & Validation Logic (remains the same) ---
  const isCreateAccount = type === "createaccount";
  const title = isCreateAccount ? "Create an account" : "Log in";
  const submitButtonText = isCreateAccount ? "Create an account" : "Log in";
  const secondaryLinkText = isCreateAccount ? "Log in" : "Create an account";
  const secondaryLinkPath = isCreateAccount ? "/login" : "/create-account";
  const secondaryText = isCreateAccount
    ? "Already have an account? "
    : "Don’t have an account? ";

  const isFormValid = useMemo(() => {
    if (!email || !password) return false;
    if (isCreateAccount && !profileName) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 8) return false;
    return true;
  }, [email, password, profileName, isCreateAccount]);

  // --- Event Handlers ---
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log(`Submitting as ${type}:`, { profileName, email, password });
  };

  // --- Component Render ---
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-0">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 sm:p-10">
        {/* Header and Titles */}
        <div className="flex justify-center mb-6">
          {/* <Image
            className="rounded-full"
            src={logo}
            width={150}
            height={100}
            alt="brand logo"
          /> */}
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-center text-sm text-gray-600 mb-10">
          {secondaryText}
          <a
            href={secondaryLinkPath}
            className="font-medium text-black hover:underline"
          >
            {secondaryLinkText}
          </a>
        </p>

        {/* --- Form Section --- */}
        <form onSubmit={handleSubmit} noValidate>
          {isCreateAccount && (
            <InputField
              id="profileName"
              label="What should we call you?"
              type="text"
              placeholder="Enter your profile name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              showPassword={showPassword} // Dummy prop, not used here
              setShowPassword={setShowPassword} // Dummy prop, not used here
            />
          )}

          <InputField
            id="email"
            label="What's your email?"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            showPassword={showPassword} // Dummy prop
            setShowPassword={setShowPassword} // Dummy prop
          />

          <InputField
            id="password"
            label="Create a password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            // Pass the state and setter down to the stable InputField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            hint={
              isCreateAccount
                ? "Use 8 or more characters with a mix of letters, numbers & symbols"
                : undefined
            }
          />

          {isCreateAccount && (
            <p className="text-center text-xs text-gray-600 my-8">
              By creating an account, you agree to the{" "}
              <a
                href="/terms"
                className="font-medium text-black hover:underline"
              >
                Terms of use
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-black hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          )}

          {/* Submit Button: BLACK when valid, Light Gray when disabled */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 text-white font-medium rounded-xl transition-all duration-300 ${
              isFormValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {submitButtonText}
          </button>
        </form>

        {/* --- OR Continue with Section --- */}
        <div className="mt-10 mb-8 text-center text-gray-500 relative">
          <span className="bg-white px-3 relative z-10 text-sm">
            OR Continue with
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <div className="flex space-x-3">
          <SocialButton Icon={FaFacebookF} label="Facebook" />
          <SocialButton Icon={FaGoogle} label="Google" />
          {/* <SocialButton Icon={FaApple} label="Apple" /> */}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
