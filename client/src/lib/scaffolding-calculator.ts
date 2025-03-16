// Scaffolding component interfaces
export interface ScaffoldingComponent {
  name: string;
  quantity: number;
  unit: string;
  description?: string;
}

export interface ScaffoldingResult {
  components: ScaffoldingComponent[];
  totalArea: number;
  scaffoldingType: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export type ScaffoldingType = 'frame' | 'tube' | 'system';

// Constants for calculation
const STANDARDS_SPACING = 2.0; // meters
const LEDGER_SPACING = 2.0; // meters
const TRANSOM_SPACING = 0.6; // meters
const PLATFORM_WIDTH = 0.6; // meters - standard platform width

// Main calculator function
export function calculateScaffolding(
  dimensions: { length?: number; width?: number; height?: number; area?: number },
  scaffoldingType: ScaffoldingType
): ScaffoldingResult {
  // Determine dimensions if only area is provided
  let length = dimensions.length || 0;
  let width = dimensions.width || 0;
  let height = dimensions.height || 0;
  let area = dimensions.area || 0;

  // If area is provided but not dimensions, estimate dimensions
  if (area > 0 && (!length || !width)) {
    // Assuming a rectangular shape with aspect ratio of 2:1
    length = Math.sqrt(area * 2);
    width = length / 2;
  } else if (length && width) {
    area = length * width;
  }

  if (height <= 0) {
    height = 3; // Default height if not provided
  }

  // Calculate components based on scaffolding type and dimensions
  const components: ScaffoldingComponent[] = [];

  // Number of standards (vertical posts)
  const lengthPositions = Math.ceil(length / STANDARDS_SPACING) + 1;
  const widthPositions = Math.ceil(width / STANDARDS_SPACING) + 1;
  const standardsQuantity = lengthPositions * widthPositions;
  
  components.push({
    name: "Standards (Vertical Posts)",
    quantity: standardsQuantity,
    unit: "units",
    description: "Main vertical support elements"
  });

  // Number of ledgers (horizontal braces)
  const ledgerLevels = Math.ceil(height / LEDGER_SPACING) + 1;
  const ledgersLength = lengthPositions * (ledgerLevels);
  const ledgersWidth = widthPositions * (ledgerLevels);
  const ledgersQuantity = ledgersLength + ledgersWidth;
  
  components.push({
    name: "Ledgers (Horizontal Braces)",
    quantity: ledgersQuantity,
    unit: "units",
    description: "Horizontal support elements"
  });

  // Number of transoms (cross braces)
  const transomPositions = Math.ceil(length / TRANSOM_SPACING);
  const transomRows = widthPositions - 1;
  const transomLevels = Math.ceil(height / LEDGER_SPACING);
  const transomQuantity = transomPositions * transomRows * transomLevels;
  
  components.push({
    name: "Transoms (Cross Braces)",
    quantity: transomQuantity,
    unit: "units",
    description: "Support cross beams for platforms"
  });

  // Base plates
  components.push({
    name: "Base Plates",
    quantity: standardsQuantity,
    unit: "units",
    description: "Foundation support for standards"
  });

  // Guard rails
  // Generally 2 levels of rails on the outer perimeter
  const guardrailLength = length * 2; // both sides
  const guardrailWidth = width * 2; // both sides
  const guardrailPerimeter = (guardrailLength + guardrailWidth) * 2; // 2 levels of rails
  const guardrailQuantity = Math.ceil(guardrailPerimeter / 2); // 2m standard length
  
  components.push({
    name: "Guard Rails",
    quantity: guardrailQuantity,
    unit: "units",
    description: "Safety rails on the outer edges"
  });

  // Toe boards (perimeter of each level)
  const toeboardPerimeter = (length + width) * 2;
  const toeboardQuantity = Math.ceil(toeboardPerimeter / 2); // 2m standard length
  
  components.push({
    name: "Toe Boards",
    quantity: toeboardQuantity,
    unit: "units",
    description: "Edge protection to prevent falling objects"
  });

  // Platforms/Decking
  const platformLevels = Math.ceil(height / LEDGER_SPACING);
  const platformArea = length * width * platformLevels;
  
  components.push({
    name: "Platforms/Decking",
    quantity: Number(platformArea.toFixed(2)),
    unit: "m²",
    description: "Working surfaces at different heights"
  });

  // Couplers/Connectors (estimate based on number of components)
  const couplerEstimate = (standardsQuantity + ledgersQuantity + transomQuantity) * 1.5;
  
  components.push({
    name: "Couplers/Connectors",
    quantity: Math.ceil(couplerEstimate),
    unit: "units",
    description: "Connect and secure scaffolding components"
  });

  // Adjust quantities based on scaffolding type
  if (scaffoldingType === 'frame') {
    // Frame scaffolding uses fewer couplers but more prefabricated parts
    components.find(c => c.name === "Couplers/Connectors")!.quantity = 
      Math.ceil(components.find(c => c.name === "Couplers/Connectors")!.quantity * 0.6);
  } else if (scaffoldingType === 'tube') {
    // Tube and coupler uses more couplers
    components.find(c => c.name === "Couplers/Connectors")!.quantity = 
      Math.ceil(components.find(c => c.name === "Couplers/Connectors")!.quantity * 1.3);
  }

  return {
    components,
    totalArea: Number(area.toFixed(2)),
    scaffoldingType,
    dimensions: {
      length: Number(length.toFixed(2)),
      width: Number(width.toFixed(2)),
      height: Number(height.toFixed(2))
    }
  };
}
