import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import EditorPage from "@/pages/Editor";
import HomePage from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/editor/:id" component={EditorPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
