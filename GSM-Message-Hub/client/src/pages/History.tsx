import { useState } from "react";
import { useMockData } from "@/hooks/use-mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function History() {
  const { messages } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          msg.recipient.includes(searchTerm);
    const matchesFilter = filter === "all" || msg.direction === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Message History</h2>
          <p className="text-muted-foreground">View all sent and received communications</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-button-secondary px-4 py-2 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-2 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/10'}`}
            >
              All Messages
            </button>
            <button 
              onClick={() => setFilter("inbound")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'inbound' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/10'}`}
            >
              Received
            </button>
            <button 
              onClick={() => setFilter("outbound")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'outbound' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/10'}`}
            >
              Sent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direction</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[40%]">Content</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMessages.map((msg, idx) => (
                <motion.tr 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <StatusBadge status={msg.direction} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{msg.recipient}</div>
                    <div className="text-xs text-muted-foreground">SIM {msg.simSlot}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white/80 line-clamp-2">{msg.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={msg.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      {msg.timestamp ? format(new Date(msg.timestamp), "MMM d, yyyy") : "-"}
                    </div>
                    <div className="text-xs text-muted-foreground/60">
                      {msg.timestamp ? format(new Date(msg.timestamp), "HH:mm") : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing <span className="text-white font-medium">{filteredMessages.length}</span> results</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
