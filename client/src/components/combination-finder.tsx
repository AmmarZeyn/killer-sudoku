import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle, Calculator, Info, Search } from 'lucide-react';

export default function CombinationFinder() {
  const [cageSum, setCageSum] = useState("");
  const [numCells, setNumCells] = useState("");
  const [excludedDigits, setExcludedDigits] = useState("");
  const [results, setResults] = useState("");
  const [error, setError] = useState("");
  
  const findCombinations = () => {
    setError("");
    setResults("");
    const targetSum = parseInt(cageSum);
    const cells = parseInt(numCells);

    if (isNaN(targetSum) || isNaN(cells) || targetSum < 1 || cells < 1 || cells > 9) {
      setError("Please enter valid numbers for Sum and Number of Cells.");
      return;
    }

    const excludedSet = new Set();
    if (excludedDigits) {
      const excludedArray = excludedDigits.split(",").map((s) => s.trim());
      for (const item of excludedArray) {
        const digit = parseInt(item);
        if (!isNaN(digit) && digit >= 1 && digit <= 9) {
          excludedSet.add(digit);
        } else {
          setError(`Invalid excluded digit: "${item}". Use digits 1-9.`);
          return;
        }
      }
    }

    const availableDigits = Array.from({ length: 9 }, (_, i) => i + 1).filter(
      (digit) => !excludedSet.has(digit)
    );

    if (availableDigits.length < cells) {
      setError(`Not enough available digits (${availableDigits.length}) for ${cells} cells.`);
      return;
    }

    const combinations = getCombinations(targetSum, cells, availableDigits);
    if (combinations.length === 0) {
      setResults("No valid combinations found.");
    } else {
      setResults(
        `Found ${combinations.length} combination(s):\n${combinations
          .map((combo) => `[${combo.join(", ")}]`)
          .join("\n")}`
      );
    }
  };

  const getCombinations = (total, cells, available, start = 0, current = [], all = []) => {
    if (cells === 0 && total === 0) {
      all.push([...current]);
      return;
    }
    if (cells === 0 || total < 0) return;

    for (let i = start; i < available.length; i++) {
      const num = available[i];
      current.push(num);
      getCombinations(total - num, cells - 1, available, i + 1, current, all);
      current.pop();
    }
    return all;
  };
  
  return (
    <div className="space-y-5 animate-in fade-in">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
          <Calculator className="text-primary h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Combination Finder</h2>
          <p className="text-sm text-slate-500">Find all possible number combinations for a cage</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="cage-sum" className="block text-sm font-medium text-slate-700 mb-1">Cage Sum</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span className="text-gray-500">=</span>
              </div>
              <Input
                id="cage-sum"
                type="number"
                value={cageSum}
                onChange={(e) => setCageSum(e.target.value)}
                className="pl-10"
                placeholder="Enter sum (e.g. 15)"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Total value of all cells in the cage</p>
          </div>
          
          <div>
            <label htmlFor="num-cells" className="block text-sm font-medium text-slate-700 mb-1">Number of Cells</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span className="text-gray-500">#</span>
              </div>
              <Input
                id="num-cells"
                type="number"
                value={numCells}
                onChange={(e) => setNumCells(e.target.value)}
                className="pl-10"
                placeholder="Enter count (1-9)"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">How many cells are in this cage?</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="excluded-digits" className="block text-sm font-medium text-slate-700 mb-1">Excluded Digits</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <AlertCircle className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="excluded-digits"
                type="text"
                value={excludedDigits}
                onChange={(e) => setExcludedDigits(e.target.value)}
                className="pl-10"
                placeholder="e.g., 1,8,9"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Digits already used in row, column or box (comma-separated)</p>
          </div>
          
          <div className="flex items-end h-full">
            <Button 
              onClick={findCombinations}
              className="w-full transition flex items-center justify-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Combinations
            </Button>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Results Display */}
      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Possible Combinations
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">{results}</pre>
          </div>
        </div>
      )}
      
      {/* Quick Tips */}
      <Card className="bg-amber-50 border-amber-200 p-4 mt-6">
        <h4 className="font-medium text-amber-800 flex items-center">
          <Info className="text-amber-500 mr-2 h-5 w-5" />
          Tips
        </h4>
        <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
          <li>For a 2-cell cage with sum 3, the only combination is [1,2]</li>
          <li>For larger cages, exclude digits that appear in the same row, column or box</li>
          <li>Remember: Each digit 1-9 can only appear once in each row, column and box</li>
        </ul>
      </Card>
    </div>
  );
}
