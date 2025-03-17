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

  // Get frame dimensions and convert to meters
  const frameWidth = frameSizeDetails.dimensions.width / 100;
  const frameHeight = frameSizeDetails.dimensions.height / 100;
  const platformLengthValue = platformDetails.lengthCm / 100;

  // Calculate total perimeter based on number of sides
  const perimeter = wallLength * buildingSides;

  // Calculate frame dimensions and quantities
  // Calculate quantities based on example calculation
  // For a 33x17 wall they use 18 frames, so let's adjust our ratios
  const framesPerSide = Math.ceil((wallLength / 10) * 5.45); // Calibrated to get ~18 frames for 33m wall
  const framesCount = framesPerSide * buildingSides;

  // Braces are ~1.67x the frame count in the example (30 braces / 18 frames)
  const crossBracesCount = Math.ceil(framesCount * 1.67);

  // Platforms are same as braces in example (30 platforms)
  const platformsCount = crossBracesCount;

  // Base plates (levelling jacks) are ~0.67x frame count (12 jacks / 18 frames)
  const basePlatesCount = Math.ceil(framesCount * 0.67);

  // Guardrail posts same as base plates in example (12 posts)
  const guardrailPostsCount = basePlatesCount;

  // Side guardrails based on length (20 in example)
  const guardrailsCount = Math.ceil((wallLength / 10) * 6);

  // End guardrails fixed at 4 like example
  const endGuardrailsCount = 4;

  // Wall attachments based on length (3 in example for 33m)
  const wallAttachmentsCount = Math.ceil((wallLength / 11));

  // Combined guardrails total
  const totalGuardrailsCount = guardrailsCount + endGuardrailsCount;

  // Toe boards approximately 1/3 of guardrails
  const toeboardsCount = Math.ceil(totalGuardrailsCount / 3);

  // Keep these calculations but adjust quantities
  const screwCount = basePlatesCount; // Same as base plates
  const outriggersCount = wallAttachmentsCount; // Same as wall attachments
  const laddersCount = Math.ceil(workLevels * 0.5); // 1 ladder per 2 levels

  // Calculate area per section (frame width x platform length)
  const areaPerSection = frameWidth * platformLengthValue;

  // Calculate total scaffold coverage
  const scaffoldCoverage = areaPerSection * framesPerSide * buildingSides;

  // Calculate total wall area being covered
  const totalWallArea = wallLength * height * buildingSides;

  // Calculate scaffold efficiency (coverage ratio)
  const coverageRatio = scaffoldCoverage / totalWallArea;


  // Calculate weight
  const totalWeight = 
    framesCount * constants.weightPerComponent.frame +
    crossBracesCount * constants.weightPerComponent.crossBrace +
    totalGuardrailsCount * constants.weightPerComponent.guardrail +
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
    totalGuardrailsCount + 
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
    guardrails: { quantity: totalGuardrailsCount, specs: "Safety guardrails" },
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