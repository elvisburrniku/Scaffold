import { ScaffoldingType } from "@shared/schema";

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

export const SCAFFOLDING_TYPES = [
  {
    name: "System Scaffolding",
    description: "Modular system with standardized components that connect easily, providing high versatility and quick assembly times.",
    bestFor: "Complex structures, irregular facades",
    assemblySpeed: "Fast",
    adaptability: "High",
    image: "https://images.unsplash.com/photo-1578575436955-ef29da568c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Frame Scaffolding",
    description: "Prefabricated frames connected by cross braces, offering stability and straightforward assembly for standard projects.",
    bestFor: "Residential, straightforward facades",
    assemblySpeed: "Medium",
    adaptability: "Medium",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Tube and Coupler",
    description: "Highly adaptable system using individual tubes connected with couplers, ideal for complex or unusual structures.",
    bestFor: "Complex, non-standard structures",
    assemblySpeed: "Slow",
    adaptability: "Very High",
    image: "https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
  }
];

// Constants for calculation ratios based on scaffolding type
export const CALCULATION_CONSTANTS: Record<ScaffoldingType, {
  standardsPerArea: number;
  standardsSpecs: string;
  ledgersPerArea: number;
  ledgersSpecs: string;
  transomPerArea: number;
  transomSpecs: string;
  guardrailsPerPerimeter: number;
  guardrailsSpecs: string;
  toeboardsPerPerimeter: number;
  toeboardsSpecs: string;
  platformsPerArea: number;
  platformsSpecs: string;
  couplersPerStandard: number;
  couplersSpecs: string;
  weightPerComponent: Record<string, number>;
  loadCapacity: number;
  safetyFactor: number;
}> = {
  "system": {
    standardsPerArea: 0.175, // 1 standard per 5.7m²
    standardsSpecs: "3m x 48.3mm",
    ledgersPerArea: 0.28, // 1 ledger per 3.5m²
    ledgersSpecs: "2.4m x 48.3mm",
    transomPerArea: 0.22, // 1 transom per 4.5m²
    transomSpecs: "1.2m",
    guardrailsPerPerimeter: 0.8, // 2 per side with adjustments
    guardrailsSpecs: "2.4m",
    toeboardsPerPerimeter: 0.8, // 1 per side with adjustments
    toeboardsSpecs: "2.4m x 150mm",
    platformsPerArea: 0.19, // 1 platform per 5.2m²
    platformsSpecs: "2.4m x 0.6m",
    couplersPerStandard: 3, // Average number of couplers per standard
    couplersSpecs: "Standard",
    weightPerComponent: {
      standard: 15, // kg
      ledger: 7,
      transom: 5,
      guardRail: 6,
      toeboard: 4,
      platform: 20,
      coupler: 1.2,
      basePlate: 2
    },
    loadCapacity: 750, // kg/m²
    safetyFactor: 1.5
  },
  "frame": {
    standardsPerArea: 0.2, // 1 standard per 5m²
    standardsSpecs: "2.5m x 60mm",
    ledgersPerArea: 0.3, // 1 ledger per 3.3m²
    ledgersSpecs: "2.4m x 48.3mm",
    transomPerArea: 0.25, // 1 transom per 4m²
    transomSpecs: "1.2m",
    guardrailsPerPerimeter: 0.85, // 2 per side with adjustments
    guardrailsSpecs: "2.4m",
    toeboardsPerPerimeter: 0.85,
    toeboardsSpecs: "2.4m x 150mm",
    platformsPerArea: 0.2, // 1 platform per 5m²
    platformsSpecs: "2.4m x 0.6m",
    couplersPerStandard: 2.5,
    couplersSpecs: "Fixed Frame",
    weightPerComponent: {
      standard: 18, // kg
      ledger: 7.5,
      transom: 5.5,
      guardRail: 6.5,
      toeboard: 4.5,
      platform: 22,
      coupler: 1.5,
      basePlate: 2.5
    },
    loadCapacity: 675, // kg/m²
    safetyFactor: 1.4
  },
  "tube": {
    standardsPerArea: 0.22, // 1 standard per 4.5m²
    standardsSpecs: "3m x 48.3mm",
    ledgersPerArea: 0.33, // 1 ledger per 3m²
    ledgersSpecs: "3m x 48.3mm",
    transomPerArea: 0.28, // 1 transom per 3.5m²
    transomSpecs: "1.5m",
    guardrailsPerPerimeter: 0.9, // 2 per side with adjustments
    guardrailsSpecs: "3m",
    toeboardsPerPerimeter: 0.9,
    toeboardsSpecs: "3m x 150mm",
    platformsPerArea: 0.2, // 1 platform per 5m²
    platformsSpecs: "3m x 0.6m",
    couplersPerStandard: 4.5, // More couplers for tube and coupler systems
    couplersSpecs: "Swivel",
    weightPerComponent: {
      standard: 16, // kg
      ledger: 8,
      transom: 6,
      guardRail: 7,
      toeboard: 5,
      platform: 24,
      coupler: 1.8,
      basePlate: 3
    },
    loadCapacity: 600, // kg/m²
    safetyFactor: 1.6
  }
};
