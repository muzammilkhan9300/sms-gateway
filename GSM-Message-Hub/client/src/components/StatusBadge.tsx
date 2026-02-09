import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<string, string> = {
    sent: "bg-green-500/10 text-green-400 border-green-500/20",
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    received: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
    queued: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    outbound: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    inbound: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  const normalizedStatus = status.toLowerCase();
  
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider",
      variants[normalizedStatus] || "bg-gray-500/10 text-gray-400 border-gray-500/20",
      className
    )}>
      {status}
    </span>
  );
}
