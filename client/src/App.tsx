import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Get the base path for GitHub Pages or use '/' for development
const getBasePath = () => {
  // Check if we're in production and on GitHub Pages
  if (import.meta.env.PROD) {
    // Extract the repository name from the path if deployed to GitHub Pages
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1) {
      const repoName = pathSegments[1];
      if (repoName) return `/${repoName}`;
    }
  }
  return '';
};

// Use a hook to get the base path
const useBasePath = () => {
  return getBasePath();
};

function Router() {
  const basePath = useBasePath();
  const [location] = useLocation();
  
  return (
    <Switch>
      <Route path={`${basePath}/`} component={Home} />
      {/* Fallback to 404 */}
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
