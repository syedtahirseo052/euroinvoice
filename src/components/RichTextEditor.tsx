"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useCallback, useState } from "react"

// ── Toolbar button ────────────────────────────────────────────────────────────
function Btn({
  onClick, active, title, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors min-w-[28px] h-7 flex items-center justify-center
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-0.5 self-center" />
}

// ── Main editor ───────────────────────────────────────────────────────────────
interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const [linkUrl, setLinkUrl]       = useState("")
  const [showLink, setShowLink]     = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline hover:text-blue-800" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: placeholder ?? "Start writing your blog post here...\n\nUse the toolbar above to add headings, bold text, links and more.",
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-gray max-w-none min-h-[420px] px-4 py-3 focus:outline-none text-gray-700 leading-relaxed",
      },
    },
  })

  // Sync external value changes (e.g. when editing an existing post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const setLink = useCallback(() => {
    if (!editor) return
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    }
    setLinkUrl("")
    setShowLink(false)
  }, [editor, linkUrl])

  if (!editor) return null

  const H = (level: 1 | 2 | 3 | 4) =>
    <span className="font-bold text-[11px]">H{level}</span>

  return (
    <div className="border border-input rounded-xl overflow-hidden bg-white shadow-sm">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b bg-gray-50">

        {/* Headings */}
        <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>{H(1)}</Btn>
        <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>{H(2)}</Btn>
        <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>{H(3)}</Btn>
        <Btn title="Heading 4" active={editor.isActive("heading", { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>{H(4)}</Btn>

        <Divider />

        {/* Text style */}
        <Btn title="Bold (Ctrl+B)" active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Btn>
        <Btn title="Italic (Ctrl+I)" active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Btn>
        <Btn title="Underline (Ctrl+U)" active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="underline">U</span>
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </Btn>
        <Btn title="Inline code" active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}>
          <span className="font-mono text-xs">`c`</span>
        </Btn>

        <Divider />

        {/* Lists */}
        <Btn title="Bullet list" active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <span className="text-base leading-none">≡</span>
        </Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <span className="text-xs font-mono">1.</span>
        </Btn>
        <Btn title="Blockquote" active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <span className="text-base leading-none">&ldquo;</span>
        </Btn>
        <Btn title="Code block" active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <span className="font-mono text-xs">{`</>`}</span>
        </Btn>

        <Divider />

        {/* Alignment */}
        <Btn title="Align left"   active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <span className="text-xs">⬅</span>
        </Btn>
        <Btn title="Align center" active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <span className="text-xs">↔</span>
        </Btn>
        <Btn title="Align right"  active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <span className="text-xs">➡</span>
        </Btn>

        <Divider />

        {/* Link */}
        <Btn title="Add link" active={editor.isActive("link")}
          onClick={() => setShowLink(v => !v)}>
          <span className="text-xs">🔗</span>
        </Btn>
        {editor.isActive("link") && (
          <Btn title="Remove link" active={false}
            onClick={() => editor.chain().focus().unsetLink().run()}>
            <span className="text-xs line-through opacity-60">🔗</span>
          </Btn>
        )}

        <Divider />

        {/* Horizontal rule */}
        <Btn title="Divider line"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          active={false}>
          <span className="text-xs font-mono">—</span>
        </Btn>

        {/* Undo / Redo */}
        <Divider />
        <Btn title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          active={false}>
          <span className="text-sm">↩</span>
        </Btn>
        <Btn title="Redo (Ctrl+Shift+Z)"
          onClick={() => editor.chain().focus().redo().run()}
          active={false}>
          <span className="text-sm">↪</span>
        </Btn>
      </div>

      {/* ── Link input bar ── */}
      {showLink && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-blue-100">
          <span className="text-xs text-blue-700 font-medium shrink-0">🔗 URL:</span>
          <input
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") setLink() }}
            placeholder="https://example.com"
            className="flex-1 text-sm border border-blue-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            autoFocus
          />
          <button type="button" onClick={setLink}
            className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-700">
            Add
          </button>
          <button type="button" onClick={() => setShowLink(false)}
            className="text-gray-400 hover:text-gray-600 text-sm px-1">✕</button>
        </div>
      )}

      {/* ── Editor area ── */}
      <EditorContent editor={editor} />

      {/* ── Word count ── */}
      <div className="px-4 py-1.5 border-t bg-gray-50 text-xs text-gray-400 text-right">
        {editor.storage.characterCount?.words?.() ?? editor.getText().split(/\s+/).filter(Boolean).length} words
      </div>
    </div>
  )
}
