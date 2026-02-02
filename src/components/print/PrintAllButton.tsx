import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Eye, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PrintableAllDashboards } from "./PrintableAllDashboards";

interface PrintAllButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showPreview?: boolean;
}

export const PrintAllButton = ({
  variant = "outline",
  size = "default",
  className,
  showPreview = true,
}: PrintAllButtonProps) => {
  const { isUrdu } = useLanguage();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Pakistan Data Atlas - Complete Report</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
                
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                body {
                  font-family: 'Inter', sans-serif;
                  color: #1a1a1a;
                  background: white;
                  padding: 15mm;
                  line-height: 1.4;
                  font-size: 11px;
                }
                
                h1, h2, h3, h4, h5, h6 {
                  font-family: 'Playfair Display', serif;
                }
                
                .printable-dashboard {
                  max-width: 210mm;
                  margin: 0 auto;
                }
                
                .print-header {
                  margin-bottom: 20px;
                  padding-bottom: 16px;
                  border-bottom: 3px solid #01411C;
                }
                
                .print-section {
                  margin-bottom: 20px;
                  page-break-inside: avoid;
                }
                
                .print-stat-card {
                  padding: 8px;
                  border: 1px solid #e5e5e5;
                  border-radius: 6px;
                  background: #fafafa;
                }
                
                .print-table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 10px;
                }
                
                .print-table th,
                .print-table td {
                  padding: 6px 8px;
                  border: 1px solid #e5e5e5;
                  text-align: left;
                }
                
                .print-table th {
                  background: #f5f5f5;
                  font-weight: 600;
                }
                
                .print-table tr:nth-child(even) {
                  background: #fafafa;
                }
                
                .print-footer {
                  margin-top: 20px;
                  padding-top: 12px;
                  border-top: 1px solid #e5e5e5;
                  text-align: center;
                  font-size: 10px;
                  color: #666;
                }
                
                .print-toc {
                  page-break-after: always;
                }
                
                .toc-item {
                  text-decoration: none;
                  color: inherit;
                  display: flex;
                  align-items: center;
                }
                
                .toc-item:hover {
                  background: rgba(245, 245, 245, 0.3);
                }
                
                .grid { display: grid; gap: 12px; }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
                .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
                
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .gap-2 { gap: 8px; }
                .gap-3 { gap: 12px; }
                
                .mb-1 { margin-bottom: 4px; }
                .mb-2 { margin-bottom: 8px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-8 { margin-bottom: 32px; }
                .mt-1 { margin-top: 4px; }
                .mt-8 { margin-top: 32px; }
                .p-2 { padding: 8px; }
                .p-3 { padding: 12px; }
                .p-4 { padding: 16px; }
                .p-6 { padding: 24px; }
                .pb-2 { padding-bottom: 8px; }
                .pb-6 { padding-bottom: 24px; }
                .pt-4 { padding-top: 16px; }
                
                .text-left { text-align: left; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                
                .text-xs { font-size: 10px; }
                .text-sm { font-size: 11px; }
                .text-lg { font-size: 16px; }
                .text-xl { font-size: 18px; }
                .text-2xl { font-size: 20px; }
                .text-3xl { font-size: 26px; }
                .text-4xl { font-size: 32px; }
                
                .font-bold { font-weight: 700; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                
                .text-foreground { color: #1a1a1a; }
                .text-muted-foreground { color: #666; }
                .text-primary { color: #01411C; }
                .text-destructive { color: #dc2626; }
                .text-data-blue { color: #3b82f6; }
                .text-data-amber { color: #f59e0b; }
                .text-data-coral { color: #f87171; }
                
                .bg-muted\\/20 { background: rgba(245, 245, 245, 0.2); }
                .bg-muted\\/30 { background: rgba(245, 245, 245, 0.3); }
                .bg-muted\\/50 { background: rgba(245, 245, 245, 0.5); }
                .bg-card { background: white; }
                .bg-background { background: white; }
                
                .w-4 { width: 16px; }
                .h-4 { height: 16px; }
                .w-6 { width: 24px; }
                .h-6 { height: 24px; }
                .w-full { width: 100%; }
                
                .rounded-md { border-radius: 6px; }
                .rounded-lg { border-radius: 8px; }
                
                .border { border: 1px solid #e5e5e5; }
                .border-b { border-bottom: 1px solid #e5e5e5; }
                .border-b-2 { border-bottom: 2px solid; }
                .border-t { border-top: 1px solid #e5e5e5; }
                .border-border { border-color: #e5e5e5; }
                .border-primary { border-color: #01411C; }
                .border-data-blue { border-color: #3b82f6; }
                .border-data-amber { border-color: #f59e0b; }
                .border-data-coral { border-color: #f87171; }
                
                .page-break-before {
                  page-break-before: always;
                }
                
                @media print {
                  body { padding: 10mm; }
                  .print-section { page-break-inside: avoid; }
                  .page-break-before { page-break-before: always; }
                }
                
                .direction-rtl { direction: rtl; }
                .flex-row-reverse { flex-direction: row-reverse; }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
        
        toast({
          title: isUrdu ? "پرنٹ ونڈو کھل گئی" : "Print window opened",
          description: isUrdu ? "تمام ڈیش بورڈز کی جامع رپورٹ" : "Comprehensive report of all dashboards",
        });
      }
    }
    setIsOpen(false);
  };

  if (!showPreview) {
    return (
      <>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-2", className)}
          onClick={handlePrint}
        >
          <FileText className="w-4 h-4" />
          <span className={cn(isUrdu && "font-urdu")}>
            {isUrdu ? "تمام پرنٹ کریں" : "Print All"}
          </span>
        </Button>
        <div className="hidden">
          <PrintableAllDashboards ref={printRef} />
        </div>
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("gap-2", className)}>
          <FileText className="w-4 h-4" />
          <span className={cn(isUrdu && "font-urdu")}>
            {isUrdu ? "مکمل رپورٹ پرنٹ کریں" : "Print All Dashboards"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={cn("flex items-center gap-2", isUrdu && "flex-row-reverse font-urdu")}>
            <Eye className="w-5 h-5" />
            {isUrdu ? "جامع رپورٹ پریویو" : "Complete Report Preview"}
          </DialogTitle>
          <DialogDescription className={cn(isUrdu && "font-urdu text-right")}>
            {isUrdu 
              ? "تعلیم، انتخابات، آبادی اور معیشت کے تمام ڈیٹا کا جائزہ لیں"
              : "Preview all data from Education, Elections, Population and Economy dashboards"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="p-2 bg-muted/30 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Multi-page A4 Report</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">4 Sections</span>
            </div>
            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Printer className="w-4 h-4" />
              {isUrdu ? "ابھی پرنٹ کریں" : "Print Now"}
            </Button>
          </div>
          <div className="p-4 bg-muted/10 overflow-auto max-h-[60vh]">
            <div className="bg-background shadow-lg mx-auto" style={{ maxWidth: '210mm' }}>
              <PrintableAllDashboards ref={printRef} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
