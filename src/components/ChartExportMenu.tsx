import { Download, Image, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportChartAsImage } from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ChartExportMenuProps {
  chartRef: React.RefObject<HTMLDivElement>;
  data: Record<string, unknown>[];
  filename: string;
}

export const ChartExportMenu = ({ chartRef, data, filename }: ChartExportMenuProps) => {
  const { toast } = useToast();

  const handleExportPNG = async () => {
    await exportChartAsImage(chartRef.current, filename, "png");
    toast({ title: "Exported", description: `${filename}.png downloaded` });
  };

  const handleExportSVG = async () => {
    await exportChartAsImage(chartRef.current, filename, "svg");
    toast({ title: "Exported", description: `${filename}.svg downloaded` });
  };

  const handleExportCSV = () => {
    exportToCSV(data, filename);
    toast({ title: "Exported", description: `${filename}.csv downloaded` });
  };
