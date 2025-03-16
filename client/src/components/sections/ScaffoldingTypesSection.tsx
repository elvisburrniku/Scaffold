import { FRAME_SIZES } from "@/lib/constants";
import { FrameSize } from "@shared/schema";

export default function ScaffoldingTypesSection() {
  // Convert the FRAME_SIZES record to an array for mapping
  const frameSizesArray = Object.entries(FRAME_SIZES).map(([key, value]) => ({
    id: key,
    ...value
  }));

  return (
    <section id="types" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mason Frame Sizes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the right frame size for your scaffolding requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {frameSizesArray.map((frame, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-100">
                <div className="p-4 border-2 border-gray-300 rounded" style={{ 
                  width: `${Math.min(160, frame.dimensions.width / 1.2)}px`, 
                  height: `${Math.min(120, frame.dimensions.height / 1.5)}px` 
                }}>
                  <p className="text-gray-500 text-xs text-center">
                    {frame.dimensions.width} × {frame.dimensions.height} cm
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{frame.name}</h3>
                <p className="text-gray-600 mb-4">{frame.description}</p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1"><span className="font-medium">Width:</span> {frame.dimensions.width} cm</p>
                  <p className="mb-1"><span className="font-medium">Height:</span> {frame.dimensions.height} cm</p>
                  <p><span className="font-medium">Weight:</span> {frame.weightKg} kg</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
