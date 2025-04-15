"use client"

import { useState, useEffect } from "react"

export function TerminalHeader() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    // Initialize with current date/time immediately
    setDateTime(new Date().toISOString())

    const updateDateTime = () => {
      setDateTime(new Date().toISOString())
    }

    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border border-green-500 rounded-t-md bg-black p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">MATRIX TERMINAL</div>
        <div className="text-sm opacity-70">{dateTime}</div>
      </div>
      <div className="mt-2 text-sm opacity-70">
        <span className="mr-4">System: MORPHEUS</span>
        <span className="mr-4">User: NEO</span>
        <span>Status: CONNECTED</span>
      </div>
      <div className="mt-4 text-xs border-t border-green-800 pt-2">
        <p className="typing-animation">Welcome to the Matrix. Follow the white rabbit. Knock, knock, Neo.</p>
      </div>
    </div>
  )
}
