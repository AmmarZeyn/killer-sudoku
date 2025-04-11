import { useState } from "react";
import CombinationFinder from "@/components/combination-finder";
import Generator3x3 from "@/components/generator3x3";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"finder" | "generator">("finder");

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Killer Sudoku Helper</h1>
          <p className="text-sm text-center mt-2 opacity-90">Solve puzzles faster with our specialized tools</p>
        </div>
        
        {/* Main Content Area */}
        <div className="p-4 md:p-6">
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 border-b border-slate-200 pb-4">
            <button 
              onClick={() => setActiveTab("finder")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition flex items-center
                ${activeTab === "finder" 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              Combination Finder
            </button>
            <button 
              onClick={() => setActiveTab("generator")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition flex items-center
                ${activeTab === "generator" 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                <rect width="7" height="7" x="3" y="14" rx="1"></rect>
              </svg>
              3×3 Generator
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "finder" ? <CombinationFinder /> : <Generator3x3 />}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-slate-100 p-4 text-center text-sm text-slate-500 border-t border-slate-200">
          <p>Killer Sudoku Helper • Designed for puzzle enthusiasts</p>
        </div>
      </div>
    </div>
  );
}
