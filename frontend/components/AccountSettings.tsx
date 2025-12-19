"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; // Make sure to install lucide-react

// --- Reusable Components ---

const InputField = ({
  placeholder,
  value,
  onChange,
  error,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-4 relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-5 py-3 pr-12 bg-[#F5E7C6] border ${
          error ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
        } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6D1F] text-[#222222] placeholder-gray-500 transition-all`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF6D1F] transition-colors"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-[#FF6D1F] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-xl transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap"
  >
    {children}
  </button>
);

// --- Main Page Component ---

const AccountSettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [strength, setStrength] = useState({
    score: 0,
    label: "Empty",
    color: "bg-gray-200",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Calculate Password Hardness
  useEffect(() => {
    const password = passwords.new;
    let score = 0;
    if (!password) {
      setStrength({ score: 0, label: "Empty", color: "bg-gray-200" });
      return;
    }

    if (password.length > 6) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    let label = "Weak";
    let color = "bg-red-500";
    if (score > 50) {
      label = "Medium";
      color = "bg-yellow-500";
    }
    if (score > 75) {
      label = "Strong";
      color = "bg-green-500";
    }
    if (score === 100) {
      label = "Very Strong";
      color = "bg-[#FF6D1F]";
    }

    setStrength({ score, label, color });
  }, [passwords.new]);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswords({ ...passwords, [field]: e.target.value });
      if (message.text) setMessage({ text: "", type: "" });
    };

  const handleUpdatePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setMessage({ text: "Please complete all fields.", type: "error" });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }
    setMessage({ text: "Password updated successfully!", type: "success" });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const isMismatch =
    passwords.confirm !== "" && passwords.new !== passwords.confirm;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-[#222222]">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage your security preferences.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="flex-1 w-full max-w-lg">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#222222]">
                    Password Management
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Update your security credentials below.
                  </p>
                </div>

                <InputField
                  placeholder="Current Password"
                  value={passwords.current}
                  onChange={handleInputChange("current")}
                />
                <InputField
                  placeholder="New Password"
                  value={passwords.new}
                  onChange={handleInputChange("new")}
                  error={isMismatch}
                />
                <InputField
                  placeholder="Confirm New Password"
                  value={passwords.confirm}
                  onChange={handleInputChange("confirm")}
                  error={isMismatch}
                />

                {message.text && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-sm font-semibold ${
                      message.type === "error"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>

              <div className="md:pt-20">
                <PrimaryButton onClick={handleUpdatePassword}>
                  Update Password
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#FAF3E1]/30 rounded-3xl p-8 border border-[#F5E7C6]">
              <h3 className="text-xl font-bold text-[#222222] mb-4">
                Security Score
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Password strength is calculated based on length, uppercase
                letters, numbers, and symbols.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Strength:</span>
                  <span
                    className={`font-bold ${
                      strength.label === "Strong" ||
                      strength.label === "Very Strong"
                        ? "text-green-600"
                        : "text-[#FF6D1F]"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  ></div>
                </div>

                <ul className="text-xs space-y-2 mt-4 text-gray-400">
                  <li
                    className={
                      passwords.new.length > 6
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    • Minimum 7 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(passwords.new)
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    • One uppercase letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(passwords.new)
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    • One number
                  </li>
                  <li
                    className={
                      /[^A-Za-z0-9]/.test(passwords.new)
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    • One special character
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
