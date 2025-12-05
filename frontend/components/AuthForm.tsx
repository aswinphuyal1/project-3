import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

interface AuthProps {
  type: "sign-in" | "sign-up";
}

export default function AuthForm({ type }: AuthProps) {
  const isSignIn = type === "sign-in";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-none bg-white/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-semibold">
            {isSignIn ? "Welcome Back!" : "Create Account"}
          </CardTitle>
          <p className="text-gray-500 text-sm">
            {isSignIn ? "Login to your account" : "Sign up to get started"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-full h-12"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="rounded-full h-12"
            />
          </div>

          {/* Confirm Password (Signup Only) */}
          {!isSignIn && (
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                className="rounded-full h-12"
              />
            </div>
          )}

          {/* Continue Button */}
          <div className="flex items-center justify-between">
            <Button className="rounded-full h-12 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90">
              {isSignIn ? "Continue" : "Sign Up"}
            </Button>
          </div>

          {/* Forgot Password (Sign In Only)*/}
          {isSignIn && (
            <div className="flex justify-end mt-1">
              <button className="text-xs text-gray-500 hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <span className="h-px w-12 bg-gray-300" />
            <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
            <span className="h-px w-12 bg-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button className="p-3 rounded-full bg-white shadow hover:shadow-md transition">
              <FcGoogle size={22} />
            </Button>

            <Button className="p-3 rounded-full bg-white shadow hover:shadow-md transition">
              <FaFacebookF size={20} className="text-blue-600" />
            </Button>

            <Button className="p-3 rounded-full bg-white shadow hover:shadow-md transition">
              <FaGithub size={22} />
            </Button>
          </div>

          {/* Bottom Link */}
          <div className="text-center mt-2 text-sm text-purple-600">
            {isSignIn ? (
              <span>
                Don’t have an account?{" "}
                <a className="underline cursor-pointer">Sign Up</a>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <a className="underline cursor-pointer">Login</a>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
