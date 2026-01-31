import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Eye } from "lucide-react";
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
import { PrintableEducation } from "./PrintableEducation";
import { PrintableElections } from "./PrintableElections";
import { PrintablePopulation } from "./PrintablePopulation";
import { PrintableEconomy } from "./PrintableEconomy";

type Domain = "education" | "elections" | "population" | "economy";

interface DomainPrintButtonProps {
  domain: Domain;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showPreview?: boolean;
}

const DOMAIN_CONFIG: Record<Domain, { title: string; color: string; urduTitle: string }> = {
  education: { title: "Education Report", color: "#01411C", urduTitle: "تعلیمی رپورٹ" },
  elections: { title: "Elections Report", color: "hsl(220, 70%, 50%)", urduTitle: "انتخابی رپورٹ" },
  population: { title: "Population Report", color: "hsl(38, 92%, 50%)", urduTitle: "آبادی کی رپورٹ" },
  economy: { title: "Economy Report", color: "hsl(10, 80%, 60%)", urduTitle: "معاشی رپورٹ" },
};

export const DomainPrintButton = ({
  domain,
  variant = "outline",
  size = "default",
  className,
  showPreview = true,
}: DomainPrintButtonProps) => {
  const { t, isUrdu } = useLanguage();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const config = DOMAIN_CONFIG[domain];

  const getPrintComponent = () => {
    switch (domain) {
      case "education":
        return <PrintableEducation ref={printRef} />;
      case "elections":
        return <PrintableElections ref={printRef} />;
      case "population":
        return <PrintablePopulation ref={printRef} />;
      case "economy":
        return <PrintableEconomy ref={printRef} />;
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Pakistan Data Atlas - ${config.title}</title>
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
                  padding: 20mm;
                  line-height: 1.5;
                }
                
                h1, h2, h3, h4, h5, h6 {
                  font-family: 'Playfair Display', serif;
                }
                
                .printable-dashboard {
                  max-width: 210mm;
                  margin: 0 auto;
                }
                
                .print-header {
                  margin-bottom: 24px;
                  padding-bottom: 16px;
                  border-bottom: 3px solid ${config.color};
                }
                
                .print-section {
                  margin-bottom: 24px;
                  page-break-inside: avoid;
                }
                
                .print-section h2 {
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 12px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #e5e5e5;
                  color: ${config.color};
                }
                
                .print-stat-card {
                  padding: 12px;
                  border: 1px solid #e5e5e5;
                  border-radius: 8px;
                  background: #fafafa;
                }
                
                .print-table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 12px;
                }
                
                .print-table th,
                .print-table td {
                  padding: 10px;
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
                  margin-top: 24px;
                  padding-top: 16px;
                  border-top: 1px solid #e5e5e5;
                  text-align: center;
                  font-size: 11px;
                  color: #666;
                }
                
                .grid { display: grid; gap: 16px; }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
                .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
                .grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
                
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .gap-2 { gap: 8px; }
                .gap-3 { gap: 12px; }
                .gap-4 { gap: 16px; }
                
                .mb-1 { margin-bottom: 4px; }
                .mb-2 { margin-bottom: 8px; }
                .mb-3 { margin-bottom: 12px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-6 { margin-bottom: 24px; }
                .mb-8 { margin-bottom: 32px; }
                .mt-1 { margin-top: 4px; }
                .mt-8 { margin-top: 32px; }
                .p-3 { padding: 12px; }
                .p-4 { padding: 16px; }
                .pb-2 { padding-bottom: 8px; }
                .pb-6 { padding-bottom: 24px; }
                .pt-4 { padding-top: 16px; }
                
                .text-left { text-align: left; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                
                .text-sm { font-size: 12px; }
                .text-xs { font-size: 10px; }
                .text-lg { font-size: 18px; }
                .text-xl { font-size: 20px; }
                .text-2xl { font-size: 24px; }
                .text-3xl { font-size: 30px; }
                
                .font-bold { font-weight: 700; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                
                .text-foreground { color: #1a1a1a; }
                .text-muted-foreground { color: #666; }
                .text-primary { color: #01411C; }
                .text-destructive { color: #dc2626; }
                .text-accent { color: #f59e0b; }
                .text-data-blue { color: #3b82f6; }
                .text-data-amber { color: #f59e0b; }
                .text-data-coral { color: #f87171; }
                
                .bg-muted\\/50 { background: rgba(245, 245, 245, 0.5); }
                .bg-muted\\/20 { background: rgba(245, 245, 245, 0.2); }
                .bg-card { background: white; }
                
                .w-6 { width: 24px; }
                .h-6 { height: 24px; }
                .w-8 { width: 32px; }
                .h-8 { height: 32px; }
                .w-full { width: 100%; }
                
                .rounded-md { border-radius: 6px; }
                .rounded-lg { border-radius: 8px; }
                
                .border { border: 1px solid #e5e5e5; }
                .border-b { border-bottom: 1px solid #e5e5e5; }
                .border-b-2 { border-bottom: 2px solid; }
                .border-t { border-top: 1px solid #e5e5e5; }
                .border-border { border-color: #e5e5e5; }
                
                .inline-block { display: inline-block; }
                .uppercase { text-transform: uppercase; }
                .tracking-wide { letter-spacing: 0.05em; }
                
                .page-break-before {
                  page-break-before: always;
                }
                
                @media print {
                  body { padding: 15mm; }
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
          description: isUrdu ? "اپنے براؤزر کے پرنٹ ڈائیلاگ کا استعمال کریں" : "Use your browser's print dialog",
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
          <Printer className="w-4 h-4" />
          <span className={cn(isUrdu && "font-urdu")}>
            {isUrdu ? "پرنٹ" : "Print"}
          </span>
        </Button>
        <div className="hidden">
          {getPrintComponent()}
        </div>
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("gap-2", className)}>
          <Printer className="w-4 h-4" />
          <span className={cn(isUrdu && "font-urdu")}>
            {isUrdu ? "پرنٹ ویو" : "Print View"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={cn("flex items-center gap-2", isUrdu && "flex-row-reverse font-urdu")}>
            <Eye className="w-5 h-5" />
            {isUrdu ? config.urduTitle : config.title}
          </DialogTitle>
          <DialogDescription className={cn(isUrdu && "font-urdu text-right")}>
            {isUrdu 
              ? "پرنٹ سے پہلے رپورٹ کا جائزہ لیں"
              : "Preview the report before printing"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="p-2 bg-muted/30 border-b border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">A4 Paper Layout</span>
            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Printer className="w-4 h-4" />
              {isUrdu ? "ابھی پرنٹ کریں" : "Print Now"}
            </Button>
          </div>
          <div className="p-4 bg-muted/10 overflow-auto max-h-[60vh]">
            <div className="bg-background shadow-lg mx-auto" style={{ maxWidth: '210mm' }}>
              {getPrintComponent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
