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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPNG}>
          <Image className="w-4 h-4 mr-2" />
          Download PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportSVG}>
          <Image className="w-4 h-4 mr-2" />
          Download SVG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Download CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
