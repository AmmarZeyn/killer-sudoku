import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AlertCircle, BookOpen, Cog, Grid, Info, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Generator3x3() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Array<{sum: number, cells: number, combinations: number[][]}>>([]); 
  const [error, setError] = useState("");
  const [finalCombos, setFinalCombos] = useState<number[][][]>([]);

  const handleCalculate = () => {
    setError("");
    setFinalCombos([]);
    setResults([]);
    
    const lines = input.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) {
      setError("Please enter at least one cage definition.");
      return;
    }
    
    const cages: {sum: number, cells: number}[] = [];
    for (const line of lines) {
      const parts = line.split(",").map(part => part.trim());
      if (parts.length !== 2) {
        setError(`Invalid format: "${line}". Use "sum,cells" format.`);
        return;
      }
      
      const sum = parseInt(parts[0]);
      const cells = parseInt(parts[1]);
      
      if (isNaN(sum) || isNaN(cells) || sum < 1 || cells < 1 || cells > 9) {
        setError(`Invalid cage: "${line}". Sum and cells must be positive numbers.`);
        return;
      }
      
      cages.push({ sum, cells });
    }
    
    const totalCells = cages.reduce((acc, cage) => acc + cage.cells, 0);
    if (totalCells !== 9) {
      setError(`Total cell count is ${totalCells}, but should be 9 for a 3x3 grid.`);
      return;
    }
    
    const totalSum = cages.reduce((acc, cage) => acc + cage.sum, 0);
    if (totalSum !== 45) {
      setError(`Total sum is ${totalSum}, but should be 45 (sum of digits 1-9).`);
      return;
    }
    
    const cageCombos = cages.map(({ sum, cells }) => getCombinations(sum, cells));
    const allValid3x3 = combineCages(cageCombos);
    
    setResults(cages.map((c, i) => ({ 
      ...c, 
      combinations: cageCombos[i] 
    })));
    
    setFinalCombos(allValid3x3);
  };

  const getCombinations = (total: number, cells: number, start = 1, current: number[] = [], all: number[][] = []) => {
    if (cells === 0 && total === 0) {
      // Sort the current combination to ensure [3,2] is treated the same as [2,3]
      const sortedCombination = [...current].sort((a, b) => a - b);
      // Check if this combination (in sorted form) is already in the results
      const alreadyExists = all.some(combo => 
        combo.length === sortedCombination.length && 
        combo.every((val, idx) => val === sortedCombination[idx])
      );
      
      if (!alreadyExists) {
        all.push(sortedCombination);
      }
      return all;
    }
    if (cells === 0 || total < 0) return all;

    for (let i = start; i <= 9; i++) {
      if (!current.includes(i)) {
        current.push(i);
        getCombinations(total - i, cells - 1, i + 1, current, all);  // Changed 'start' to 'i + 1' to fix recursion
        current.pop();
      }
    }
    return all;
  };

  const combineCages = (cageCombos: number[][][], index = 0, current: number[][] = [], results: number[][][] = []) => {
    if (index === cageCombos.length) {
      if (current.flat().length === 9) results.push([...current]);
      return results;
    }
    
    for (const combo of cageCombos[index]) {
      if (combo.every((n) => !current.flat().includes(n))) {
        current.push([...combo]);
        combineCages(cageCombos, index + 1, current, results);
        current.pop();
      }
    }
    return results;
  };

  // For visualization purposes - generate colors for cages
  const cageColors = ["bg-primary/10", "bg-slate-100", "bg-yellow-100", "bg-green-100", "bg-purple-100"];

  return (
    <div className="space-y-5 animate-in fade-in">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
          <Grid className="text-primary h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">3×3 Generator</h2>
          <p className="text-sm text-slate-500">Find valid combinations for a 3×3 grid section</p>
        </div>
      </div>
      
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Cage Definitions</label>
        <p className="text-xs text-slate-500 mb-3">
          Enter each cage in the format: <span className="inline-block bg-slate-200 px-1 rounded">sum,cells</span> — one per line
        </p>
        <Textarea 
          className="h-36 font-mono text-sm"
          placeholder={`Example:
8,2
17,3
20,4`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-2 text-xs text-slate-600 flex items-center">
          <Info className="h-3 w-3 text-primary mr-1" />
          The sum of all cages must equal 45 (sum of digits 1-9)
        </div>
      </div>
      
      <Button 
        onClick={handleCalculate}
        className="w-full py-3 transition flex items-center justify-center"
      >
        <Cog className="mr-2 h-4 w-4" />
        Calculate Valid Combinations
      </Button>
      
      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Cage Details */}
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Info className="mr-2 h-5 w-5 text-primary" />
            Cage Details
          </h3>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">{result.sum}</span>
                  </div>
                  <div>
                    <div className="font-medium">Sum: {result.sum} in {result.cells} cells</div>
                    <div className="text-sm text-slate-500">{result.combinations.length} possible combinations</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Final Combinations */}
      {finalCombos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Possible 3×3 Combinations
            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-0">
              {finalCombos.length} found
            </Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {finalCombos.slice(0, 10).map((group, idx) => (
              <Card key={idx} className="p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* Create a 3x3 grid visualization */}
                  {Array.from({ length: 9 }).map((_, i) => {
                    // Find which cage this cell belongs to
                    const cageIndex = group.findIndex((cage: number[]) => 
                      cage.includes(i + 1)
                    );
                    
                    return (
                      <div 
                        key={i} 
                        className={`${cageColors[cageIndex % cageColors.length]} rounded p-2 flex items-center justify-center font-mono`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  {group.map((cage: number[], i: number) => (
                    <div key={i}>
                      <span className={`inline-block w-3 h-3 ${cageColors[i % cageColors.length]} mr-1`}></span>
                      {results[i]?.sum}: [{cage.join(', ')}]
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            {finalCombos.length > 10 && (
              <div className="col-span-1 md:col-span-2 text-center text-sm text-slate-500 p-2">
                {finalCombos.length - 10} more combinations available but not shown...
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Quick Guide */}
      <Card className="bg-amber-50 border-amber-200 p-4 mt-6">
        <h4 className="font-medium text-amber-800 flex items-center">
          <BookOpen className="text-amber-500 mr-2 h-5 w-5" />
          How to Use
        </h4>
        <ol className="text-sm text-amber-700 mt-2 space-y-1 list-decimal list-inside">
          <li>Enter each cage as a sum and the number of cells, separated by a comma</li>
          <li>Make sure your cages cover all 9 cells of the 3×3 grid</li>
          <li>All cages must add up to 45 (sum of digits 1-9)</li>
          <li>The generator will find all possible valid combinations</li>
        </ol>
      </Card>
    </div>
  );
}
