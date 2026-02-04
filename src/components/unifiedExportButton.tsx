import { Download, Languages, FileArchive, Check, ChevronDown, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { exportUnifiedReport, exportUnifiedPDF, getExportSummary } from "@/lib/unifiedExportUtils";
import { ExportMode } from "@/lib/bilingualExportUtils";
import { motion } from "framer-motion";

interface UnifiedExportButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showPreview?: boolean;
}

export const UnifiedExportButton = ({ 
  variant = "default",
  size = "default",
  className,
  showPreview = true
}: UnifiedExportButtonProps) => {
  const { toast } = useToast();
  const { isUrdu } = useLanguage();

  const handleCSVExport = (mode: ExportMode) => {
    try {
      exportUnifiedReport(mode);
      
      const modeLabel = mode === "bilingual" 
        ? (isUrdu ? "دو زبانی" : "Bilingual") 
        : mode === "urdu" 
          ? "اردو" 
          : "English";
      
      toast({ 
        title: isUrdu ? "CSV رپورٹ برآمد" : "CSV Report Exported", 
        description: isUrdu 
          ? `پاکستان ڈیٹا اٹلس (${modeLabel}) ڈاؤن لوڈ ہو گئی` 
          : `Pakistan Data Atlas CSV (${modeLabel}) downloaded`
      });
    } catch (error) {
      toast({
        title: isUrdu ? "برآمد میں خرابی" : "Export Error",
        description: isUrdu ? "رپورٹ برآمد نہیں ہو سکی" : "Failed to export report",
        variant: "destructive"
      });
    }
  };

  const handlePDFExport = (mode: ExportMode) => {
    try {
      exportUnifiedPDF(mode);
      
      const modeLabel = mode === "bilingual" 
        ? (isUrdu ? "دو زبانی" : "Bilingual") 
        : mode === "urdu" 
          ? "اردو" 
          : "English";
      
      toast({ 
        title: isUrdu ? "PDF رپورٹ برآمد" : "PDF Report Exported", 
        description: isUrdu 
          ? `پاکستان ڈیٹا اٹلس PDF (${modeLabel}) ڈاؤن لوڈ ہو گئی` 
          : `Pakistan Data Atlas PDF (${modeLabel}) downloaded`
      });
    } catch (error) {
      toast({
        title: isUrdu ? "برآمد میں خرابی" : "Export Error",
        description: isUrdu ? "PDF برآمد نہیں ہو سکی" : "Failed to export PDF",
        variant: "destructive"
      });
    }
  };

  const exportSummary = getExportSummary();

  if (showPreview) {
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant={variant} 
              size={size} 
              className={cn(
                "gap-2",
                isUrdu && "flex-row-reverse",
                className
              )}
            >
              <FileArchive className="w-4 h-4" />
              {isUrdu ? "تمام ڈیٹا برآمد" : "Export All Data"}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className={cn(
              "flex items-center gap-2",
              isUrdu && "flex-row-reverse"
            )}>
              <FileArchive className="w-4 h-4" />
              {isUrdu ? "مکمل ڈیٹا پیکج" : "Complete Data Package"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DialogTrigger asChild>
              <DropdownMenuItem className={cn(
                "cursor-pointer",
                isUrdu && "flex-row-reverse"
              )}>
                <Check className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
                {isUrdu ? "شامل ڈیٹا دیکھیں" : "Preview Included Data"}
              </DropdownMenuItem>
            </DialogTrigger>
            
            <DropdownMenuSeparator />
            
            {/* PDF Export Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={cn(
                "cursor-pointer",
                isUrdu && "flex-row-reverse"
              )}>
                <FileText className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
                {isUrdu ? "PDF رپورٹ" : "PDF Report"}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem 
                  onClick={() => handlePDFExport("bilingual")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <Languages className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
                  {isUrdu ? "دو زبانی" : "Bilingual"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handlePDFExport("english")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <span className={cn("w-4 h-4 text-xs font-bold flex items-center justify-center", isUrdu ? "ml-2" : "mr-2")}>EN</span>
                  {isUrdu ? "انگریزی" : "English"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handlePDFExport("urdu")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <span className={cn("w-4 h-4 text-xs font-bold flex items-center justify-center", isUrdu ? "ml-2" : "mr-2")}>اردو</span>
                  {isUrdu ? "اردو" : "Urdu"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            {/* CSV Export Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={cn(
                "cursor-pointer",
                isUrdu && "flex-row-reverse"
              )}>
                <Download className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
                {isUrdu ? "CSV ڈیٹا" : "CSV Data"}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem 
                  onClick={() => handleCSVExport("bilingual")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <Languages className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
                  {isUrdu ? "دو زبانی" : "Bilingual"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCSVExport("english")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <span className={cn("w-4 h-4 text-xs font-bold flex items-center justify-center", isUrdu ? "ml-2" : "mr-2")}>EN</span>
                  {isUrdu ? "انگریزی" : "English"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCSVExport("urdu")} 
                  className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
                >
                  <span className={cn("w-4 h-4 text-xs font-bold flex items-center justify-center", isUrdu ? "ml-2" : "mr-2")}>اردو</span>
                  {isUrdu ? "اردو" : "Urdu"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className={cn(
          "max-w-2xl",
          isUrdu && "text-right"
        )}>
          <DialogHeader>
            <DialogTitle className={cn(
              "flex items-center gap-3 text-xl",
              isUrdu && "flex-row-reverse"
            )}>
              <div className="p-2 rounded-lg bg-primary/10">
                <FileArchive className="w-5 h-5 text-primary" />
              </div>
              {isUrdu ? "پاکستان ڈیٹا اٹلس - مکمل برآمد" : "Pakistan Data Atlas - Complete Export"}
            </DialogTitle>
            <DialogDescription className={cn(isUrdu && "text-right font-urdu")}>
              {isUrdu 
                ? "اس پیکج میں تمام ڈیش بورڈز کا ڈیٹا شامل ہے"
                : "This package includes all dashboard datasets in a single file"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {exportSummary.map((section, index) => (
              <motion.div
                key={section.domain}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-muted/30"
              >
                <h4 className={cn(
                  "font-semibold mb-2 flex items-center gap-2",
                  isUrdu && "flex-row-reverse"
                )}>
                  <Check className="w-4 h-4 text-primary" />
                  {section.domain}
                </h4>
                <div className={cn(
                  "flex flex-wrap gap-2",
                  isUrdu && "flex-row-reverse"
                )}>
                  {section.datasets.map(dataset => (
                    <span 
                      key={dataset}
                      className="text-xs px-2 py-1 rounded-full bg-background border"
                    >
                      {dataset}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Export buttons in dialog */}
          <div className="space-y-3 pt-4 border-t">
            <div className={cn(
              "flex items-center gap-2 text-sm font-medium text-muted-foreground",
              isUrdu && "flex-row-reverse"
            )}>
              <FileText className="w-4 h-4" />
              {isUrdu ? "PDF رپورٹ (فارمیٹڈ)" : "PDF Report (Formatted)"}
            </div>
            <div className={cn(
              "flex gap-2",
              isUrdu && "flex-row-reverse"
            )}>
              <Button 
                onClick={() => handlePDFExport("bilingual")}
                className="flex-1 gap-2"
              >
                <Languages className="w-4 h-4" />
                {isUrdu ? "دو زبانی PDF" : "Bilingual PDF"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => handlePDFExport("english")}
                className="gap-2"
              >
                EN
              </Button>
              <Button 
                variant="outline"
                onClick={() => handlePDFExport("urdu")}
                className="gap-2"
              >
                اردو
              </Button>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 text-sm font-medium text-muted-foreground mt-4",
              isUrdu && "flex-row-reverse"
            )}>
              <Download className="w-4 h-4" />
              {isUrdu ? "CSV ڈیٹا (خام)" : "CSV Data (Raw)"}
            </div>
            <div className={cn(
              "flex gap-2",
              isUrdu && "flex-row-reverse"
            )}>
              <Button 
                variant="secondary"
                onClick={() => handleCSVExport("bilingual")}
                className="flex-1 gap-2"
              >
                <Languages className="w-4 h-4" />
                {isUrdu ? "دو زبانی CSV" : "Bilingual CSV"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleCSVExport("english")}
                className="gap-2"
              >
                EN
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleCSVExport("urdu")}
                className="gap-2"
              >
                اردو
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Simple dropdown without preview dialog
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={cn(
            "gap-2",
            isUrdu && "flex-row-reverse",
            className
          )}
        >
          <Download className="w-4 h-4" />
          {isUrdu ? "تمام ڈیٹا برآمد" : "Export All"}
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className={cn(isUrdu && "flex-row-reverse")}>
          <FileText className={cn("w-4 h-4 inline", isUrdu ? "ml-2" : "mr-2")} />
          PDF
        </DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => handlePDFExport("bilingual")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <Languages className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
          {isUrdu ? "دو زبانی" : "Bilingual"}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handlePDFExport("english")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <span className={cn("w-4 h-4 text-xs font-bold", isUrdu ? "ml-2" : "mr-2")}>EN</span>
          {isUrdu ? "انگریزی" : "English"}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handlePDFExport("urdu")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <span className={cn("w-4 h-4 text-xs font-bold", isUrdu ? "ml-2" : "mr-2")}>اردو</span>
          {isUrdu ? "اردو" : "Urdu"}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className={cn(isUrdu && "flex-row-reverse")}>
          <Download className={cn("w-4 h-4 inline", isUrdu ? "ml-2" : "mr-2")} />
          CSV
        </DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => handleCSVExport("bilingual")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <Languages className={cn("w-4 h-4", isUrdu ? "ml-2" : "mr-2")} />
          {isUrdu ? "دو زبانی" : "Bilingual"}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleCSVExport("english")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <span className={cn("w-4 h-4 text-xs font-bold", isUrdu ? "ml-2" : "mr-2")}>EN</span>
          {isUrdu ? "انگریزی" : "English"}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleCSVExport("urdu")} 
          className={cn("cursor-pointer", isUrdu && "flex-row-reverse")}
        >
          <span className={cn("w-4 h-4 text-xs font-bold", isUrdu ? "ml-2" : "mr-2")}>اردو</span>
          {isUrdu ? "اردو" : "Urdu"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
