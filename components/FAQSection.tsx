import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "What is the cut-off date for school entry?",
      answer: "The cut-off date varies by country and region. It is the date by which a child must reach a certain age to be eligible for school entry in that academic year."
    },
    {
      question: "Can I use this calculator for multiple countries?",
      answer: "Yes, our calculator supports multiple countries including the United States, Canada, Australia, India, Pakistan, China, and the United Arab Emirates."
    },
    {
      question: "How accurate is the calculator?",
      answer: "We strive to provide the most accurate information based on official education department guidelines. However, we recommend verifying with your local school authorities for the most current information."
    },
    {
      question: "What if my child has a summer birthday?",
      answer: "Children with summer birthdays may have the option to start school either earlier or later depending on the cut-off dates and local policies. Our calculator takes these factors into account."
    },
    {
      question: "Do you include special education considerations?",
      answer: "Our calculator provides general guidelines based on standard education systems. For special education needs, we recommend consulting with your local school district for specific accommodations and options."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 text-gray-900"
      >
        Frequently Asked Questions
      </motion.h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
              />
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;