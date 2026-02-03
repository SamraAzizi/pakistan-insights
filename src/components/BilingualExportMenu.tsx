import { Download, Image, FileSpreadsheet, Languages, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { exportChartAsImage } from "@/lib/exportUtils";
import { exportBilingualCSV, exportBilingualReport, ExportMode } from "@/lib/bilingualExportUtils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface BilingualExportMenuProps {
  chartRef: React.RefObject<HTMLDivElement>;
  data: Record<string, unknown>[];
  filename: string;
  reportTitle?: { en: string; ur: string };
}

export const BilingualExportMenu = ({ 
  chartRef, 
  data, 
  filename,
  reportTitle 
}: BilingualExportMenuProps) => {
  const { toast } = useToast();
  const { isUrdu, t } = useLanguage();

  const handleExportPNG = async () => {
    await exportChartAsImage(chartRef.current, filename, "png");
    toast({ 
      title: isUrdu ? "برآمد" : "Exported", 
      description: isUrdu ? `${filename}.png ڈاؤن لوڈ ہو گئی` : `${filename}.png downloaded` 
    });
  };

  const handleExportSVG = async () => {
    await exportChartAsImage(chartRef.current, filename, "svg");
    toast({ 
      title: isUrdu ? "برآمد" : "Exported", 
      description: isUrdu ? `${filename}.svg ڈاؤن لوڈ ہو گئی` : `${filename}.svg downloaded` 
    });
  };

  const handleExportCSV = (mode: ExportMode) => {
    exportBilingualCSV(data, filename, mode);
    const modeLabel = mode === "bilingual" 
      ? (isUrdu ? "دو زبانی" : "bilingual") 
      : mode === "urdu" 
        ? "اردو" 
        : "English";
    toast({ 
      title: isUrdu ? "برآمد" : "Exported", 
      description: isUrdu 
        ? `${filename} (${modeLabel}) ڈاؤن لوڈ ہو گئی` 
        : `${filename} (${modeLabel}) downloaded` 
    });
  };

  const handleExportReport = (mode: ExportMode) => {
    const title = reportTitle || { 
      en: "Pakistan Data Atlas Report", 
      ur: "پاکستان ڈیٹا اٹلس رپورٹ" 
    };
    exportBilingualReport(data, filename, title, mode);
    const modeLabel = mode === "bilingual" 
      ? (isUrdu ? "دو زبانی" : "bilingual") 
      : mode === "urdu" 
        ? "اردو" 
        : "English";
    toast({ 
      title: isUrdu ? "رپورٹ برآمد" : "Report Exported", 
      description: isUrdu 
        ? `${filename} رپورٹ (${modeLabel}) ڈاؤن لوڈ ہو گئی` 
        : `${filename} report (${modeLabel}) downloaded` 
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`h-8 px-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Download className={`w-4 h-4 ${isUrdu ? 'ml-1' : 'mr-1'}`} />
          {isUrdu ? "برآمد" : "Export"}
          <ChevronDown className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'} opacity-50`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Image exports */}
        <DropdownMenuItem onClick={handleExportPNG} className={isUrdu ? 'flex-row-reverse' : ''}>
          <Image className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
          {isUrdu ? "PNG ڈاؤن لوڈ" : "Download PNG"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportSVG} className={isUrdu ? 'flex-row-reverse' : ''}>
          <Image className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
          {isUrdu ? "SVG ڈاؤن لوڈ" : "Download SVG"}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* CSV exports with language options */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={isUrdu ? 'flex-row-reverse' : ''}>
            <FileSpreadsheet className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
            {isUrdu ? "CSV ڈاؤن لوڈ" : "Download CSV"}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExportCSV("bilingual")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <Languages className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
              {isUrdu ? "دو زبانی (انگریزی + اردو)" : "Bilingual (English + Urdu)"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportCSV("english")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <span className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'} text-xs font-bold`}>EN</span>
              {isUrdu ? "صرف انگریزی" : "English Only"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportCSV("urdu")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <span className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'} text-xs font-bold`}>اردو</span>
              {isUrdu ? "صرف اردو" : "Urdu Only"}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Full report exports */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={isUrdu ? 'flex-row-reverse' : ''}>
            <FileSpreadsheet className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
            {isUrdu ? "مکمل رپورٹ" : "Full Report"}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExportReport("bilingual")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <Languages className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'}`} />
              {isUrdu ? "دو زبانی رپورٹ" : "Bilingual Report"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportReport("english")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <span className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'} text-xs font-bold`}>EN</span>
              {isUrdu ? "انگریزی رپورٹ" : "English Report"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportReport("urdu")} className={isUrdu ? 'flex-row-reverse' : ''}>
              <span className={`w-4 h-4 ${isUrdu ? 'ml-2' : 'mr-2'} text-xs font-bold`}>اردو</span>
              {isUrdu ? "اردو رپورٹ" : "Urdu Report"}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
