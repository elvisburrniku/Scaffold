import { SCAFFOLDING_TYPES } from "@/lib/constants";

export default function ScaffoldingTypesSection() {
  return (
    <section id="types" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scaffolding Types</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about the different types of scaffolding systems and their applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SCAFFOLDING_TYPES.map((type, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={type.image} 
                  alt={type.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{type.name}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1"><span className="font-medium">Best for:</span> {type.bestFor}</p>
                  <p className="mb-1"><span className="font-medium">Assembly speed:</span> {type.assemblySpeed}</p>
                  <p><span className="font-medium">Adaptability:</span> {type.adaptability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
