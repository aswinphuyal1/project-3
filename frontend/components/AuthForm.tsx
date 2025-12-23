"use client";
import React, { useState, useMemo, FormEvent } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "@/context/Authcontext";
 // <-- import context

type AuthFormType = "createaccount" | "login";

const SocialButton: React.FC<{
  Icon: React.ElementType;
  label: string;
  onClick?: () => void;
}> = ({ Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </button>
);

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
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-500 transition-all duration-150 font-normal text-base"
        required
      />
      {isPassword && (
        <button
          type="button"
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

interface AuthFormProps {
  type: AuthFormType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { register, login, loginWithProvider, loading } = useAuth(); // <-- use context

  const [showPassword, setShowPassword] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isCreateAccount = type === "createaccount";
  const title = isCreateAccount ? "Create an account" : "Log in";
  const submitButtonText = isCreateAccount ? "Create an account" : "Log in";

  const isFormValid = useMemo(() => {
    if (!email || !password) return false;
    if (isCreateAccount && !profileName) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 8) return false;
    return true;
  }, [email, password, profileName, isCreateAccount]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (isCreateAccount) {
      const ok = await register(profileName, email, password);
      if (ok) console.log("Registered successfully");
    } else {
      const ok = await login(email, password);
      if (ok) console.log("Logged in successfully");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-0">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          {title}
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          {isCreateAccount && (
            <InputField
              id="profileName"
              label="What should we call you?"
              type="text"
              placeholder="Enter your profile name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}

          <InputField
            id="email"
            label="What's your email?"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            hint={
              isCreateAccount
                ? "Use 8 or more characters with a mix of letters, numbers & symbols"
                : undefined
            }
          />

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-3 text-white font-medium rounded-xl transition-all duration-300 ${
              isFormValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {submitButtonText}
          </button>
        </form>

        {/* Social login */}
        <div className="mt-10 mb-8 text-center text-gray-500 relative">
          <span className="bg-white px-3 relative z-10 text-sm">
            OR Continue with
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <div className="flex space-x-3">
          <SocialButton
            Icon={FaGoogle}
            label="Google"
            onClick={() => loginWithProvider("google")}
          />
          <SocialButton
            Icon={FaGithub}
            label="GitHub"
            onClick={() => loginWithProvider("github")}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
