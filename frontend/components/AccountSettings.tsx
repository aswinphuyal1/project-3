"use client"
import React, { useState, useEffect, useMemo } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  Trash2,
  CheckCircle2,
} from "lucide-react";

// --- Reusable Sub-Components ---

const InputField = ({
  placeholder,
  value,
  name,
  onChange,
  error,
}: {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-5 relative group">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={`w-full px-5 py-3.5 pr-12 bg-[#F5E7C6]/50 border-2 ${
          error ? "border-red-400 ring-1 ring-red-100" : "border-transparent"
        } rounded-2xl focus:bg-white focus:border-[#FF6D1F] focus:outline-none text-[#222222] placeholder-gray-400 transition-all duration-300 shadow-sm`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6D1F] transition-colors p-1"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{error}</p>
      )}
    </div>
  );
};

const PrimaryButton = ({
  children,
  onClick,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="bg-[#FF6D1F] hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-200 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 min-w-[160px]"
  >
    {loading ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : (
      children
    )}
  </button>
);

// --- Main Functional Component ---

const AccountSettings = () => {
  // Form State
  const [formData, setFormData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Account Status States
  const [isDeactivated, setIsDeactivated] = useState(false);

  // Strength Logic
  const strengthData = useMemo(() => {
    const password = formData.new;
    if (!password) return { score: 0, label: "None", color: "bg-gray-200" };

    let s = 0;
    if (password.length > 7) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (/[^A-Za-z0-9]/.test(password)) s += 25;

    if (s <= 25) return { score: s, label: "Weak", color: "bg-red-400" };
    if (s <= 50) return { score: s, label: "Fair", color: "bg-yellow-400" };
    if (s <= 75) return { score: s, label: "Strong", color: "bg-green-500" };
    return { score: s, label: "Excellent", color: "bg-[#FF6D1F]" };
  }, [formData.new]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (success) setSuccess(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.current) newErrors.current = "Current password is required";
    if (formData.new.length < 8)
      newErrors.new = "Must be at least 8 characters";
    if (formData.new !== formData.confirm)
      newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setIsPending(true);
    // Simulate API Call
    setTimeout(() => {
      console.log("Submitting to API:", formData);
      setIsPending(false);
      setSuccess(true);
      setFormData({ current: "", new: "", confirm: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-[#FAF3E1] rounded-bl-full -z-10 opacity-50" />

      <main className="max-w-7xl mx-auto py-16 px-6 lg:px-12 space-y-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-black tracking-tight mb-4 text-[#222222]">
            Security Center
          </h1>
          <p className="text-gray-500 text-lg">
            Easily update your security credentials and manage account privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Content */}
          <div className="lg:col-span-8 space-y-10">
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 lg:p-10 shadow-xl shadow-gray-100/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <ShieldCheck className="text-[#FF6D1F]" size={24} />
                </div>
                <h2 className="text-2xl font-bold">Update Password</h2>
              </div>

              <div className="max-w-lg">
                <InputField
                  name="current"
                  placeholder="Current Password"
                  value={formData.current}
                  onChange={handleChange}
                  error={errors.current}
                />
                <InputField
                  name="new"
                  placeholder="New Password"
                  value={formData.new}
                  onChange={handleChange}
                  error={errors.new}
                />
                <InputField
                  name="confirm"
                  placeholder="Confirm New Password"
                  value={formData.confirm}
                  onChange={handleChange}
                  error={errors.confirm}
                />

                <div className="mt-8 flex items-center gap-4">
                  <PrimaryButton onClick={handleUpdate} loading={isPending}>
                    {success ? "Saved!" : "Apply Changes"}
                  </PrimaryButton>
                  {success && (
                    <div className="flex items-center gap-2 text-green-600 font-bold animate-bounce">
                      <CheckCircle2 size={20} />
                      <span>Updated!</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Account Management */}
            <section className="bg-[#FAF3E1]/30 rounded-[2rem] border-2 border-dashed border-[#F5E7C6] p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle size={22} className="text-red-500" />
                <h2 className="text-2xl font-bold">Danger Zone</h2>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-2xl border border-[#F5E7C6]/50">
                <div>
                  <h3 className="font-bold text-lg">Deactivate Account</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Temporarily hide your data. You can log back in anytime.
                  </p>
                </div>
                <button
                  onClick={() => setIsDeactivated(!isDeactivated)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-all ${
                    isDeactivated ? "bg-[#FF6D1F]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      isDeactivated ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#F5E7C6] pt-8">
                <p className="text-sm text-gray-400 max-w-sm">
                  This will permanently delete your shared knowledge and reward
                  points.
                </p>
                <button className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 py-2.5 px-5 rounded-2xl transition-all active:scale-95">
                  <Trash2 size={18} />
                  Delete Profile
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-12 space-y-6">
              <div className="bg-[#222222] text-white rounded-[2rem] p-8 shadow-2xl">
                <h3 className="text-xl font-bold mb-6">Password Health</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-sm">
                      Complexity Score
                    </span>
                    <span
                      className={`text-xl font-black ${
                        strengthData.score > 75
                          ? "text-[#FF6D1F]"
                          : "text-white"
                      }`}
                    >
                      {strengthData.label}
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ease-out ${strengthData.color}`}
                      style={{ width: `${strengthData.score}%` }}
                    />
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-white/10">
                    {[
                      {
                        check: formData.new.length > 7,
                        text: "Minimum 8 chars",
                      },
                      {
                        check: /[A-Z]/.test(formData.new),
                        text: "At least one uppercase",
                      },
                      {
                        check: /[0-9]/.test(formData.new),
                        text: "Contains a number",
                      },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-3 text-sm ${
                          item.check ? "text-white" : "text-gray-500"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border ${
                            item.check
                              ? "bg-[#FF6D1F] border-[#FF6D1F]"
                              : "border-white/20"
                          }`}
                        />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
