import { useMockData } from "@/hooks/use-mock-data";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Send, 
  Inbox, 
  AlertCircle, 
  CreditCard, 
  Signal, 
  Smartphone 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, subDays } from "date-fns";

export default function Dashboard() {
  const { stats, messages, loading } = useMockData();

  // Mock chart data generation based on actual mock messages
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, "MMM dd");
    return {
      name: dateStr,
      sent: Math.floor(Math.random() * 50) + 10,
      received: Math.floor(Math.random() * 40) + 5,
    };
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time SMS gateway performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sent"
          value={stats.totalSent}
          icon={Send}
          gradient="from-blue-500 to-indigo-600"
          trend="12%"
          trendUp
        />
        <StatsCard
          title="Total Received"
          value={stats.totalReceived}
          icon={Inbox}
          gradient="from-violet-500 to-purple-600"
          trend="5%"
          trendUp
        />
        <StatsCard
          title="Failed Messages"
          value={stats.failed}
          icon={AlertCircle}
          gradient="from-red-500 to-pink-600"
          trend="2%"
          trendUp={false}
        />
        <StatsCard
          title="Credits Remaining"
          value={`$${stats.credits.toFixed(2)}`}
          icon={CreditCard}
          gradient="from-emerald-500 to-teal-600"
        />
      </div>

      {/* Charts & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-white">Message Traffic</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-muted-foreground">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-muted-foreground">Received</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{fill: 'rgba(255,255,255,0.5)'}}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{fill: 'rgba(255,255,255,0.5)'}}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    borderRadius: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorSent)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="received" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorReceived)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card p-6 flex flex-col h-full">
          <h3 className="font-semibold text-lg text-white mb-6">System Status</h3>
          
          <div className="space-y-6 flex-1">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                  SIM Slot 1
                </span>
                <StatusBadge status="Active" className="bg-green-500/20 text-green-300 border-0" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Signal className="w-4 h-4 text-green-400" />
                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
                <span className="text-xs text-white/70">85%</span>
              </div>
              <p className="text-xs text-muted-foreground">Carrier: Vodafone</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  SIM Slot 2
                </span>
                <StatusBadge status="Offline" className="bg-red-500/20 text-red-300 border-0" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Signal className="w-4 h-4 text-red-400" />
                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[0%] rounded-full"></div>
                </div>
                <span className="text-xs text-white/70">No Signal</span>
              </div>
              <p className="text-xs text-muted-foreground">Carrier: --</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-lg text-white mb-6">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 text-sm font-medium text-muted-foreground">Direction</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Recipient</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Message</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {messages.slice(0, 5).map((msg) => (
                <tr key={msg.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <StatusBadge status={msg.direction} />
                  </td>
                  <td className="py-4 text-white font-medium">{msg.recipient}</td>
                  <td className="py-4 text-white/70 truncate max-w-[200px]">{msg.content}</td>
                  <td className="py-4">
                    <StatusBadge status={msg.status} />
                  </td>
                  <td className="py-4 text-muted-foreground text-sm">
                    {msg.timestamp ? format(new Date(msg.timestamp), "MMM d, HH:mm") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
