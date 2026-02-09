import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { MockDataProvider } from "./hooks/use-mock-data";
import { Layout } from "@/components/Layout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Compose from "@/pages/Compose";
import History from "@/pages/History";
import Contacts from "@/pages/Contacts";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/compose" component={Compose} />
        <Route path="/history" component={History} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MockDataProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </MockDataProvider>
    </QueryClientProvider>
  );
}

export default App;
