import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

// Import the getBasePath function from App.tsx (or create a utils file)
// For now, let's redefine it here to keep it simple
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

export default function NotFound() {
  // Log the current path for debugging GitHub Pages issues
  useEffect(() => {
    console.log("404 Page - Current path:", window.location.pathname);
    console.log("404 Page - Search params:", window.location.search);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Link href={`${getBasePath()}/`}>
            <Button className="mt-4 gap-2">
              <Home size={16} />
              Return to Home Page
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
