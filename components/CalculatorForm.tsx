'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe } from 'lucide-react';
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

  // Generate days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  // Months list
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
    { value: "12", label: "December" }
  ];
  
  // Generate years (2010-2025)
  const years = Array.from({ length: 16 }, (_, i) => (2010 + i).toString());

  const updateBirthDate = (field: 'day' | 'month' | 'year', value: string) => {
    setBirthDate({
      ...birthDate,
      [field]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <div className="space-y-6">
        {/* Country Selection */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Globe className="h-4 w-4 text-blue-600 mr-2" />
            Country
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((countryData) => (
              <option key={countryData.id} value={countryData.id}>{countryData.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
            {selectedCountryData?.provinces.length ? (country === "us" ? "State" : "Province") : "Region"}
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            disabled={!selectedCountryData?.provinces.length}
          >
            <option value="">Select {country === "us" ? "State" : "Province"}</option>
            {selectedCountryData?.provinces.map((province) => (
              <option key={province.id} value={province.id}>{province.name}</option>
            ))}
          </select>
        </div>

        {/* DOB */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 text-green-600 mr-2" />
            Child Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* Day */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={birthDate.day}
              onChange={(e) => updateBirthDate("day", e.target.value)}
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            {/* Month */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={birthDate.month}
              onChange={(e) => updateBirthDate("month", e.target.value)}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>

            {/* Year */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={birthDate.year}
              onChange={(e) => updateBirthDate("year", e.target.value)}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Age Result */}
        {currentAge !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-blue-50 rounded-md border border-blue-100 text-center"
          >
            <p className="text-blue-700">
              Your child is currently <strong>{currentAge} years old</strong>.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}