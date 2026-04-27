"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Eye, EyeOff, ShieldCheck, Lock } from "lucide-react"

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")

    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError("Invalid email or password.")
      setLoading(false); return
    }

    if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut()
      setError("Access denied. This portal is for admins only.")
      setLoading(false); return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600 opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">

        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-900">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">EuroInvoice — Restricted Access</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">

          <div className="flex items-center gap-2 bg-blue-900/40 border border-blue-800 rounded-xl px-4 py-3 mb-6">
            <Lock className="h-4 w-4 text-blue-400 shrink-0" />
            <p className="text-blue-300 text-xs">This login is for site administrators only. Regular users should use the <a href="/login" className="underline text-blue-400 hover:text-blue-300">user login page</a>.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-300 text-sm">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@yourdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-300 text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm rounded-xl p-3">
                {error}
              </div>
            )}

            <Button
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-base font-semibold"
              disabled={loading}
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Verifying...</>
                : "Sign In to Admin →"}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          EuroInvoice Admin · Secure Access
        </p>
      </div>
    </div>
  )
}
