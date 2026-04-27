"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, UserPlus, KeyRound, Trash2, Crown } from "lucide-react"

interface UserRow {
  id: string
  email: string
  created_at: string
  plan: string
}

type Msg = { text: string; ok: boolean } | null

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<Msg>(null)
  const [resettingId, setResettingId] = useState<string | null>(null)

  async function loadUsers() {
    setLoading(true)
    const res = await fetch("/api/admin/users")
    const data = await res.json()
    setUsers(data.users ?? [])
    setLoading(false)
  }

  useEffect(() => { loadUsers() }, [])

  async function handleAddUser() {
    if (!newEmail || !newPassword) {
      setMsg({ text: "Email and password are required.", ok: false }); return
    }
    if (newPassword.length < 8) {
      setMsg({ text: "Password must be at least 8 characters.", ok: false }); return
    }
    setSaving(true); setMsg(null)
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, password: newPassword }),
    })
    const data = await res.json()
    if (data.error) {
      setMsg({ text: data.error, ok: false })
    } else {
      setMsg({ text: `✅ User ${newEmail} created!`, ok: true })
      setNewEmail(""); setNewPassword(""); setShowForm(false)
      loadUsers()
    }
    setSaving(false)
  }

  async function handleResetPassword(id: string, email: string) {
    setResettingId(id); setMsg(null)
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (data.error) setMsg({ text: data.error, ok: false })
    else setMsg({ text: `✅ Password reset email sent to ${email}`, ok: true })
    setResettingId(null)
  }

  async function handleDeleteUser(id: string, email: string) {
    if (!confirm(`Delete user "${email}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" })
    const data = await res.json()
    if (data.error) setMsg({ text: data.error, ok: false })
    else { setMsg({ text: "✅ User deleted.", ok: true }); loadUsers() }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">{loading ? "..." : `${users.length} registered users`}</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setMsg(null) }} className="gap-2">
          <UserPlus className="h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Add user form */}
      {showForm && (
        <div className="mb-6 p-5 bg-white rounded-xl border shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Create New User</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Password *</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddUser} disabled={saving} className="gap-2">
              {saving
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</>
                : "Create User"}
            </Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setMsg(null) }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Message banner */}
      {msg && (
        <div className={`mb-4 text-sm rounded-md p-3 ${
          msg.ok
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {msg.text}
        </div>
      )}

      {/* User list */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border-2 border-dashed rounded-xl">
          <p className="font-medium">No users yet</p>
          <p className="text-sm mt-1">Add your first user above</p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <Card key={u.id}>
              <CardContent className="flex items-center justify-between py-3 px-5 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-gray-900 truncate">{u.email}</p>
                    {u.plan === "pro" && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">
                        <Crown className="h-3 w-3" /> Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Joined {formatDate(u.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    disabled={resettingId === u.id}
                    onClick={() => handleResetPassword(u.id, u.email)}
                  >
                    {resettingId === u.id
                      ? <Loader2 className="h-3 w-3 animate-spin" />
                      : <KeyRound className="h-3 w-3" />}
                    Reset Password
                  </Button>
                  <button
                    onClick={() => handleDeleteUser(u.id, u.email)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
