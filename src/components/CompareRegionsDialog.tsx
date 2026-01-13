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
