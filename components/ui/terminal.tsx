import * as React from "react"
import { cn } from "@/lib/utils"

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-md border border-green-500 bg-black text-green-500 shadow-lg", className)}
      {...props}
    >
      <div className="flex items-center border-b border-green-700 px-4 py-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500 opacity-70"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-70"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 opacity-70"></div>
        </div>
        <div className="ml-4 text-xs text-green-400">matrix@localhost:~</div>
      </div>
      {children}
    </div>
  )
})

Terminal.displayName = "Terminal"

export { Terminal }
