"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Microscope, Upload, Camera, Loader2, AlertTriangle, CheckCircle2, Leaf, ChevronRight, RotateCcw, Sparkles } from "lucide-react";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  crop: string;
  description: string;
  organicRemedy: string;
  chemicalRemedy: string;
  withdrawalPeriod: string;
  prevention: string[];
}

const mockResults: DiagnosisResult[] = [
  {
    disease: "Late Blight",
    confidence: 94.2,
    severity: "high",
    crop: "Potato / Tomato",
    description: "Caused by Phytophthora infestans. Water-soaked lesions on leaves that turn brown/black with white mold on undersides.",
    organicRemedy: "Apply copper-based fungicide (Bordeaux mixture 1%). Remove and destroy infected plant parts. Improve air circulation.",
    chemicalRemedy: "Mancozeb 75% WP @ 2.5g/L or Metalaxyl + Mancozeb @ 2.5g/L spray at 7-day intervals.",
    withdrawalPeriod: "7-14 days before harvest",
    prevention: ["Use certified disease-free seed", "Avoid overhead irrigation", "Rotate crops every 2-3 years", "Plant resistant varieties"],
  },
  {
    disease: "Powdery Mildew",
    confidence: 89.7,
    severity: "medium",
    crop: "Wheat / Grapes",
    description: "White powdery patches on leaves and stems caused by various Erysiphales fungi. Reduces photosynthesis and yield.",
    organicRemedy: "Neem oil spray (5ml/L) or milk spray (1:10 ratio). Baking soda solution (1 tsp/L water).",
    chemicalRemedy: "Sulfur 80% WP @ 3g/L or Hexaconazole 5% EC @ 2ml/L at first symptom.",
    withdrawalPeriod: "5-7 days before harvest",
    prevention: ["Ensure good air circulation", "Avoid excess nitrogen fertilizer", "Water at base of plants", "Remove infected leaves promptly"],
  },
];

export default function CropDoctorSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedImage(ev.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const severityColor = { low: "text-green-600 bg-green-100", medium: "text-amber-600 bg-amber-100", high: "text-red-600 bg-red-100" };

  return (
    <section id="crop-doctor" className="section-padding bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-100/30 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge badge-amber mb-4"><Microscope className="w-3.5 h-3.5" /> AI Crop Doctor</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Diagnose Crop <span className="gradient-text-amber">Diseases</span> Instantly</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Upload a photo of a diseased leaf — our CNN model identifies the problem and recommends safe remedies.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden ${selectedImage ? "border-green-400 bg-green-50" : "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50/50"}`}>
              {!selectedImage ? (
                <label htmlFor="crop-upload" className="flex flex-col items-center justify-center p-16 cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center mb-6">
                    <Camera className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="text-slate-700 font-semibold text-lg mb-2">Upload Leaf Image</p>
                  <p className="text-slate-400 text-sm mb-4">Drag & drop or click to browse</p>
                  <span className="px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"><Upload className="w-4 h-4 inline mr-2" />Choose File</span>
                  <input ref={fileRef} id="crop-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              ) : (
                <div className="relative aspect-[4/3]">
                  <img src={selectedImage} alt="Uploaded crop" className="w-full h-full object-cover" />
                  <button onClick={reset} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"><RotateCcw className="w-4 h-4 text-slate-600" /></button>
                </div>
              )}
            </div>

            {selectedImage && !result && (
              <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={handleAnalyze} disabled={analyzing} id="analyze-btn" className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-3">
                {analyzing ? <><Loader2 className="w-5 h-5 animate-spin" />Analyzing with AI...</> : <><Sparkles className="w-5 h-5" />Analyze Disease</>}
              </motion.button>
            )}

            {/* How it works */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" />How Crop Doctor Works</h4>
              {["Upload a photo of the affected leaf", "Our CNN model analyzes patterns", "Get disease ID + safe remedy"].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-slate-600 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results Area */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="placeholder" className="h-full flex items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-green-50 border border-slate-100 p-12 min-h-[400px]">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center mx-auto mb-6"><Microscope className="w-12 h-12 text-green-400" /></div>
                    <h3 className="font-display text-xl font-bold text-slate-700 mb-2">Waiting for Analysis</h3>
                    <p className="text-slate-400 text-sm">Upload a leaf image and click analyze to get AI-powered diagnosis results here.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Disease Header */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-slate-900">{result.disease}</h3>
                        <p className="text-slate-500 text-sm">{result.crop}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{result.confidence}%</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${severityColor[result.severity]}`}>{result.severity.toUpperCase()} Severity</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{result.description}</p>
                  </div>

                  {/* Remedies */}
                  <div className="grid gap-4">
                    <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2"><Leaf className="w-4 h-4" />Organic Remedy</h4>
                      <p className="text-green-700 text-sm">{result.organicRemedy}</p>
                    </div>
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
                      <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Chemical Remedy</h4>
                      <p className="text-amber-700 text-sm">{result.chemicalRemedy}</p>
                      <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                        <span className="text-red-600 text-xs font-medium">Withdrawal Period: {result.withdrawalPeriod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prevention */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" />Prevention Tips</h4>
                    <div className="space-y-2">
                      {result.prevention.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600"><ChevronRight className="w-3 h-3 text-green-500 shrink-0" />{tip}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
