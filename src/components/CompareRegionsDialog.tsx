import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Users, GraduationCap, TrendingUp, School } from "lucide-react";
import { provinces, provincialLiteracy, gdpByProvince, educationInfrastructure } from "@/data/pakistanData";

interface ProvinceMetrics {
  name: string;
  population: number;
  area: number;
  literacy: { male: number; female: number; overall: number } | null;
  gdp: number | null;
  education: { schools: number; colleges: number; universities: number; studentTeacherRatio: number } | null;
}

const getProvinceMetrics = (provinceName: string): ProvinceMetrics | null => {
  const province = provinces.find(p => p.name === provinceName);
  if (!province) return null;

  const literacyKey = provinceName === "Khyber Pakhtunkhwa" ? "KPK" : provinceName;
  const literacy = provincialLiteracy.find(l => l.province === literacyKey || l.province === provinceName);
  const gdp = gdpByProvince.find(g => g.province === literacyKey || g.province === provinceName);
  const education = educationInfrastructure.find(e => e.province === literacyKey || e.province === provinceName);

  return {
    name: province.name,
    population: province.population,
    area: province.area,
    literacy: literacy ? { male: literacy.male, female: literacy.female, overall: literacy.overall } : null,
    gdp: gdp?.gdp || null,
    education: education || null,
  };
};

const MetricRow = ({ 
  label, 
  value1, 
  value2, 
  format = (v: number) => v.toLocaleString(),
  highlight = false 
}: { 
  label: string; 
  value1: number | null; 
  value2: number | null; 
  format?: (v: number) => string;
  highlight?: boolean;
}) => {
  const better = value1 !== null && value2 !== null ? (value1 > value2 ? 1 : value1 < value2 ? 2 : 0) : 0;
  
  return (
    <div className={`grid grid-cols-3 gap-4 py-3 border-b border-border/50 ${highlight ? 'bg-muted/30' : ''}`}>
      <div className={`text-center font-medium ${better === 1 ? 'text-green-600' : ''}`}>
        {value1 !== null ? format(value1) : '—'}
      </div>
      <div className="text-center text-sm text-muted-foreground font-medium">
        {label}
      </div>
      <div className={`text-center font-medium ${better === 2 ? 'text-green-600' : ''}`}>
        {value2 !== null ? format(value2) : '—'}
      </div>
    </div>
  );
};

export const CompareRegionsDialog = () => {
  const [province1, setProvince1] = useState<string>("");
  const [province2, setProvince2] = useState<string>("");

  const metrics1 = province1 ? getProvinceMetrics(province1) : null;
  const metrics2 = province2 ? getProvinceMetrics(province2) : null;

  const availableProvinces = provinces.filter(p => 
    p.name !== "Gilgit-Baltistan" && p.name !== "Azad Kashmir"
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowLeftRight className="w-4 h-4" />
          Compare Regions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Compare Regions</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Select value={province1} onValueChange={setProvince1}>
            <SelectTrigger>
              <SelectValue placeholder="Select first province" />
            </SelectTrigger>
            <SelectContent>
              {availableProvinces.map(p => (
                <SelectItem key={p.id} value={p.name} disabled={p.name === province2}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={province2} onValueChange={setProvince2}>
            <SelectTrigger>
              <SelectValue placeholder="Select second province" />
            </SelectTrigger>
            <SelectContent>
              {availableProvinces.map(p => (
                <SelectItem key={p.id} value={p.name} disabled={p.name === province1}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {metrics1 && metrics2 && (
          <div className="mt-6 space-y-6">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 pb-3 border-b-2 border-border">
              <div className="text-center font-display font-bold text-lg text-primary">{metrics1.name}</div>
              <div className="text-center text-sm text-muted-foreground">vs</div>
              <div className="text-center font-display font-bold text-lg text-primary">{metrics2.name}</div>
            </div>

            {/* Demographics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Demographics</h3>
              </div>
              <MetricRow 
                label="Population" 
                value1={metrics1.population} 
                value2={metrics2.population} 
                format={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <MetricRow 
                label="Area (km²)" 
                value1={metrics1.area} 
                value2={metrics2.area}
                format={(v) => v.toLocaleString()}
              />
              <MetricRow 
                label="Density (per km²)" 
                value1={Math.round(metrics1.population / metrics1.area)} 
                value2={Math.round(metrics2.population / metrics2.area)}
              />
            </div>

            {/* Literacy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Literacy Rates</h3>
              </div>
              <MetricRow 
                label="Overall Literacy" 
                value1={metrics1.literacy?.overall || null} 
                value2={metrics2.literacy?.overall || null}
                format={(v) => `${v}%`}
                highlight
              />
              <MetricRow 
                label="Male Literacy" 
                value1={metrics1.literacy?.male || null} 
                value2={metrics2.literacy?.male || null}
                format={(v) => `${v}%`}
              />
              <MetricRow 
                label="Female Literacy" 
                value1={metrics1.literacy?.female || null} 
                value2={metrics2.literacy?.female || null}
                format={(v) => `${v}%`}
              />
              <MetricRow 
                label="Gender Gap" 
                value1={metrics1.literacy ? metrics1.literacy.male - metrics1.literacy.female : null} 
                value2={metrics2.literacy ? metrics2.literacy.male - metrics2.literacy.female : null}
                format={(v) => `${v.toFixed(1)}pp`}
              />
            </div>

            {/* Economy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Economy</h3>
              </div>
              <MetricRow 
                label="GDP Share" 
                value1={metrics1.gdp} 
                value2={metrics2.gdp}
                format={(v) => `${v}%`}
                highlight
              />
            </div>

            {/* Education Infrastructure */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <School className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Education Infrastructure</h3>
              </div>
              <MetricRow 
                label="Schools" 
                value1={metrics1.education?.schools || null} 
                value2={metrics2.education?.schools || null}
                format={(v) => v.toLocaleString()}
              />
              <MetricRow 
                label="Colleges" 
                value1={metrics1.education?.colleges || null} 
                value2={metrics2.education?.colleges || null}
              />
              <MetricRow 
                label="Universities" 
                value1={metrics1.education?.universities || null} 
                value2={metrics2.education?.universities || null}
              />
              <MetricRow 
                label="Student-Teacher Ratio" 
                value1={metrics1.education?.studentTeacherRatio || null} 
                value2={metrics2.education?.studentTeacherRatio || null}
                format={(v) => `${v}:1`}
              />
            </div>
          </div>
        )}

        {(!province1 || !province2) && (
          <div className="mt-8 text-center text-muted-foreground py-12 bg-muted/30 rounded-lg">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>Select two provinces to compare their metrics side-by-side</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
