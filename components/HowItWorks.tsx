import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface HowItWorksProps {
  scrollToCalculator: () => void;
}

const HowItWorks = ({ scrollToCalculator }: HowItWorksProps) => {
  const steps = [
    {
      title: "Select Your Country",
      description: "Choose from supported countries including USA, Canada, Australia, India, and more."
    },
    {
      title: "Choose Your State/Province",
      description: "Select your region to get accurate local education information."
    },
    {
      title: "Enter Birth Date",
      description: "Provide your child's date of birth using our intuitive dropdown selectors."
    },
    {
      title: "Get Results",
      description: "View a detailed timeline of your child's education journey from preschool to high school."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-4 text-gray-900"
      >
        How It Works
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-gray-600 mb-12"
      >
        Our calculator uses official education department guidelines to determine school entry dates
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
            </div>
            <p className="text-gray-600 ml-12">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <Button 
          onClick={scrollToCalculator}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full"
        >
          <Play className="mr-2 h-5 w-5" fill="white" />
          Try It Now
        </Button>
      </motion.div>
    </div>
  );
};

export default HowItWorks;