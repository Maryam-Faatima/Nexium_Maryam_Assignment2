'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function BlogInputForm() {
  const [url, setUrl] = useState("")
  const [summary, setSummary] = useState("")
  const [urdu, setUrdu] = useState("")

  const handleSubmit = async () => {
    const res = await fetch("/api/summarise", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setSummary(data.summary)
    setUrdu(data.urdu)
  }

  return (
    <div className="bg-pink-50 p-6 rounded-2xl shadow-xl max-w-xl mx-auto mt-10 border border-rose-200">
      <h1 className="text-3xl font-bold mb-4 text-rose-600 text-center">🌸 Blog Summariser</h1>

      <input
        className="w-full p-2 border border-rose-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Paste blog URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button className="bg-rose-500 hover:bg-rose-600 w-full text-white" onClick={handleSubmit}>
        ✨ Generate Summary
      </Button>

      {summary && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-md border border-rose-200">
          <h2 className="font-semibold text-rose-600 mb-2">📝 English Summary:</h2>
          <p className="text-gray-700">{summary}</p>

          <h2 className="font-semibold text-rose-600 mt-4 mb-2">🔤 Urdu Translation:</h2>
          <p className="text-gray-700">{urdu}</p>
        </div>
      )}
    </div>
  )
}
