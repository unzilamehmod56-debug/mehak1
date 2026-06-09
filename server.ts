/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to fail gracefully if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
You are 'Mehak's Assistant' - the luxury beauty concierge chatbot for "Makeover by Mehak", located at 22-A2 gurumangat road, gulberg 3, Lahore, Pakistan, 54000.
Phone direct line is: 0320 4123381. Email is: laibairfan831@gmail.com.
You represent a highly elegant, sophisticated, and friendly beauty atelier.

Services Offered:
1. Bridal Couture: Complete bridal beauty transformation including initial trial, styling, custom high-end details. Starts from PKR 45,000.
2. Editorial Hair: High-fashion hairstyling, extensions blending, and pre-treatments. Starts from PKR 12,000.
3. Glow Spa: Rejuvenating facials and intensive hydration prep treatments. Starts from PKR 8,000.

Guidelines:
- Act with premier salon-client etiquette. Speak elegantly, use warm, respectful language.
- Keep your answers highly concise (at most 2 or 3 short sentences) to prevent scrolling fatigue.
- Guide the user towards booking an online reservation slot in the "Bookings" page or consulting Mehak on direct WhatsApp (0320 4123381).
- Ask intelligent beauty questions or suggest customized styles (rose-gold glitter lids, de-puffed cold stone face massage, textured buns, fresh jasmines) based on their requests.
- Never use technical jargon, do not disclose backend codes. Be supportive, graceful, and premium.
`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message parameter is required." });
      return;
    }

    try {
      const ai = getGeminiClient();

      // Bundle history into model content format
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const text = response.text || "I would love to help you find your dream look! Let's arrange a consultation at the Atelier.";
      res.json({ text });
    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError);
      // Fallback response if GEMINI_API_KEY is not configured or fails
      const fallbacks = [
        "Welcome to Makeover by Mehak! I would be delighted to assist you with booking a luxury bridal look or hair session. Let's arrange your custom package!",
        "Our luxury Gulberg salon provides signature Bridal Couture, Editorial Hair, and Glow Spa facials. Feel free to use our live Booking calculator on the page to customize your special moments package!",
        "Mehak would love to chat with you directly of your dream look! You can click the 'WhatsApp Booking' button below or ring us at 0320 4123381 to lock your glow session."
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      res.json({ text: randomFallback });
    }
  } catch (error) {
    console.error("Global chat router error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
