'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe, ChevronDown, Search } from 'lucide-react';
import { getAllCountries, getCountryById } from '@/lib/data/countries';

interface CalculatorFormProps {
  country: string;
  setCountry: (country: string) => void;
  province: string;
  setProvince: (province: string) => void;
  birthDate: { day: string; month: string; year: string };
  setBirthDate: (birthDate: { day: string; month: string; year: string }) => void;
  currentAge: number | null;
}

export default function CalculatorForm({
  country,
  setCountry,
  province,
  setProvince,
  birthDate,
  setBirthDate,
  currentAge,
}: CalculatorFormProps) {
  const countries = getAllCountries();
  const selectedCountryData = getCountryById(country);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 16 }, (_, i) => (2010 + i).toString());

  const updateBirthDate = (field: 'day' | 'month' | 'year', value: string) => {
    setBirthDate({
      ...birthDate,
      [field]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto"
    >
      <div className="space-y-6">

        {/* Country */}
        <div className="space-y-2">
          <label className="flex items-center text-base font-semibold text-gray-800">
            <Globe className="h-5 w-5 text-blue-600 mr-2" />
            Location
          </label>
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <Search className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* State/Province */}
        <div className="space-y-2">
          <label className="flex items-center text-base font-semibold text-gray-800">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            {selectedCountryData?.provinces.length ? (country === "us" ? "State" : "Province") : "Region"}
          </label>
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={!selectedCountryData?.provinces.length}
            >
              <option value="">Select {country === "us" ? "State" : "Province"}</option>
              {selectedCountryData?.provinces.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* DOB */}
        <div className="space-y-2">
          <label className="flex items-center text-base font-semibold text-gray-800">
            <Calendar className="h-5 w-5 text-green-600 mr-2" />
            Child Date of Birth
          </label>
          <div className="grid grid-cols-10 gap-3">
            {/* Day (30%) */}
            <div className="relative col-span-4">
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={birthDate.day || "1"}
                onChange={(e) => updateBirthDate("day", e.target.value)}
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Month (70%) */}
            <div className="relative col-span-6">
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={birthDate.month || "1"}
                onChange={(e) => updateBirthDate("month", e.target.value)}
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Year */}
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={birthDate.year || ""}
              onChange={(e) => updateBirthDate("year", e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Age Result */}
        {currentAge !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center"
          >
            <p className="text-blue-700 text-base font-medium">
              Your child is currently <strong>{currentAge} years old</strong>.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
