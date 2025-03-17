import { CalculatorInputDimensions, CalculatorInputArea, CalculationResult, FrameSize, PlatformLength, WorkLevel } from "@shared/schema";
import { CALCULATION_CONSTANTS, FRAME_SIZES, PLATFORM_LENGTHS } from "./constants";

export function calculateFromDimensions(input: CalculatorInputDimensions): CalculationResult {
  const { length, height, frameSize, platformLength, workLevels, buildingSides } = input;
  
  // Calculate approximate area based on wall length and height (multiplied by sides)
  const singleWallArea = length * height;
  const totalArea = singleWallArea * buildingSides;
  
  return calculateScaffolding(
    totalArea, 
    length, 
    height, 
    frameSize, 
    platformLength, 
    workLevels,
    buildingSides
  );
}

export function calculateFromArea(input: CalculatorInputArea): CalculationResult {
  const { area, height, frameSize, platformLength, workLevels, buildingSides } = input;
  
  // Approximating length for wall length
  // Divide total area by number of sides to get area per side
  const areaPerSide = area / buildingSides;
  const approximatedLength = areaPerSide / height;
  
  return calculateScaffolding(
    area, 
    approximatedLength, 
    height, 
    frameSize, 
    platformLength, 
    workLevels,
    buildingSides
  );
}

function calculateScaffolding(
  area: number, 
  wallLength: number, 
  height: number, 
  frameSize: FrameSize, 
  platformLength: PlatformLength, 
  workLevels: WorkLevel,
  buildingSides: number = 1
): CalculationResult {
  const scaffoldType = "mason-frame";
  const constants = CALCULATION_CONSTANTS[scaffoldType];
  const frameSizeDetails = FRAME_SIZES[frameSize];
  const platformDetails = PLATFORM_LENGTHS[platformLength];
  
  // Get width from the frame selection
  const frameWidth = frameSizeDetails.dimensions.width / 100; // Convert to meters
  const platformLengthValue = platformDetails.lengthCm / 100; // Convert to meters
  
  // Calculate total perimeter based on number of sides
  const perimeter = wallLength * buildingSides;
  
  // Calculate the area covered by frame width x height and platform length
  const frameWidthMeters = frameSizeDetails.dimensions.width / 100; // Convert 91.44cm to meters
  const frameHeightMeters = frameSizeDetails.dimensions.height / 100; // Convert 152.4cm to meters
  // Calculate scaffold coverage based on frame dimensions and platform length
  const frameHeight = frameSizeDetails.dimensions.height / 100; // Convert to meters
  const frameWidth = frameSizeDetails.dimensions.width / 100; // Convert to meters
  
  // Calculate area per section (frame width x platform length)
  const areaPerSection = frameWidth * platformLengthValue;
  
  // Calculate total scaffold coverage
  const scaffoldCoverage = areaPerSection * framesPerSide * buildingSides;
  
  // Calculate total wall area being covered
  const totalWallArea = wallLength * height * buildingSides;
  
  // Calculate scaffold efficiency (coverage ratio)
  const coverageRatio = scaffoldCoverage / totalWallArea;
  
  // Calculate quantities
  const framesPerSide = Math.ceil(wallLength * constants.framesPerMeter);
  const framesCount = framesPerSide * buildingSides;
  
  const crossBracesCount = Math.ceil(framesCount * constants.crossBracesPerFrame);
  // Calculate components per level
  const guardrailsPerLevel = Math.ceil(perimeter * constants.guardrailsPerMeter);
  const platformsPerLevel = Math.ceil(perimeter * constants.platformsPerMeter);
  const toeboardsPerLevel = Math.ceil(perimeter * constants.toeboardsPerMeter);
  
  // Calculate total quantities accounting for all working levels
  const guardrailsCount = guardrailsPerLevel * workLevels;
  const basePlatesCount = framesCount; // One per frame
  const platformsCount = platformsPerLevel * workLevels;
  const screwCount = framesCount; // One per frame
  const toeboardsCount = toeboardsPerLevel * workLevels;
  const outriggersCount = 2 * buildingSides; // 2 per side
  const laddersCount = Math.ceil(buildingSides / 2); // 1 ladder per 2 sides, minimum 1
  
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
  
  // Calculate total scaffolding coverage area
  const totalScaffoldCoverage = scaffoldCoverage * framesCount;

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
    scaffoldCoverage: Math.round(totalScaffoldCoverage * 100) / 100, // Round to 2 decimal places
    frameSize: frameSizeDetails.name,
    platformLength: platformDetails.name,
    workLevels: workLevels,
    buildingSides: buildingSides,
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
