import { useState } from "react";
import { useMockData } from "@/hooks/use-mock-data";
import { useForm } from "react-hook-form";
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  MoreHorizontal, 
  Trash2, 
  Edit2,
  Star
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  group: string;
}

export default function Contacts() {
  const { contacts, addContact, deleteContact } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ContactForm>();

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const onSubmit = async (data: ContactForm) => {
    await addContact({
      ...data,
      isFavorite: false,
      avatar: null
    });
    setIsOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Contacts</h2>
          <p className="text-muted-foreground">Manage your address book and groups</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="glass-button px-6 py-2.5 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Contact
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1e293b]/95 backdrop-blur-xl border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add New Contact</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input {...register("name", { required: true })} className="glass-input w-full px-4 py-2" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <input {...register("phone", { required: true })} className="glass-input w-full px-4 py-2" placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <input {...register("email")} className="glass-input w-full px-4 py-2" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Group</label>
                <select {...register("group")} className="glass-input w-full px-4 py-2 bg-slate-900">
                  <option value="General">General</option>
                  <option value="Work">Work</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>
              <DialogFooter className="mt-6">
                <button type="submit" className="glass-button w-full py-2">Save Contact</button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass-input w-full pl-12 pr-4 py-3 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact, idx) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-6 flex flex-col gap-4 group relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-10 -mt-10" />

            <div className="flex justify-between items-start z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                {contact.name.charAt(0)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => deleteContact(contact.id)}
                  className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1 z-10">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{contact.name}</h3>
                {contact.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
              </div>
              <p className="text-sm text-primary font-medium">{contact.group}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 z-10">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </div>
              {contact.email && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {contact.email}
                </div>
              )}
            </div>

            <div className="pt-2 z-10">
              <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
                Send Message
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
