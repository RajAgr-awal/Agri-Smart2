"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Thermometer, Droplets, Wind, Sun, CloudRain, AlertTriangle, CheckCircle2, Sprout, Beaker, Calendar, MapPin, TrendingUp, BarChart3 } from "lucide-react";

const weatherData = {
  location: "Nashik, Maharashtra",
  temp: 28,
  humidity: 72,
  wind: 12,
  condition: "Partly Cloudy",
  forecast: [
    { day: "Today", icon: Sun, temp: 28, rain: 10 },
    { day: "Tue", icon: Cloud, temp: 26, rain: 30 },
    { day: "Wed", icon: CloudRain, temp: 24, rain: 75 },
    { day: "Thu", icon: CloudRain, temp: 23, rain: 80 },
    { day: "Fri", icon: Sun, temp: 27, rain: 15 },
  ],
};

const soilData = {
  ph: 6.5,
  nitrogen: 65,
  phosphorus: 42,
  potassium: 78,
  organicMatter: 3.2,
  moisture: 55,
};

const alerts = [
  { type: "warning", title: "Heavy Rain Expected", desc: "Wednesday-Thursday: 40-60mm rainfall expected. Delay pesticide spraying.", icon: CloudRain },
  { type: "success", title: "Optimal Planting Window", desc: "Next 5 days are ideal for sowing wheat. Soil temperature and moisture are optimal.", icon: Sprout },
  { type: "info", title: "Fertilizer Reminder", desc: "Apply DAP (Di-Ammonium Phosphate) — your soil phosphorus is below optimal.", icon: Beaker },
];

const recommendations = [
  { crop: "Wheat", action: "Apply Urea @ 50kg/acre at knee-high stage", timing: "This week", priority: "High" },
  { crop: "Tomato", action: "Install drip irrigation — soil moisture dropping", timing: "Before Wed rain", priority: "Medium" },
  { crop: "Rice", action: "Begin nursery preparation for Kharif season", timing: "Next 10 days", priority: "High" },
  { crop: "Onion", action: "Harvest mature bulbs before rain to prevent rot", timing: "Today-Tomorrow", priority: "Critical" },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-amber-100 text-amber-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-green-100 text-green-700",
};

const alertStyle: Record<string, string> = {
  warning: "border-amber-200 bg-amber-50",
  success: "border-green-200 bg-green-50",
  info: "border-blue-200 bg-blue-50",
};

const alertIconColor: Record<string, string> = {
  warning: "text-amber-500",
  success: "text-green-500",
  info: "text-blue-500",
};

export default function AdvisorySection() {
  return (
    <section id="advisory" className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge badge-green mb-4"><Cloud className="w-3.5 h-3.5" /> Smart Advisory</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Weather & Soil <span className="gradient-text">Intelligence</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Real-time weather monitoring and soil-based recommendations to optimize your yield.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-gradient-to-br from-sky-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sky-200 text-sm mb-4"><MapPin className="w-4 h-4" />{weatherData.location}</div>
              <div className="flex items-end gap-6 mb-8">
                <div>
                  <div className="text-7xl font-bold">{weatherData.temp}°</div>
                  <div className="text-sky-200">{weatherData.condition}</div>
                </div>
                <div className="flex gap-6 pb-2">
                  <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-sky-300" /><span className="text-sm">{weatherData.humidity}%</span></div>
                  <div className="flex items-center gap-2"><Wind className="w-4 h-4 text-sky-300" /><span className="text-sm">{weatherData.wind} km/h</span></div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {weatherData.forecast.map((d) => (
                  <div key={d.day} className="text-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <div className="text-xs text-sky-200 mb-2">{d.day}</div>
                    <d.icon className="w-6 h-6 mx-auto mb-2 text-white" />
                    <div className="text-sm font-semibold">{d.temp}°</div>
                    <div className="text-xs text-sky-300">{d.rain}% rain</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soil Analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display font-bold text-slate-900 mb-6 flex items-center gap-2"><Sprout className="w-5 h-5 text-green-600" />Soil Analysis</h3>
            <div className="space-y-4">
              {[
                { label: "pH Level", value: soilData.ph, max: 14, color: "bg-green-500", suffix: "" },
                { label: "Nitrogen (N)", value: soilData.nitrogen, max: 100, color: "bg-blue-500", suffix: "%" },
                { label: "Phosphorus (P)", value: soilData.phosphorus, max: 100, color: "bg-amber-500", suffix: "%" },
                { label: "Potassium (K)", value: soilData.potassium, max: 100, color: "bg-purple-500", suffix: "%" },
                { label: "Organic Matter", value: soilData.organicMatter, max: 10, color: "bg-earth-500", suffix: "%" },
                { label: "Moisture", value: soilData.moisture, max: 100, color: "bg-sky-500", suffix: "%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="text-slate-800 font-semibold">{item.value}{item.suffix}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.value / item.max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className={`h-full rounded-full ${item.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alerts */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {alerts.map((alert, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border p-5 ${alertStyle[alert.type]}`}>
              <alert.icon className={`w-6 h-6 mb-3 ${alertIconColor[alert.type]}`} />
              <h4 className="font-semibold text-slate-800 text-sm mb-1">{alert.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{alert.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Plan Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100"><h3 className="font-display font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-600" />Weekly Action Plan</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 text-left">Crop</th><th className="px-6 py-3 text-left">Action</th><th className="px-6 py-3 text-left">Timing</th><th className="px-6 py-3 text-left">Priority</th></tr></thead>
              <tbody>
                {recommendations.map((r, i) => (
                  <tr key={i} className="border-t border-slate-50 hover:bg-green-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{r.crop}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.action}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{r.timing}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[r.priority]}`}>{r.priority}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
