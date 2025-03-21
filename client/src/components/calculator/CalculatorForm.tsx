
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalculatorInputDimensions,
  CalculatorInputArea,
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

// Form validation schemas
const dimensionsSchema = z.object({
  frameSize: z.enum([
    "mason-frame-91x152",
    "mason-frame-152x152",
    "mason-frame-183x152",
    "mason-frame-193x152",
    "mason-frame-193x91",
    "mason-frame-193x107",
    "mason-frame-198x152",
    "mason-frame-220x70",
  ] as const),
  platformLength: z.enum([
    "platform-213",
    "platform-244",
    "platform-250",
    "platform-305",
  ] as const),
  workLevels: z.coerce.number().min(1).max(5),
  buildingSides: z.coerce.number().min(1).max(4),
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
    "mason-frame-220x70",
  ] as const),
  platformLength: z.enum([
    "platform-213",
    "platform-244",
    "platform-250",
    "platform-305",
  ] as const),
  workLevels: z.coerce.number().min(1).max(5),
  buildingSides: z.coerce.number().min(1).max(4),
});

interface SideDimension {
  width: number;
  height: number;
}

interface CalculatorFormProps {
  onDimensionsCalculate: (data: CalculatorInputDimensions) => void;
  onAreaCalculate: (data: CalculatorInputArea) => void;
}

export default function CalculatorForm({
  onDimensionsCalculate,
  onAreaCalculate,
}: CalculatorFormProps) {
  const [activeTab, setActiveTab] = useState<string>("dimensions");
  const [sideDimensions, setSideDimensions] = useState<SideDimension[]>([
    { width: 0, height: 0 },
  ]);

  const dimensionsForm = useForm<z.infer<typeof dimensionsSchema>>({
    resolver: zodResolver(dimensionsSchema),
    defaultValues: {
      frameSize: "mason-frame-152x152",
      platformLength: "platform-244",
      workLevels: 1,
      buildingSides: 1,
    },
  });

  const areaForm = useForm<z.infer<typeof areaSchema>>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      area: 0,
      height: 0,
      frameSize: "mason-frame-152x152",
      platformLength: "platform-244",
      workLevels: 1,
      buildingSides: 4,
    },
  });

  // Update side dimensions when building sides changes
  const watchBuildingSides = dimensionsForm.watch("buildingSides");
  useEffect(() => {
    const newSides = Array(watchBuildingSides)
      .fill(null)
      .map((_, i) => sideDimensions[i] || { width: 0, height: 0 });
    // setSideDimensions(newSides);
  }, [watchBuildingSides]);

  const handleDimensionsSubmit = (data: z.infer<typeof dimensionsSchema>) => {
    onDimensionsCalculate({
      ...data,
      sides: sideDimensions,
    });
  };

  const handleAreaSubmit = (data: z.infer<typeof areaSchema>) => {
    onAreaCalculate(data);
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="dimensions"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-1 w-full max-w-md mb-6">
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions">
          <Form {...dimensionsForm}>
            <form
              onSubmit={dimensionsForm.handleSubmit(handleDimensionsSubmit)}
              className="grid md:grid-cols-2 gap-6"
            >
              {sideDimensions.map((side, index) => (
                <div
                  key={index}
                  className="col-span-2 grid grid-cols-2 gap-4 rounded-lg"
                >
                  <div>
                    <FormLabel>Width (m)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter width"
                      value={side.width || ""}
                      onChange={(e) => {
                        const newSides = [...sideDimensions];
                        newSides[index].width = parseFloat(e.target.value);
                        setSideDimensions(newSides);
                      }}
                      min="1"
                    />
                  </div>
                  <div>
                    <FormLabel>Height (m)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter height"
                      value={side.height || ""}
                      onChange={(e) => {
                        const newSides = [...sideDimensions];
                        newSides[index].height = parseFloat(e.target.value);
                        setSideDimensions(newSides);
                      }}
                      min="1"
                    />
                  </div>
                </div>
              ))}

              {/* Form fields for dimensions */}
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
                        {/* Frame size options */}
                        <SelectItem value="mason-frame-91x152">
                          Mason Frame 91.44 cm x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-152x152">
                          Mason Frame 152.4 x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-183x152">
                          Mason Frame 182.88 × 152.40 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x152">
                          Mason Frame 193.04 cm x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x91">
                          Mason Frame 193.04 x 91.44 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x107">
                          Mason Frame 193.04 cm x 106.68 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-198x152">
                          Mason Frame 198.12 x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-220x70">
                          Mason Frame 220 x 70 cm
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rest of the form fields */}
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
                        <SelectItem value="platform-213">
                          213.36 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-244">
                          243.84 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-250">
                          250 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-305">
                          304.8 cm Plywood Platform
                        </SelectItem>
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

              <FormField
                control={dimensionsForm.control}
                name="buildingSides"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Sides</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of sides" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 side (single wall)</SelectItem>
                        <SelectItem value="2">
                          2 sides (L-shaped corner)
                        </SelectItem>
                        <SelectItem value="3">
                          3 sides (U-shaped structure)
                        </SelectItem>
                        <SelectItem value="4">
                          4 sides (complete perimeter)
                        </SelectItem>
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
                        value={field.value || ""}
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
                        value={field.value || ""}
                        min="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Frame Size field */}
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
                        <SelectItem value="mason-frame-91x152">
                          Mason Frame 91.44 cm x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-152x152">
                          Mason Frame 152.4 x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-183x152">
                          Mason Frame 182.88 × 152.40 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x152">
                          Mason Frame 193.04 cm x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x91">
                          Mason Frame 193.04 x 91.44 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-193x107">
                          Mason Frame 193.04 cm x 106.68 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-198x152">
                          Mason Frame 198.12 x 152.4 cm
                        </SelectItem>
                        <SelectItem value="mason-frame-220x70">
                          Mason Frame 220 x 70 cm
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Platform Length field */}
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
                        <SelectItem value="platform-213">
                          213.36 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-244">
                          243.84 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-250">
                          250 cm Plywood Platform
                        </SelectItem>
                        <SelectItem value="platform-305">
                          304.8 cm Plywood Platform
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Work Levels field */}
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

              {/* Building Sides field */}
              <FormField
                control={areaForm.control}
                name="buildingSides"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Sides</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of sides" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 side (single wall)</SelectItem>
                        <SelectItem value="2">
                          2 sides (L-shaped corner)
                        </SelectItem>
                        <SelectItem value="3">
                          3 sides (U-shaped structure)
                        </SelectItem>
                        <SelectItem value="4">
                          4 sides (complete perimeter)
                        </SelectItem>
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