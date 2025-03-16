import React from 'react';
import { ScaffoldingResult } from './scaffolding-calculator';

interface ScaffoldingVisualizationProps {
  result: ScaffoldingResult;
  className?: string;
}

// A simple scaffold visualization using SVG
const ScaffoldingVisualization: React.FC<ScaffoldingVisualizationProps> = ({ result, className }) => {
  const { dimensions, scaffoldingType } = result;
  
  if (!dimensions) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center text-gray-400">
          <p>Insufficient data for visualization</p>
        </div>
      </div>
    );
  }

  // Normalize dimensions for SVG viewport
  const maxDimension = Math.max(dimensions.length, dimensions.width, dimensions.height);
  const scale = 180 / maxDimension;
  
  const svgWidth = dimensions.length * scale;
  const svgHeight = dimensions.height * scale;
  const svgDepth = dimensions.width * scale;
  
  // Calculate number of standards based on dimensions
  const standardsSpacing = 2.0; // meters
  const lengthPositions = Math.ceil(dimensions.length / standardsSpacing) + 1;
  const widthPositions = Math.ceil(dimensions.width / standardsSpacing) + 1;
  
  // Calculate ledger levels
  const ledgerSpacing = 2.0; // meters
  const ledgerLevels = Math.ceil(dimensions.height / ledgerSpacing) + 1;
  
  // Colors based on scaffolding type
  let standardColor = '#555';
  let ledgerColor = '#777';
  let platformColor = '#F5A623';
  
  if (scaffoldingType === 'frame') {
    standardColor = '#3498DB';
    ledgerColor = '#2980B9';
  } else if (scaffoldingType === 'tube') {
    standardColor = '#E74C3C';
    ledgerColor = '#C0392B';
  } else if (scaffoldingType === 'system') {
    standardColor = '#27AE60';
    ledgerColor = '#229954';
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${svgWidth + svgDepth * 0.5} ${svgHeight + svgDepth * 0.3}`} 
        preserveAspectRatio="xMidYMid meet"
        className="shadow-inner border border-gray-200 rounded-md bg-white"
      >
        {/* Grid for reference */}
        <defs>
          <pattern id="grid" width={standardsSpacing * scale} height={standardsSpacing * scale} patternUnits="userSpaceOnUse">
            <path d={`M ${standardsSpacing * scale} 0 L 0 0 0 ${standardsSpacing * scale}`} fill="none" stroke="#eee" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Draw standards (vertical posts) */}
        {Array.from({ length: lengthPositions }).map((_, xIdx) => 
          Array.from({ length: widthPositions }).map((_, zIdx) => {
            const x = xIdx * (svgWidth / (lengthPositions - 1));
            const z = zIdx * (svgDepth / (widthPositions - 1));
            const isometric_x = x + z * 0.5;
            const isometric_z = z * 0.3;
            
            return (
              <line 
                key={`standard-${xIdx}-${zIdx}`}
                x1={isometric_x} 
                y1={isometric_z} 
                x2={isometric_x} 
                y2={svgHeight + isometric_z} 
                stroke={standardColor} 
                strokeWidth="3"
              />
            );
          })
        )}
        
        {/* Draw ledgers (horizontal connecting pieces) */}
        {Array.from({ length: ledgerLevels }).map((_, yIdx) => {
          const y = yIdx * (svgHeight / (ledgerLevels - 1));
          
          return (
            <React.Fragment key={`ledger-level-${yIdx}`}>
              {/* Ledgers along length */}
              {Array.from({ length: widthPositions }).map((_, zIdx) => {
                const z = zIdx * (svgDepth / (widthPositions - 1));
                const isometric_z = z * 0.3;
                
                return (
                  <line 
                    key={`ledger-length-${yIdx}-${zIdx}`}
                    x1={z * 0.5} 
                    y1={y + isometric_z} 
                    x2={svgWidth + z * 0.5} 
                    y2={y + isometric_z} 
                    stroke={ledgerColor} 
                    strokeWidth="2"
                  />
                );
              })}
              
              {/* Ledgers along width */}
              {Array.from({ length: lengthPositions }).map((_, xIdx) => {
                const x = xIdx * (svgWidth / (lengthPositions - 1));
                
                return (
                  <line 
                    key={`ledger-width-${yIdx}-${xIdx}`}
                    x1={x} 
                    y1={y} 
                    x2={x + svgDepth * 0.5} 
                    y2={y + svgDepth * 0.3} 
                    stroke={ledgerColor} 
                    strokeWidth="2"
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        
        {/* Draw platforms at each level except the ground */}
        {Array.from({ length: ledgerLevels - 1 }).map((_, yIdx) => {
          // Skip the ground level platform (yIdx === 0)
          if (yIdx === 0) return null;
          
          const y = yIdx * (svgHeight / (ledgerLevels - 1));
          const platform_opacity = 0.4; // Make platforms semi-transparent
          
          return (
            <polygon 
              key={`platform-${yIdx}`}
              points={`
                0,${y} 
                ${svgWidth},${y} 
                ${svgWidth + svgDepth * 0.5},${y + svgDepth * 0.3} 
                ${svgDepth * 0.5},${y + svgDepth * 0.3}
              `}
              fill={platformColor}
              fillOpacity={platform_opacity}
              stroke={platformColor}
              strokeWidth="1"
            />
          );
        })}
        
        {/* Draw guardrails on the top level */}
        {(() => {
          const topY = (ledgerLevels - 1) * (svgHeight / (ledgerLevels - 1));
          const railHeight = 1.0 * scale;
          
          return (
            <>
              {/* Front guardrail */}
              <line 
                x1={0} 
                y1={topY - railHeight} 
                x2={svgWidth} 
                y2={topY - railHeight} 
                stroke="#FF6B00"
                strokeWidth="2"
              />
              
              {/* Right guardrail */}
              <line 
                x1={svgWidth} 
                y1={topY - railHeight} 
                x2={svgWidth + svgDepth * 0.5} 
                y2={topY - railHeight + svgDepth * 0.3} 
                stroke="#FF6B00"
                strokeWidth="2"
              />
              
              {/* Back guardrail */}
              <line 
                x1={svgWidth + svgDepth * 0.5} 
                y1={topY - railHeight + svgDepth * 0.3} 
                x2={svgDepth * 0.5} 
                y2={topY - railHeight + svgDepth * 0.3} 
                stroke="#FF6B00"
                strokeWidth="2"
              />
              
              {/* Left guardrail */}
              <line 
                x1={svgDepth * 0.5} 
                y1={topY - railHeight + svgDepth * 0.3} 
                x2={0} 
                y2={topY - railHeight} 
                stroke="#FF6B00"
                strokeWidth="2"
              />
            </>
          );
        })()}
        
        {/* Add scaffolding type label */}
        <text 
          x="10" 
          y="20" 
          fontSize="12"
          fill="#333"
          fontWeight="bold"
        >
          {scaffoldingType.charAt(0).toUpperCase() + scaffoldingType.slice(1)} Scaffolding
        </text>
        
        {/* Add dimensions */}
        <text 
          x="10" 
          y="40" 
          fontSize="10"
          fill="#333"
        >
          {dimensions.length}m × {dimensions.width}m × {dimensions.height}m
        </text>
      </svg>
    </div>
  );
};

export default ScaffoldingVisualization;
