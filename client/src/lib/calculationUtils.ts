import { CalculatorInputDimensions, CalculatorInputArea, CalculationResult, FrameSize, PlatformLength, WorkLevel } from "@shared/schema";
import { CALCULATION_CONSTANTS, FRAME_SIZES, PLATFORM_LENGTHS } from "./constants";

export type SideDimension = {
  width: number;
  height: number;
};

export type CalculatorInputDimensions = {
  sides: SideDimension[];
  frameSize: FrameSize;
  platformLength: PlatformLength;
  workLevels: WorkLevel;
  buildingSides: number;
};

export function calculateFromDimensions(input: CalculatorInputDimensions): CalculationResult {
  const { sides, frameSize, platformLength, workLevels, buildingSides } = input;

  // Calculate approximate area based on wall length and height (multiplied by sides)
  let totalArea = 0;
  sides.forEach(side => totalArea += side.width * side.height);


  return calculateScaffolding(
    totalArea, 
    sides.reduce((sum, side) => sum + side.width,0), //approximated total length
    sides[0].height, //using the height of the first side as a representative height.  This needs refinement.
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
  const frameSizeDetails = FRAME_SIZES[frameSize];
  const platformDetails = PLATFORM_LENGTHS[platformLength];

  // Convert dimensions to meters
  const frameHeight = frameSizeDetails.dimensions.height / 100;
  const frameWidth = frameSizeDetails.dimensions.width / 100;
  const platformLengthValue = platformDetails.lengthCm / 100;
  // console.log(frameHeight, frameWidth, platformLengthValue);

  // Calculate frame area
  const frameArea = frameHeight * frameWidth;

  // Calculate area covered by one platform row of frames
  const frameCoveragePerPlatform = platformLengthValue * frameWidth;
  console.log(frameCoveragePerPlatform);
  // Calculate wall area per side
  const wallArea = wallLength * height;

  // Calculate frames needed per wall
  const framesPerWall = Math.ceil(wallArea / frameCoveragePerPlatform);

  const framesPerWholeWall = framesPerWall * workLevels;

  // Calculate total frames needed for all sides
  const totalFrames = framesPerWholeWall * buildingSides;

  // Calculate total scaffold coverage
  const scaffoldCoverage = frameCoveragePerPlatform * Math.ceil(wallLength / platformLengthValue) * buildingSides;

  // Calculate perimeter for guardrails
  const perimeter = wallLength * buildingSides;
  const constants = CALCULATION_CONSTANTS["mason-frame"];

  const crossBracesCount = Math.ceil(totalFrames * constants.crossBracesPerFrame - 1);
  const guardrailsCount = Math.ceil(perimeter * constants.guardrailsPerMeter * workLevels);
  const basePlatesCount = Math.ceil(framesPerWall * 2);
  const platformsCount = Math.ceil(perimeter / platformLengthValue * workLevels * 2);
  const screwCount = Math.ceil(framesPerWall * 2);
  const toeboardsCount = Math.ceil(perimeter * constants.toeboardsPerMeter * workLevels);
  const outriggersCount = Math.ceil(perimeter * constants.outriggersPerSide);
  const laddersCount = Math.ceil(constants.laddersPerLevel * workLevels * (buildingSides > 1 ? buildingSides / 2 : 1));
  const legHolderCount = Math.ceil(framesPerWall * buildingSides);
  const wallAttachmentCount = Math.ceil(perimeter / 5 * workLevels + 1);
  const sideGuardrailsCount = Math.ceil(framesPerWall * 2 * workLevels * buildingSides);
  

  // Calculate weight
  const totalWeight = 
    totalFrames * constants.weightPerComponent.frame +
    crossBracesCount * constants.weightPerComponent.crossBrace +
    guardrailsCount * constants.weightPerComponent.guardrail +
    basePlatesCount * constants.weightPerComponent.basePlate +
    platformsCount * constants.weightPerComponent.platform +
    screwCount * constants.weightPerComponent.screwJack +
    toeboardsCount * constants.weightPerComponent.toeboard +
    outriggersCount * constants.weightPerComponent.outrigger +
    laddersCount * constants.weightPerComponent.ladder +
    legHolderCount * constants.weightPerComponent.legHolder +
    wallAttachmentCount * constants.weightPerComponent.wallAttachment
    sideGuardrailsCount * constants.weightPerComponent.sideGuardrail;

  // Format the result
  const totalComponents = 
    totalFrames + 
    crossBracesCount + 
    guardrailsCount + 
    basePlatesCount + 
    platformsCount + 
    screwCount + 
    toeboardsCount + 
    outriggersCount + 
    laddersCount +
    legHolderCount +
    wallAttachmentCount +
    sideGuardrailsCount;

  // Calculate total scaffolding coverage area
  const totalScaffoldCoverage = area * buildingSides;

  return {
    frames: { quantity: totalFrames, specs: frameSizeDetails.name },
    crossBraces: { quantity: crossBracesCount, specs: "Standard cross braces" },
    guardrails: { quantity: guardrailsCount, specs: "Safety guardrails" },
    basePlates: { quantity: basePlatesCount, specs: "Standard base plates" },
    platforms: { quantity: platformsCount, specs: platformDetails.name },
    screw: { quantity: screwCount, specs: "Adjustable base jacks" },
    toeBoards: { quantity: toeboardsCount, specs: "Safety toe boards" },
    outriggers: { quantity: outriggersCount, specs: "Stabilizing outriggers" },
    ladders: { quantity: laddersCount, specs: "Access ladders" },
    legHolders: { quantity: legHolderCount, specs: "Leg holders"},
    wallAttachments: { quantity: wallAttachmentCount, specs: "Wall attachments"},
    wallAttachmentTieBrackets: { quantity: wallAttachmentCount, specs: "Wall attachments tie brackets"},
    sideGuardrails: { quantity: sideGuardrailsCount, specs: "Side Guardrails"},
    totalComponents,
    weight: Math.round(totalWeight),
    loadCapacity: constants.loadCapacity,
    dimensions: `${wallLength.toFixed(1)}m x ${frameWidth.toFixed(1)}m x ${height.toFixed(1)}m`,
    area: Math.round(area * buildingSides),
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