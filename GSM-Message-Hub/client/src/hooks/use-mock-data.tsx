import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { type Contact, type Message, type DashboardStats } from "@shared/schema";
import { format, subDays } from "date-fns";

// Mock Data Context
interface MockDataContextType {
  contacts: Contact[];
  messages: Message[];
  stats: DashboardStats;
  addContact: (contact: Omit<Contact, "id" | "createdAt">) => Promise<void>;
  updateContact: (id: number, updates: Partial<Contact>) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  sendMessage: (msg: Omit<Message, "id" | "timestamp" | "status">) => Promise<void>;
  loading: boolean;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: "Alice Johnson", phone: "+15550101", group: "Family", email: "alice@example.com", avatar: null, isFavorite: true, createdAt: new Date() },
  { id: 2, name: "Bob Smith", phone: "+15550102", group: "Work", email: "bob@corp.com", avatar: null, isFavorite: false, createdAt: new Date() },
  { id: 3, name: "Carol White", phone: "+15550103", group: "Friends", email: "carol@live.com", avatar: null, isFavorite: true, createdAt: new Date() },
];

const INITIAL_MESSAGES: Message[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  direction: i % 3 === 0 ? "outbound" : "inbound",
  status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "sent" : "received",
  recipient: i % 3 === 0 ? "+15550102" : "+15550101",
  content: i % 3 === 0 ? "Hey, are we still on for the meeting?" : "Your verification code is 123456",
  simSlot: 1,
  timestamp: subDays(new Date(), i),
}));

const INITIAL_STATS: DashboardStats = {
  totalSent: 1245,
  totalReceived: 850,
  failed: 23,
  credits: 45.50,
  activeSims: 2,
  signalStrength: 85,
};

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [loading, setLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addContact = async (contact: Omit<Contact, "id" | "createdAt">) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newContact: Contact = {
      ...contact,
      id: Math.max(...contacts.map(c => c.id)) + 1,
      createdAt: new Date(),
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = async (id: number, updates: Partial<Contact>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteContact = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const sendMessage = async (msg: Omit<Message, "id" | "timestamp" | "status">) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newMessage: Message = {
      ...msg,
      id: Math.max(...messages.map(m => m.id)) + 1,
      timestamp: new Date(),
      status: "queued", // Initially queued
    };
    setMessages(prev => [newMessage, ...prev]);
    setStats(prev => ({ ...prev, totalSent: prev.totalSent + 1 }));

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "sent" } : m));
    }, 2000);
  };

  return (
    <MockDataContext.Provider value={{
      contacts,
      messages,
      stats,
      addContact,
      updateContact,
      deleteContact,
      sendMessage,
      loading
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) throw new Error("useMockData must be used within MockDataProvider");
  return context;
}
