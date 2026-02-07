// Export utilities for charts and data

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        // Handle values that might contain commas
        if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`;
        }
        return value;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportChartAsImage = async (
  chartRef: HTMLElement | null,
  filename: string,
  format: "png" | "svg"
) => {
  if (!chartRef) return;

  const svgElement = chartRef.querySelector("svg");
  if (!svgElement) return;

  // Clone the SVG to avoid modifying the original
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;
  
  // Get computed styles and apply them inline
  const computedStyle = getComputedStyle(chartRef);
  clonedSvg.style.backgroundColor = computedStyle.backgroundColor || "#ffffff";

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

  if (format === "svg") {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(svgBlob);
    link.download = `${filename}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
    return;
  }

  // For PNG export
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  
  const svgUrl = URL.createObjectURL(svgBlob);
  
  return new Promise<void>((resolve) => {
    img.onload = () => {
      canvas.width = img.width * 2; // 2x for better quality
      canvas.height = img.height * 2;
      ctx?.scale(2, 2);
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${filename}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
        URL.revokeObjectURL(svgUrl);
        resolve();
      }, "image/png");
    };
    img.src = svgUrl;
  });
};
