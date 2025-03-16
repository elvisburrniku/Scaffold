import { useState } from "react";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import CalculationResults from "@/components/calculator/CalculationResults";
import { CalculationResult, CalculatorInputDimensions, CalculatorInputArea } from "@shared/schema";
import { calculateFromDimensions, calculateFromArea } from "@/lib/calculationUtils";

export default function CalculatorSection() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  
  const handleDimensionsCalculate = (data: CalculatorInputDimensions) => {
    const calculationResult = calculateFromDimensions(data);
    setResults(calculationResult);
    
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('resultsSection');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  const handleAreaCalculate = (data: CalculatorInputArea) => {
    const calculationResult = calculateFromArea(data);
    setResults(calculationResult);
    
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('resultsSection');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scaffolding Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate exactly what you need for your next project. Enter your measurements to get started.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
          <CalculatorForm 
            onDimensionsCalculate={handleDimensionsCalculate}
            onAreaCalculate={handleAreaCalculate}
          />
          
          <div id="resultsSection" className={`${results ? '' : 'hidden'} pt-6 border-t`}>
            {results && <CalculationResults results={results} />}
          </div>
        </div>
      </div>
    </section>
  );
}
