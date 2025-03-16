import { CalculatorInputDimensions, CalculatorInputArea, CalculationResult } from "@shared/schema";
import { CALCULATION_CONSTANTS } from "./constants";

export function calculateFromDimensions(input: CalculatorInputDimensions): CalculationResult {
  const { length, width, height, type } = input;
  const area = length * width;
  return calculateScaffolding(area, height, length, width, type);
}

export function calculateFromArea(input: CalculatorInputArea): CalculationResult {
  const { area, height, type } = input;
  
  // Approximating length and width for visualization purposes
  const approximatedLength = Math.sqrt(area);
  const approximatedWidth = area / approximatedLength;
  
  return calculateScaffolding(area, height, approximatedLength, approximatedWidth, type);
}

function calculateScaffolding(
  area: number, 
  height: number, 
  length: number, 
  width: number, 
  type: string
): CalculationResult {
  const constants = CALCULATION_CONSTANTS[type as keyof typeof CALCULATION_CONSTANTS];
  const perimeter = 2 * (length + width);
  
  // Calculate quantities
  const standardsCount = Math.ceil(area * constants.standardsPerArea * (height / 3));
  const ledgersCount = Math.ceil(area * constants.ledgersPerArea * (height / 3));
  const transomCount = Math.ceil(area * constants.transomPerArea * (height / 3));
  const basePlatesCount = standardsCount; // Each standard needs a base plate
  const guardRailsCount = Math.ceil(perimeter * constants.guardrailsPerPerimeter * Math.ceil(height / 3));
  const toeBoardsCount = Math.ceil(perimeter * constants.toeboardsPerPerimeter * Math.ceil(height / 3));
  const platformsCount = Math.ceil(area * constants.platformsPerArea * Math.ceil(height / 3));
  const couplersCount = Math.ceil(standardsCount * constants.couplersPerStandard);
  
  // Calculate weight
  const totalWeight = 
    standardsCount * constants.weightPerComponent.standard +
    ledgersCount * constants.weightPerComponent.ledger +
    transomCount * constants.weightPerComponent.transom +
    basePlatesCount * constants.weightPerComponent.basePlate +
    guardRailsCount * constants.weightPerComponent.guardRail +
    toeBoardsCount * constants.weightPerComponent.toeboard +
    platformsCount * constants.weightPerComponent.platform +
    couplersCount * constants.weightPerComponent.coupler;
  
  // Format the result
  const totalComponents = 
    standardsCount + 
    ledgersCount + 
    transomCount + 
    basePlatesCount + 
    guardRailsCount + 
    toeBoardsCount + 
    platformsCount + 
    couplersCount;
  
  // Map scaffolding type to readable name
  const typeName = {
    system: "System Scaffolding",
    frame: "Frame Scaffolding",
    tube: "Tube and Coupler"
  }[type];
  
  return {
    standards: { quantity: standardsCount, specs: constants.standardsSpecs },
    ledgers: { quantity: ledgersCount, specs: constants.ledgersSpecs },
    transoms: { quantity: transomCount, specs: constants.transomSpecs },
    basePlates: { quantity: basePlatesCount, specs: "150mm" },
    guardRails: { quantity: guardRailsCount, specs: constants.guardrailsSpecs },
    toeBoards: { quantity: toeBoardsCount, specs: constants.toeboardsSpecs },
    platforms: { quantity: platformsCount, specs: constants.platformsSpecs },
    couplers: { quantity: couplersCount, specs: constants.couplersSpecs },
    totalComponents,
    weight: Math.round(totalWeight),
    loadCapacity: constants.loadCapacity,
    dimensions: `${length.toFixed(1)}m x ${width.toFixed(1)}m x ${height.toFixed(1)}m`,
    area: Math.round(area),
    type: typeName,
    safetyFactor: constants.safetyFactor
  };
}

// Format numbers with thousands separator
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to trigger print of the results
export function printResults() {
  window.print();
}

// Function to save results (as HTML in this case)
export function saveResults() {
  const resultsSection = document.getElementById('resultsSection');
  if (!resultsSection) return;
  
  const content = resultsSection.innerHTML;
  const blob = new Blob([`
    <html>
      <head>
        <title>ScaffoldPro Calculation Results</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { font-weight: bold; }
          h2, h3 { color: #FF6B00; }
        </style>
      </head>
      <body>
        <h2>ScaffoldPro Calculation Results</h2>
        ${content}
      </body>
    </html>
  `], { type: 'text/html' });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'scaffolding-calculation.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
