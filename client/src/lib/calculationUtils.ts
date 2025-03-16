import { CalculatorInputDimensions, CalculatorInputArea, CalculationResult, FrameSize, PlatformLength, WorkLevel } from "@shared/schema";
import { CALCULATION_CONSTANTS, FRAME_SIZES, PLATFORM_LENGTHS } from "./constants";

export function calculateFromDimensions(input: CalculatorInputDimensions): CalculationResult {
  const { length, height, frameSize, platformLength, workLevels } = input;
  
  // Calculate approximate area based on wall length and height
  const area = length * height;
  
  return calculateScaffolding(
    area, 
    length, 
    height, 
    frameSize, 
    platformLength, 
    workLevels
  );
}

export function calculateFromArea(input: CalculatorInputArea): CalculationResult {
  const { area, height, frameSize, platformLength, workLevels } = input;
  
  // Approximating length for wall length
  const approximatedLength = area / height;
  
  return calculateScaffolding(
    area, 
    approximatedLength, 
    height, 
    frameSize, 
    platformLength, 
    workLevels
  );
}

function calculateScaffolding(
  area: number, 
  wallLength: number, 
  height: number, 
  frameSize: FrameSize, 
  platformLength: PlatformLength, 
  workLevels: WorkLevel
): CalculationResult {
  const scaffoldType = "mason-frame";
  const constants = CALCULATION_CONSTANTS[scaffoldType];
  const frameSizeDetails = FRAME_SIZES[frameSize];
  const platformDetails = PLATFORM_LENGTHS[platformLength];
  
  // Get width from the frame selection
  const frameWidth = frameSizeDetails.dimensions.width / 100; // Convert to meters
  
  // Calculate perimeter (just the length for wall scaffolding)
  const perimeter = wallLength;
  
  // Calculate quantities
  const framesCount = Math.ceil(wallLength * constants.framesPerMeter);
  const crossBracesCount = Math.ceil(framesCount * constants.crossBracesPerFrame);
  const guardrailsCount = Math.ceil(perimeter * constants.guardrailsPerMeter * workLevels);
  const basePlatesCount = Math.ceil(framesCount * constants.basePlatesPerFrame);
  const platformsCount = Math.ceil(perimeter * constants.platformsPerMeter * workLevels);
  const screwCount = Math.ceil(framesCount * constants.screwJacksPerFrame);
  const toeboardsCount = Math.ceil(perimeter * constants.toeboardsPerMeter * workLevels);
  const outriggersCount = Math.ceil(perimeter * constants.outriggersPerSide);
  const laddersCount = Math.ceil(constants.laddersPerLevel * workLevels);
  
  // Calculate weight
  const totalWeight = 
    framesCount * constants.weightPerComponent.frame +
    crossBracesCount * constants.weightPerComponent.crossBrace +
    guardrailsCount * constants.weightPerComponent.guardrail +
    basePlatesCount * constants.weightPerComponent.basePlate +
    platformsCount * constants.weightPerComponent.platform +
    screwCount * constants.weightPerComponent.screwJack +
    toeboardsCount * constants.weightPerComponent.toeboard +
    outriggersCount * constants.weightPerComponent.outrigger +
    laddersCount * constants.weightPerComponent.ladder;
  
  // Format the result
  const totalComponents = 
    framesCount + 
    crossBracesCount + 
    guardrailsCount + 
    basePlatesCount + 
    platformsCount + 
    screwCount + 
    toeboardsCount + 
    outriggersCount + 
    laddersCount;
  
  return {
    frames: { quantity: framesCount, specs: frameSizeDetails.name },
    crossBraces: { quantity: crossBracesCount, specs: "Standard cross braces" },
    guardrails: { quantity: guardrailsCount, specs: "Safety guardrails" },
    basePlates: { quantity: basePlatesCount, specs: "Standard base plates" },
    platforms: { quantity: platformsCount, specs: platformDetails.name },
    screw: { quantity: screwCount, specs: "Adjustable base jacks" },
    toeBoards: { quantity: toeboardsCount, specs: "Safety toe boards" },
    outriggers: { quantity: outriggersCount, specs: "Stabilizing outriggers" },
    ladders: { quantity: laddersCount, specs: "Access ladders" },
    totalComponents,
    weight: Math.round(totalWeight),
    loadCapacity: constants.loadCapacity,
    dimensions: `${wallLength.toFixed(1)}m x ${frameWidth.toFixed(1)}m x ${height.toFixed(1)}m`,
    area: Math.round(area),
    frameSize: frameSizeDetails.name,
    platformLength: platformDetails.name,
    workLevels: workLevels,
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
