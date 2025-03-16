import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalculatorInputDimensions, CalculatorInputArea, ScaffoldingType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form validation schemas
const dimensionsSchema = z.object({
  length: z.coerce.number().min(1, "Length must be at least 1m"),
  width: z.coerce.number().min(1, "Width must be at least 1m"),
  height: z.coerce.number().min(1, "Height must be at least 1m"),
  type: z.enum(["system", "frame", "tube"]),
});

const areaSchema = z.object({
  area: z.coerce.number().min(1, "Area must be at least 1m²"),
  height: z.coerce.number().min(1, "Height must be at least 1m"),
  type: z.enum(["system", "frame", "tube"]),
});

type DimensionsFormData = z.infer<typeof dimensionsSchema>;
type AreaFormData = z.infer<typeof areaSchema>;

interface CalculatorFormProps {
  onDimensionsCalculate: (data: CalculatorInputDimensions) => void;
  onAreaCalculate: (data: CalculatorInputArea) => void;
}

export default function CalculatorForm({ 
  onDimensionsCalculate, 
  onAreaCalculate 
}: CalculatorFormProps) {
  const [activeTab, setActiveTab] = useState<string>("dimensions");

  // Dimensions form
  const dimensionsForm = useForm<DimensionsFormData>({
    resolver: zodResolver(dimensionsSchema),
    defaultValues: {
      length: undefined,
      width: undefined,
      height: undefined,
      type: "system",
    },
  });

  // Area form
  const areaForm = useForm<AreaFormData>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      area: undefined,
      height: undefined,
      type: "system",
    },
  });

  const handleDimensionsSubmit = (data: DimensionsFormData) => {
    onDimensionsCalculate(data);
  };

  const handleAreaSubmit = (data: AreaFormData) => {
    onAreaCalculate(data);
  };

  return (
    <div className="mb-8">
      <Tabs 
        defaultValue="dimensions" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dimensions">
          <Form {...dimensionsForm}>
            <form 
              onSubmit={dimensionsForm.handleSubmit(handleDimensionsSubmit)} 
              className="grid md:grid-cols-2 gap-6"
            >
              <FormField
                control={dimensionsForm.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter length" 
                        {...field}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={dimensionsForm.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter width" 
                        {...field}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={dimensionsForm.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter height" 
                        {...field}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={dimensionsForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scaffolding Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scaffolding type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="system">System Scaffolding</SelectItem>
                        <SelectItem value="frame">Frame Scaffolding</SelectItem>
                        <SelectItem value="tube">Tube and Coupler</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white font-semibold w-full py-6 h-auto"
                >
                  Calculate Required Components
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="area">
          <Form {...areaForm}>
            <form 
              onSubmit={areaForm.handleSubmit(handleAreaSubmit)} 
              className="grid md:grid-cols-2 gap-6"
            >
              <FormField
                control={areaForm.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (m²)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter total area" 
                        {...field}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={areaForm.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter height" 
                        {...field}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={areaForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scaffolding Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scaffolding type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="system">System Scaffolding</SelectItem>
                        <SelectItem value="frame">Frame Scaffolding</SelectItem>
                        <SelectItem value="tube">Tube and Coupler</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white font-semibold w-full py-6 h-auto"
                >
                  Calculate Required Components
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
