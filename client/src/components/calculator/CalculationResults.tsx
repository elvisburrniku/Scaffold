import { CalculationResult } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { formatNumber, printResults, saveResults } from "@/lib/calculationUtils";
import { Printer, Save, Package } from "lucide-react";

interface CalculationResultsProps {
  results: CalculationResult;
}

export default function CalculationResults({ results }: CalculationResultsProps) {
  return (
    <div id="resultsSection">
      <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-3">Component Breakdown</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2">Component</th>
                  <th className="text-right pb-2">Quantity</th>
                  <th className="text-right pb-2">Specs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Frames</td>
                  <td className="text-right py-2">{results.frames.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.frames.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Cross Braces</td>
                  <td className="text-right py-2">{results.crossBraces.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.crossBraces.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Guardrails</td>
                  <td className="text-right py-2">{results.guardrails.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.guardrails.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Base Plates</td>
                  <td className="text-right py-2">{results.basePlates.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.basePlates.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Platforms</td>
                  <td className="text-right py-2">{results.platforms.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.platforms.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Screw Jacks</td>
                  <td className="text-right py-2">{results.screw.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.screw.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Toe Boards</td>
                  <td className="text-right py-2">{results.toeBoards.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.toeBoards.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Outriggers</td>
                  <td className="text-right py-2">{results.outriggers.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.outriggers.specs}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Ladders</td>
                  <td className="text-right py-2">{results.ladders.quantity}</td>
                  <td className="text-right py-2 text-xs">{results.ladders.specs}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-100">
                  <td className="py-2 font-semibold">Total Components</td>
                  <td className="text-right py-2 font-semibold">{results.totalComponents}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-2">Load Information</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p><span className="font-medium">Estimated Weight:</span> {formatNumber(results.weight)} kg</p>
              <p><span className="font-medium">Max Load Capacity:</span> {formatNumber(results.loadCapacity)} kg/m²</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              onClick={printResults}
              variant="secondary" 
              className="flex items-center"
            >
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button 
              onClick={saveResults}
              className="bg-[#38B2AC] hover:bg-[#38B2AC]/90 text-white flex items-center"
            >
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-3">Visualization</h4>
          <div className="bg-gray-50 rounded-lg p-4 h-[300px]">
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Scaffolding visualization preview</p>
                <p className="text-xs text-gray-400 mt-2">(Full 3D visualization available in the full version)</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-2">Project Summary</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p><span className="font-medium">Dimensions:</span> {results.dimensions}</p>
              <p><span className="font-medium">Total Area:</span> {results.area} m²</p>
              <p><span className="font-medium">Frame Size:</span> {results.frameSize}</p>
              <p><span className="font-medium">Platform Type:</span> {results.platformLength}</p>
              <p><span className="font-medium">Working Levels:</span> {results.workLevels}</p>
              <p><span className="font-medium">Safety Factor:</span> {results.safetyFactor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
