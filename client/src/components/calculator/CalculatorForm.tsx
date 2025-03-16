import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  CalculatorInputDimensions, 
  CalculatorInputArea, 
  ScaffoldingType, 
  FrameSize, 
  PlatformLength, 
  WorkLevel 
} from "@shared/schema";
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
import { FRAME_SIZES, PLATFORM_LENGTHS } from "@/lib/constants";

// Form validation schemas
const dimensionsSchema = z.object({
  length: z.coerce.number().min(1, "Length must be at least 1m"),
  height: z.coerce.number().min(1, "Height must be at least 1m"),
  frameSize: z.enum([
    "mason-frame-91x152", 
    "mason-frame-152x152", 
    "mason-frame-183x152", 
    "mason-frame-193x152",
    "mason-frame-193x91", 
    "mason-frame-193x107", 
    "mason-frame-198x152",
    "mason-frame-220x70"
  ] as const),
  platformLength: z.enum([
    "platform-213", 
    "platform-244", 
    "platform-250",
    "platform-305"
  ] as const),
  workLevels: z.coerce.number().min(1).max(5)
});

const areaSchema = z.object({
  area: z.coerce.number().min(1, "Area must be at least 1m²"),
  height: z.coerce.number().min(1, "Height must be at least 1m"),
  frameSize: z.enum([
    "mason-frame-91x152", 
    "mason-frame-152x152", 
    "mason-frame-183x152", 
    "mason-frame-193x152",
    "mason-frame-193x91", 
    "mason-frame-193x107", 
    "mason-frame-198x152",
    "mason-frame-220x70"
  ] as const),
  platformLength: z.enum([
    "platform-213", 
    "platform-244", 
    "platform-250",
    "platform-305"
  ] as const),
  workLevels: z.coerce.number().min(1).max(5)
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
      height: undefined,
      frameSize: "mason-frame-152x152",
      platformLength: "platform-244",
      workLevels: 1,
    },
  });

  // Area form
  const areaForm = useForm<AreaFormData>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      area: undefined,
      height: undefined,
      frameSize: "mason-frame-152x152",
      platformLength: "platform-244",
      workLevels: 1,
    },
  });

  const handleDimensionsSubmit = (data: DimensionsFormData) => {
    onDimensionsCalculate(data as unknown as CalculatorInputDimensions);
  };

  const handleAreaSubmit = (data: AreaFormData) => {
    onAreaCalculate(data as unknown as CalculatorInputArea);
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
                    <FormLabel>Wall Length (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter wall length" 
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
                name="frameSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frame Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frame size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mason-frame-91x152">Mason Frame 91.44 cm x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-152x152">Mason Frame 152.4 x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-183x152">Mason Frame 182.88 × 152.40 cm</SelectItem>
                        <SelectItem value="mason-frame-193x152">Mason Frame 193.04 cm x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-193x91">Mason Frame 193.04 x 91.44 cm</SelectItem>
                        <SelectItem value="mason-frame-193x107">Mason Frame 193.04 cm x 106.68 cm</SelectItem>
                        <SelectItem value="mason-frame-198x152">Mason Frame 198.12 x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-220x70">Mason Frame 220 x 0.70 cm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={dimensionsForm.control}
                name="platformLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Length</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="platform-213">213.36 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-244">243.84 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-250">250 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-305">304.8 cm Plywood Platform</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={dimensionsForm.control}
                name="workLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Levels</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work levels" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 working level</SelectItem>
                        <SelectItem value="2">2 working levels</SelectItem>
                        <SelectItem value="3">3 working levels</SelectItem>
                        <SelectItem value="4">4 working levels</SelectItem>
                        <SelectItem value="5">5 working levels</SelectItem>
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
                name="frameSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frame Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frame size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mason-frame-91x152">Mason Frame 91.44 cm x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-152x152">Mason Frame 152.4 x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-183x152">Mason Frame 182.88 × 152.40 cm</SelectItem>
                        <SelectItem value="mason-frame-193x152">Mason Frame 193.04 cm x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-193x91">Mason Frame 193.04 x 91.44 cm</SelectItem>
                        <SelectItem value="mason-frame-193x107">Mason Frame 193.04 cm x 106.68 cm</SelectItem>
                        <SelectItem value="mason-frame-198x152">Mason Frame 198.12 x 152.4 cm</SelectItem>
                        <SelectItem value="mason-frame-220x70">Mason Frame 220 x 0.70 cm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={areaForm.control}
                name="platformLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Length</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="platform-213">213.36 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-244">243.84 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-250">250 cm Plywood Platform</SelectItem>
                        <SelectItem value="platform-305">304.8 cm Plywood Platform</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={areaForm.control}
                name="workLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Levels</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work levels" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 working level</SelectItem>
                        <SelectItem value="2">2 working levels</SelectItem>
                        <SelectItem value="3">3 working levels</SelectItem>
                        <SelectItem value="4">4 working levels</SelectItem>
                        <SelectItem value="5">5 working levels</SelectItem>
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