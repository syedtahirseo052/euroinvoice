"use client"

// /reset-password — users land here after clicking the email reset link.
// Supabase embeds the recovery token in the URL hash; we read it and let
// the user set a new password.

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, KeyRound, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)       // true once recovery session is active
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the magic link is in the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSave() {
    setError("")
    if (!password || password !== confirm) {
      setError("Passwords do not match."); return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters."); return
    }
    setSaving(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) { setError(err.message); setSaving(false); return }
    setDone(true)
    setTimeout(() => router.push("/dashboard"), 2500)
  }

  // Waiting for the magic-link hash to be processed
  if (!ready && !done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Verifying reset link…</p>
          <p className="text-gray-400 text-xs mt-1">
            If nothing happens, check that you opened the link in the same browser.
          </p>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-1">Password updated!</h2>
          <p className="text-gray-500 text-sm">Redirecting to your dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <KeyRound className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>Set New Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="pw">New Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pw2">Confirm Password</Label>
            <Input
              id="pw2"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat new password"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>

          {error && (
            <div className="text-sm rounded-md p-3 bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
            {saving
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating…</>
              : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
