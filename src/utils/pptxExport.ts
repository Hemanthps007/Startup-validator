import pptxgen from "pptxgenjs";
import type { ValidationResult } from "./simulator";

export function exportToPPTX(result: ValidationResult) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_16x9";
  pptx.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  
  // Set global properties
  pptx.author = "AI Startup Validator";
  pptx.company = result.startupName;
  pptx.revision = "1";
  pptx.subject = `${result.startupName} Pitch Deck`;
  pptx.title = `${result.startupName} - Investor Pitch Deck`;

  // Color Palette
  const BG_COLOR = "0F172A"; // Slate 900
  const TEXT_PRIMARY = "FFFFFF"; // White
  const TEXT_SECONDARY = "94A3B8"; // Slate 400
  const ACCENT_COLOR = "06B6D4"; // Cyan 500
  const CARD_BG = "1E293B"; // Slate 800

  result.pitchDeck.forEach((slideData) => {
    const slide = pptx.addSlide();
    
    // Background Color
    slide.background = { fill: BG_COLOR };

    // Slide Header
    slide.addText(slideData.title, {
      x: 0.6,
      y: 0.4,
      w: 8.8,
      h: 0.6,
      fontSize: 26,
      color: ACCENT_COLOR,
      bold: true,
      fontFace: "Arial"
    });

    if (slideData.subtitle) {
      slide.addText(slideData.subtitle, {
        x: 0.6,
        y: 0.95,
        w: 8.8,
        h: 0.35,
        fontSize: 14,
        color: TEXT_SECONDARY,
        italic: true,
        fontFace: "Arial"
      });
    }

    // Slide Content depending on layout
    const contentY = slideData.subtitle ? 1.4 : 1.1;

    // Visual Deck Specific Styles (e.g. Title Slide vs Data Slides)
    if (slideData.slideNumber === 1) {
      // Title slide
      // Clear normal slide title & subtitle
      slide.background = { fill: BG_COLOR };
      
      // Giant Title
      slide.addText(slideData.title.toUpperCase(), {
        x: 0.8,
        y: 1.6,
        w: 8.4,
        h: 1.0,
        fontSize: 44,
        color: ACCENT_COLOR,
        bold: true,
        fontFace: "Arial",
        align: "center"
      });

      // Subtitle
      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.8,
          y: 2.7,
          w: 8.4,
          h: 0.5,
          fontSize: 18,
          color: TEXT_PRIMARY,
          italic: true,
          fontFace: "Arial",
          align: "center"
        });
      }

      // Meta Info
      slide.addText(slideData.bullets.join("   |   "), {
        x: 0.8,
        y: 4.2,
        w: 8.4,
        h: 0.5,
        fontSize: 12,
        color: TEXT_SECONDARY,
        fontFace: "Arial",
        align: "center"
      });

    } else if (slideData.slideNumber === 4 && slideData.visualData) {
      // Market Opportunity TAM/SAM/SOM Side-by-Side Cards
      const data = slideData.visualData;
      
      // Bullets on the Left
      slide.addText(slideData.bullets.map(b => `• ${b}`).join("\n\n"), {
        x: 0.6,
        y: contentY,
        w: 4.8,
        h: 3.5,
        fontSize: 13,
        color: TEXT_PRIMARY,
        fontFace: "Arial",
        lineSpacing: 18
      });

      // TAM/SAM/SOM Cards on the Right
      const cards = [
        { label: "TAM (Total Addressable)", val: data.TAM, color: "06B6D4", y: 1.4 },
        { label: "SAM (Serviceable Available)", val: data.SAM, color: "3B82F6", y: 2.6 },
        { label: "SOM (Serviceable Obtainable)", val: data.SOM, color: "10B981", y: 3.8 }
      ];

      cards.forEach((c) => {
        // Card Background
        slide.addShape('rect' as any, {
          x: 5.8,
          y: c.y,
          w: 3.6,
          h: 1.0,
          fill: { color: CARD_BG }
        });
        
        // Card Label
        slide.addText(c.label, {
          x: 5.9,
          y: c.y + 0.1,
          w: 3.4,
          h: 0.25,
          fontSize: 11,
          color: TEXT_SECONDARY,
          fontFace: "Arial"
        });

        // Card Value
        slide.addText(c.val, {
          x: 5.9,
          y: c.y + 0.35,
          w: 3.4,
          h: 0.55,
          fontSize: 18,
          color: c.color,
          bold: true,
          fontFace: "Arial"
        });
      });

    } else if (slideData.slideNumber === 9 && slideData.visualData) {
      // Financial Projections Left Bullets, Right Bar Charts/Blocks
      slide.addText(slideData.bullets.map(b => `• ${b}`).join("\n\n"), {
        x: 0.6,
        y: contentY,
        w: 4.8,
        h: 3.5,
        fontSize: 13,
        color: TEXT_PRIMARY,
        fontFace: "Arial",
        lineSpacing: 18
      });

      // Projection Columns
      const data = slideData.visualData;
      const formatVal = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
        return `$${val}`;
      };

      const columns = [
        { label: "Year 1 Revenue", val: formatVal(data.Year1 || 0), h: 1.5, x: 5.8 },
        { label: "Year 3 Revenue", val: formatVal(data.Year3 || 0), h: 2.3, x: 7.1 },
        { label: "Year 5 Revenue", val: formatVal(data.Year5 || 0), h: 3.1, x: 8.4 }
      ];

      columns.forEach((col) => {
        // Vertical Bar
        slide.addShape('rect' as any, {
          x: col.x,
          y: 4.5 - col.h,
          w: 1.0,
          h: col.h,
          fill: { color: "06B6D4" }
        });

        // Value text above bar
        slide.addText(col.val, {
          x: col.x - 0.2,
          y: 4.5 - col.h - 0.35,
          w: 1.4,
          h: 0.3,
          fontSize: 12,
          color: TEXT_PRIMARY,
          bold: true,
          align: "center",
          fontFace: "Arial"
        });

        // Year label under bar
        slide.addText(col.label.replace(" Revenue", ""), {
          x: col.x - 0.2,
          y: 4.6,
          w: 1.4,
          h: 0.3,
          fontSize: 11,
          color: TEXT_SECONDARY,
          align: "center",
          fontFace: "Arial"
        });
      });

    } else {
      // Standard Bullets layout
      slide.addText(slideData.bullets.map(b => `• ${b}`).join("\n\n"), {
        x: 0.8,
        y: contentY,
        w: 8.4,
        h: 3.6,
        fontSize: 15,
        color: TEXT_PRIMARY,
        fontFace: "Arial",
        lineSpacing: 22
      });
    }

    // Slide Number Footer
    slide.addText(`Slide ${slideData.slideNumber} of 10`, {
      x: 0.6,
      y: 5.15,
      w: 8.8,
      h: 0.25,
      fontSize: 9,
      color: TEXT_SECONDARY,
      align: "right",
      fontFace: "Arial"
    });
  });

  // Save the presentation file
  const safeName = result.startupName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  pptx.writeFile({ fileName: `${safeName}-pitch-deck.pptx` });
}
