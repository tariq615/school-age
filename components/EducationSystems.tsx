import { motion } from 'framer-motion';
import { Globe, BookOpen, GraduationCap } from 'lucide-react';

const EducationSystems = () => {
  const systems = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Coverage",
      description: "Our calculator supports education systems from around the world, with detailed information for each country."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Accurate Data",
      description: "We regularly update our information based on official education department guidelines and policy changes."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Complete Journey",
      description: "From preschool to high school graduation, see your child's complete educational timeline."
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
        Education Systems
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-gray-600 mb-12"
      >
        Education systems vary by country and region. Our calculator accounts for these differences to provide accurate results.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {systems.map((system, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <div className="flex justify-center mb-4">
              {system.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{system.title}</h3>
            <p className="text-gray-600">{system.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationSystems;