"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Loader2, Eye, EyeOff } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(""); setSuccess("")

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` },
        })
        if (error) throw error
        setSuccess("Account created! Check your email to confirm.")
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT — branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-slate-900 p-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-white">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <FileText className="h-4 w-4 text-white" />
          </div>
          EuroInvoice
        </Link>

        <div>
          <div className="text-5xl font-bold text-white leading-tight mb-6">
            EU invoices in<br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              60 seconds.
            </span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            Professional, VAT-compliant PDF invoices for freelancers across Spain, Germany, France and more.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: "⚡", text: "Ready in 60 seconds" },
            { icon: "🔒", text: "EU-compliant by law" },
            { icon: "💶", text: "VAT calculated automatically" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-slate-400 text-sm">
              <span className="text-lg">{icon}</span> {text}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-blue-600">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              EuroInvoice
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setMode("login"); setError(""); setSuccess("") }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setSuccess("") }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === "login" ? "Welcome back" : "Get started free"}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === "login"
                ? "Sign in to your EuroInvoice account"
                : "Free account — no credit card required"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                {mode === "login" && (
                  <Link href="/reset-password" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl p-3">
                {success}
              </div>
            )}

            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-base font-semibold" disabled={loading}>
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait...</>
                : mode === "login" ? "Sign In →" : "Create Free Account →"}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing you agree to our{" "}
            <Link href="#" className="underline hover:text-gray-600">Terms</Link> and{" "}
            <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
