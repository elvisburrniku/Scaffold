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
  wallLength: number,
  height: number,
  frameWidthCm: number,
  platformLengthCm: number,
  workLevels: number,
  addTopGuardrails: boolean = true
) {
  const frameWidthM = frameWidthCm / 100;
  const platformLengthM = platformLengthCm / 100;

  const framesPerLevel = Math.ceil(wallLength / frameWidthM) + 1;
  const totalFrames = framesPerLevel * workLevels;

  const baysPerLevel = framesPerLevel - 1;
  const totalBraces = baysPerLevel * workLevels * 2;

  const platformsPerBay = 3;
  const totalPlatforms = baysPerLevel * platformsPerBay * workLevels;

  const totalJacks = framesPerLevel;

  let guardrailPosts = 0;
  let sideGuardrails = 0;
  let endGuardrails = 0;

  if (addTopGuardrails) {
    guardrailPosts = framesPerLevel;
    sideGuardrails = baysPerLevel * 2;
    endGuardrails = 4; // 2 ends × 2 guardrails
  }

  const wallAttachmentsPerLevel = Math.ceil(wallLength / 4);
  const totalWallAttachments = wallAttachmentsPerLevel * workLevels;

  return {
    frames: { quantity: totalFrames, specs: `Frames ${(frameWidthCm / 2.54).toFixed(0)} in` },
    braces: { quantity: totalBraces, specs: `Braces standard` },
    platforms: { quantity: totalPlatforms, specs: `Platforms ${(platformLengthCm / 30.48).toFixed(0)} ft plywood` },
    levellingJacks: { quantity: totalJacks, specs: "Levelling jacks standard" },
    guardrailPosts: { quantity: guardrailPosts, specs: "Guardrail posts standard" },
    sideGuardrails: { quantity: sideGuardrails, specs: "Side guardrails standard" },
    endGuardrails: { quantity: endGuardrails, specs: "End guardrails standard" },
    wallAttachments: { quantity: totalWallAttachments, specs: "Wall attachments standard" },
    totalComponents:
      totalFrames +
      totalBraces +
      totalPlatforms +
      totalJacks +
      guardrailPosts +
      sideGuardrails +
      endGuardrails +
      totalWallAttachments,
    dimensions: {
      length: wallLength.toFixed(2) + ' m',
      height: height.toFixed(2) + ' m',
      frameSize: `${(frameWidthCm / 2.54).toFixed(0)} in × ${(frameWidthCm / 2.54).toFixed(0)} in`,
      platformLength: (platformLengthCm / 30.48).toFixed(0) + ' ft'
    }
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