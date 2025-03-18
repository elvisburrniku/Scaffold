import { FrameSize, PlatformLength, ScaffoldingType } from "@shared/schema";

export const FEATURES = [
  {
    icon: "calculator",
    title: "Precise Calculations",
    description: "Get accurate component counts based on industry-standard calculations for any project size."
  },
  {
    icon: "eye",
    title: "Visual Representation",
    description: "See a visual representation of your scaffolding structure to verify arrangements."
  },
  {
    icon: "file-export",
    title: "Export & Share",
    description: "Save, print, or share your calculation results with team members and clients."
  },
  {
    icon: "mobile-alt",
    title: "Mobile Friendly",
    description: "Access your scaffolding calculator from any device, anywhere on the job site."
  },
  {
    icon: "weight-hanging",
    title: "Load Calculations",
    description: "Ensure safety with integrated load and weight calculations for your structure."
  },
  {
    icon: "clipboard-list",
    title: "Component Inventory",
    description: "Get detailed breakdowns of all required parts with specifications and quantities."
  }
];

export const FRAME_SIZES: Record<FrameSize, { 
  name: string,
  description: string, 
  dimensions: { 
    width: number, 
    height: number
  }, 
  weightKg: number
}> = {
  "mason-frame-91x152": {
    name: "Mason Frame 91.44 cm x 152.4 cm",
    description: "Compact mason frame ideal for limited-space applications",
    dimensions: { width: 91.44, height: 152.4 },
    weightKg: 15.2
  },
  "mason-frame-152x152": {
    name: "Mason Frame 152.4 x 152.4 cm",
    description: "Square mason frame with versatile application potential",
    dimensions: { width: 152.4, height: 152.4 },
    weightKg: 18.5
  },
  "mason-frame-183x152": {
    name: "Mason Frame 182.88 × 152.40 cm",
    description: "Extended width mason frame for larger spans",
    dimensions: { width: 182.88, height: 152.4 },
    weightKg: 22.1
  },
  "mason-frame-193x152": {
    name: "Mason Frame 193.04 cm x 152.4 cm",
    description: "Wide mason frame for maximum horizontal coverage",
    dimensions: { width: 193.04, height: 152.4 },
    weightKg: 23.4
  },
  "mason-frame-193x91": {
    name: "Mason Frame 193.04 x 91.44 cm",
    description: "Low-height wide-span mason frame",
    dimensions: { width: 193.04, height: 91.44 },
    weightKg: 19.8
  },
  "mason-frame-193x107": {
    name: "Mason Frame 193.04 cm x 106.68 cm",
    description: "Mid-height wide-span mason frame",
    dimensions: { width: 193.04, height: 106.68 },
    weightKg: 21.2
  },
  "mason-frame-198x152": {
    name: "Mason Frame 198.12 x 152.4 cm",
    description: "Extra-wide mason frame for maximum coverage",
    dimensions: { width: 198.12, height: 152.4 },
    weightKg: 24.3
  },
  "mason-frame-220x70": {
    name: "Mason Frame 220 x 0.70 cm",
    description: "Specialized narrow mason frame for unique applications",
    dimensions: { width: 220, height: 70 },
    weightKg: 18.7
  }
};

export const PLATFORM_LENGTHS: Record<PlatformLength, {
  name: string,
  description: string,
  lengthCm: number,
  widthCm: number,
  weightKg: number
}> = {
  "platform-213": {
    name: "213.36 cm Plywood Platform",
    description: "Standard-length platform for most applications",
    lengthCm: 213.36,
    widthCm: 60,
    weightKg: 15.5
  },
  "platform-244": {
    name: "243.84 cm Plywood Platform",
    description: "Extended-length platform for medium spans",
    lengthCm: 243.84,
    widthCm: 60,
    weightKg: 17.8
  },
  "platform-250": {
    name: "250 cm Plywood Platform",
    description: "Metric standard platform for European specifications",
    lengthCm: 250,
    widthCm: 60,
    weightKg: 18.5
  },
  "platform-305": {
    name: "304.8 cm Plywood Platform",
    description: "Maximum-length platform for long spans",
    lengthCm: 304.8,
    widthCm: 60,
    weightKg: 22.3
  }
};

export const CALCULATION_CONSTANTS: Record<ScaffoldingType, {
  framesPerMeter: number;
  crossBracesPerFrame: number;
  guardrailsPerMeter: number;
  basePlatesPerFrame: number;
  platformsPerMeter: number;
  screwJacksPerFrame: number;
  toeboardsPerMeter: number;
  outriggersPerSide: number;
  laddersPerLevel: number;
  weightPerComponent: Record<string, number>;
  loadCapacity: number;
  safetyFactor: number;
}> = {
  "mason-frame": {
    framesPerMeter: 0.4,  // Frames per meter of wall length
    crossBracesPerFrame: 1.0,  // Cross braces per frame
    guardrailsPerMeter: 0.85,  // Guardrails per meter of wall length
    basePlatesPerFrame: 2.0,   // Base plates per frame
    platformsPerMeter: 0.5,    // Platforms per meter of wall length
    screwJacksPerFrame: 2.0,   // Screw jacks per frame
    toeboardsPerMeter: 0.5,    // Toe boards per meter of wall length
    outriggersPerSide: 0.15,   // Outriggers per meter of wall length
    laddersPerLevel: 0.5,      // Ladders per level (typically 1 ladder per 2 sections)
    weightPerComponent: {
      frame: 20,         // Average weight in kg
      crossBrace: 5,
      guardrail: 4,
      basePlate: 2.5,
      platform: 20,
      screwJack: 3,
      toeboard: 4,
      outrigger: 8,
      ladder: 15,
      legHolder: 2.5,
      wallAttachment: 0.5,
      sideGuardrail: 4.5,
    },
    loadCapacity: 675,  // kg/m²
    safetyFactor: 1.4
  }
};
