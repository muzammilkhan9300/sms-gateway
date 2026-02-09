import { useState } from "react";
import { Save, Server, Bell, Shield, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your configuration has been updated successfully.",
        className: "bg-green-900 border-green-800 text-white"
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-muted-foreground">Configure modem parameters and system preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="glass-card p-4 h-fit">
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
              <Server className="w-5 h-5" />
              Modem Configuration
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
              <Shield className="w-5 h-5" />
              Security
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-blue-400" />
              GSM Modem Settings
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">COM Port</label>
                  <select className="glass-input w-full px-4 py-2 bg-slate-900">
                    <option>COM1</option>
                    <option>COM2</option>
                    <option>COM3</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Baud Rate</label>
                  <select className="glass-input w-full px-4 py-2 bg-slate-900">
                    <option>9600</option>
                    <option>19200</option>
                    <option>115200</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Service Center Number (SMSC)</label>
                <input type="text" className="glass-input w-full px-4 py-2" defaultValue="+12065550100" />
                <p className="text-xs text-muted-foreground">Required for sending SMS. Provided by carrier.</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Enable Delivery Reports</h4>
                    <p className="text-xs text-muted-foreground">Receive confirmation when SMS is delivered</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Multipart SMS Support</h4>
                    <p className="text-xs text-muted-foreground">Allow messages longer than 160 chars</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="glass-button px-6 py-2.5 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
