import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden">
      <div className="absolute inset-0 bg-opacity-60 bg-secondary z-0">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80" 
          alt="Construction site with scaffolding" 
          className="object-cover w-full h-full mix-blend-overlay opacity-30"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Scaffold</span>Pro
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Professional Scaffolding Calculator</h2>
            <p className="text-lg mb-8">
              Plan your construction projects with precision. Our advanced calculator helps you determine the exact scaffolding components needed for any project.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-6 h-auto"
              >
                <a href="#calculator">Try Calculator</a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-white hover:bg-gray-100 text-secondary font-semibold px-6 py-6 h-auto"
              >
                <a href="#waitlist">Join Waitlist</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-2">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded shadow">
                    <h3 className="text-secondary font-semibold mb-2">Project Stats</h3>
                    <p className="text-gray-600">Area: 240m²</p>
                    <p className="text-gray-600">Height: 12m</p>
                    <p className="text-gray-600">Components: 156</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow">
                    <h3 className="text-secondary font-semibold mb-2">Breakdown</h3>
                    <p className="text-gray-600">Standards: 42</p>
                    <p className="text-gray-600">Ledgers: 68</p>
                    <p className="text-gray-600">Platforms: 46</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
