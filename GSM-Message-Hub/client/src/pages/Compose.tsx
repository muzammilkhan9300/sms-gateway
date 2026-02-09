import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMockData } from "@/hooks/use-mock-data";
import { Send, User, Smartphone, Type, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";

interface ComposeForm {
  recipient: string;
  content: string;
  simSlot: number;
}

export default function Compose() {
  const { contacts, sendMessage } = useMockData();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  const { register, handleSubmit, watch, setValue, reset } = useForm<ComposeForm>({
    defaultValues: {
      simSlot: 1,
      recipient: "",
      content: "",
    }
  });

  // Watch content for character count
  const content = watch("content");
  if (content && content.length !== charCount) {
    setCharCount(content.length);
  }

  const onSubmit = async (data: ComposeForm) => {
    setIsSending(true);
    try {
      await sendMessage({
        direction: "outbound",
        recipient: data.recipient,
        content: data.content,
        simSlot: Number(data.simSlot),
      });
      toast({
        title: "Message Sent",
        description: `Successfully queued message to ${data.recipient}`,
        className: "bg-green-900 border-green-800 text-white"
      });
      reset();
      setCharCount(0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("recipient", e.target.value);
  };

  const isGSM = !/[^\u0000-\u00FF]/.test(content || "");
  const maxChars = isGSM ? 160 : 70;
  const parts = Math.ceil((charCount || 0.1) / maxChars);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">New Message</h2>
        <p className="text-muted-foreground">Compose and send SMS via GSM Gateway</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Recipient Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Recipient
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    {...register("recipient", { required: true })}
                    placeholder="+1234567890"
                    className="glass-input w-full px-4 py-3 outline-none focus:ring-2"
                  />
                  <select 
                    onChange={handleContactSelect}
                    className="glass-input px-4 py-3 outline-none focus:ring-2 bg-slate-900"
                  >
                    <option value="">Select Contact</option>
                    {contacts.map(c => (
                      <option key={c.id} value={c.phone}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SIM Slot Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  Send via SIM
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      value="1" 
                      {...register("simSlot")}
                      className="peer sr-only"
                    />
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-center">
                      <div className="font-medium text-white">SIM 1</div>
                      <div className="text-xs text-green-400 mt-1">Online</div>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      value="2" 
                      {...register("simSlot")}
                      className="peer sr-only"
                      disabled
                    />
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 opacity-50 cursor-not-allowed text-center">
                      <div className="font-medium text-white">SIM 2</div>
                      <div className="text-xs text-red-400 mt-1">Offline</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-400" />
                    Message Content
                  </label>
                  <div className="text-xs flex gap-3">
                    <span className={`${charCount > maxChars ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                      {charCount} / {maxChars} chars
                    </span>
                    <span className="text-primary/80 font-medium">
                      {parts} part{parts > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <textarea
                  {...register("content", { required: true })}
                  rows={6}
                  placeholder="Type your message here..."
                  className="glass-input w-full px-4 py-3 outline-none focus:ring-2 resize-none"
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-lg">
                  <Info className="w-4 h-4" />
                  <span>Encoding: {isGSM ? 'GSM-7 (Standard)' : 'UCS-2 (Unicode/Emoji support)'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSending || !watch("recipient") || !watch("content")}
                  className="w-full glass-button py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Quick Tips Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-4">Tips & Rules</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400 text-xs font-bold">1</div>
                <span>Standard SMS length is 160 characters for GSM encoding.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 text-xs font-bold">2</div>
                <span>Using Emojis or special characters switches encoding to UCS-2 (70 chars limit).</span>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-400 text-xs font-bold">3</div>
                <span>Long messages will be split into multiple parts automatically.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-4">Recent Contacts</h3>
            <div className="space-y-3">
              {contacts.slice(0, 3).map(contact => (
                <div 
                  key={contact.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => setValue("recipient", contact.phone)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.phone}</div>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-muted-foreground hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
