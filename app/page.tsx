'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CalculatorForm from '@/components/CalculatorForm';
import ResultsTable from '@/components/ResultsTable';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';
import EducationSystems from '@/components/EducationSystems';
import { getCountryById } from '@/lib/data/countries';
import { calculateSchoolYears, getCurrentAge } from '@/lib/utils';
import { CalculationResult } from '@/types';

export default function Home() {
  const [country, setCountry] = useState("us");
  const [province, setProvince] = useState("");
  const [birthDate, setBirthDate] = useState({ day: '', month: '', year: '' });
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [currentAge, setCurrentAge] = useState<number | null>(null);
  
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const selectedCountryData = getCountryById(country);

  // Set default province when country changes
  useEffect(() => {
    if (selectedCountryData && selectedCountryData.provinces.length > 0) {
      setProvince(selectedCountryData.provinces[0].id);
    } else {
      setProvince("");
    }
    setResults([]);
    setCurrentAge(null);
  }, [country, selectedCountryData]);

  const calculateSchoolInfo = useCallback(() => {
    const { day, month, year } = birthDate;
    if (!day || !month || !year) return;
    
    const birthDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const birthDateObj = new Date(birthDateStr);
    
    if (isNaN(birthDateObj.getTime())) return;
    
    if (!selectedCountryData) return;
    
    const age = getCurrentAge(birthDateObj);
    setCurrentAge(age);
    
    const selectedProvince = selectedCountryData.provinces.find(p => p.id === province) || selectedCountryData;
    const calculatedResults = calculateSchoolYears(birthDateObj, selectedCountryData, selectedProvince);
    
    setResults(calculatedResults);
    
    // Scroll to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [birthDate, province, selectedCountryData]);

  useEffect(() => {
  const { day, month, year } = birthDate;
  if (day && month && year && province && country) {
    calculateSchoolInfo();
  }
}, [birthDate, province, country, calculateSchoolInfo]);



  const scrollToSection = (section: string) => {
    let ref = calculatorRef;
    
    switch(section) {
      case 'results': ref = resultsRef; break;
      case 'how-it-works': ref = howItWorksRef; break;
      case 'education': ref = educationRef; break;
      case 'faq': ref = faqRef; break;
      default: ref = calculatorRef;
    }
    
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute left-1/2 top-1/4 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute left-1/3 top-2/3 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              School Age Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover when your child can start school based on your location and their birth date
            </p>
          </motion.div>

          <div ref={calculatorRef} className="max-w-4xl mx-auto">
            <CalculatorForm
              country={country}
              setCountry={setCountry} 
              province={province}
              setProvince={setProvince}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              currentAge={currentAge}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results.length > 0 && selectedCountryData && (
        <section ref={resultsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">School Entry Timeline</h2>
              <ResultsTable 
                results={results} 
                country={selectedCountryData} 
                province={province} 
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <HowItWorks scrollToCalculator={() => scrollToSection('calculator')} />
        </div>
      </section>

      {/* Education Systems Section */}
      <section ref={educationRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <EducationSystems />
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <FAQSection />
        </div>
      </section>
    </div>
  );
}