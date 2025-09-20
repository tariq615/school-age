// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { Country } from '@/types';

// interface SchoolResult {
//   stage: string;
//   grade: string;
//   age: number;
//   entryYear: number | { month: number; day: number };
//   graduationYear: number | { month: number; day: number };
// }

// interface ResultsTableProps {
//   results: SchoolResult[];
//   country: Country;
//   province: string;
// }

// export default function ResultsTable({ results, country, province }: ResultsTableProps) {
//   const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
//     Preschool: true,
//     Primary: true,
//     Secondary: true
//   });

//   const provinceData = country.provinces.find(p => p.id === province);

//   const toggleStage = (stage: string) => {
//     setExpandedStages(prev => ({
//       ...prev,
//       [stage]: !prev[stage]
//     }));
//   };

//   const groupedResults = results.reduce((acc, result) => {
//     if (!acc[result.stage]) acc[result.stage] = [];
//     acc[result.stage].push(result);
//     return acc;
//   }, {} as Record<string, SchoolResult[]>);

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const formatCutoffDate = (cutoff: { month: number; day: number } | string) => {
//     if (typeof cutoff === 'string') return cutoff;
//     const monthName = monthNames[cutoff.month - 1] ?? 'Unknown';
//     return `${monthName} ${cutoff.day}`;
//   };

//   const formatYearCell = (value: number | { month: number; day: number }) => {
//     if (typeof value === 'number') return value;
//     const monthName = monthNames[value.month - 1] ?? 'Unknown';
//     return `${monthName} ${value.day}`;
//   };

//   return (
//     <div className="space-y-6">

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
//           <CardHeader className="bg-blue-600 text-white py-3">
//             <CardTitle className="text-lg">
//               Key Information: {provinceData?.name || country.name}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//               <div className="flex items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="font-medium mr-2">Cut-off date:</span>
//                 {formatCutoffDate(provinceData?.cutoffDate ?? country.cutoffDate)}
//               </div>
//               <div className="flex items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="font-medium mr-2">Starting age:</span>
//                 {country.startingAge} years
//               </div>
//               <div className="flex items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="font-medium mr-2">Preschool mandatory:</span>
//                 {country.educationSystem.preschool.mandatory ? 'Yes' : 'No'}
//               </div>
//               <div className="flex items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="font-medium mr-2">School term starts:</span>
//                 Usually in August or September
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="overflow-x-auto">
//           <Table className="min-w-full rounded-lg overflow-hidden shadow-lg">
//             <TableHeader className="bg-blue-600">
//               <TableRow className="hover:bg-blue-600">
//                 <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">School Stage</TableHead>
//                 <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Grade Level</TableHead>
//                 <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Age</TableHead>
//                 <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Entry Year</TableHead>
//                 <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Completion Year</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Object.entries(groupedResults).map(([stage, stageResults]) => (
//                 <React.Fragment key={stage}>
//                   <TableRow
//                     className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => toggleStage(stage)}
//                   >
//                     <TableCell colSpan={5} className="font-bold py-3 px-4">
//                       <div className="flex items-center justify-between">
//                         <span>{stage}</span>
//                         <Button variant="ghost" size="sm">
//                           {expandedStages[stage] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>

//                   {expandedStages[stage] && stageResults.map((result, index) => (
//                     <TableRow key={index} className="hover:bg-blue-50 transition-colors">
//                       <TableCell className="py-3 px-4"></TableCell>
//                       <TableCell className="py-3 px-4 text-center font-medium">{result.grade}</TableCell>
//                       <TableCell className="py-3 px-4 text-center">{result.age} years</TableCell>
//                       <TableCell className="py-3 px-4 text-center">{formatYearCell(result.entryYear)}</TableCell>
//                       <TableCell className="py-3 px-4 text-center">{formatYearCell(result.graduationYear)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </motion.div>


//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Pencil,
  BookOpen,
  GraduationCap,
} from "lucide-react"; // icons

import { Country } from "@/types";

interface SchoolResult {
  stage: string;
  grade: string;
  entryYear: number | { month: number; day: number };
}

interface ResultsTableProps {
  results: SchoolResult[];
  country: Country;
  province: string;
}

export default function ResultsTable({
  results,
  country,
  province,
}: ResultsTableProps) {
  const provinceData = country.provinces.find((p) => p.id === province);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatCutoffDate = (
    cutoff: { month: number; day: number } | string
  ): string => {
    if (typeof cutoff === "string") return cutoff;
    const monthName = monthNames[cutoff.month - 1] ?? "Unknown";
    return `${monthName} ${cutoff.day}`;
  };

  const formatYearCell = (value: number | { month: number; day: number }) => {
    if (typeof value === "number") return value;
    const monthName = monthNames[value.month - 1] ?? "Unknown";
    return `${monthName} ${value.day}`;
  };

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "preschool":
        return <Home className="h-5 w-5 text-blue-500" />;
      case "elementary":
        return <Pencil className="h-5 w-5 text-green-500" />;
      case "middle school":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      case "high school":
        return <GraduationCap className="h-5 w-5 text-orange-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-md border rounded-xl overflow-hidden max-w-2xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3">
            <CardTitle className="text-base font-semibold">
              Key Info: {provinceData?.name || country.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-sm space-y-2">
            <p>
              <span className="font-medium">Cut-off date:</span>{" "}
              {formatCutoffDate(provinceData?.cutoffDate ?? country.cutoffDate)}
            </p>
            <p>
              <span className="font-medium">Starting age:</span>{" "}
              {country.startingAge} years
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto max-w-2xl mx-auto">
          <Table className="min-w-full rounded-xl shadow-md border">
            <TableHeader className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <TableRow>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">
                  School Stage
                </TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">
                  Grade Level
                </TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">
                  Year of Entry
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell className="py-3 px-4 text-sm flex items-center gap-2 text-gray-700 font-medium">
                    {getStageIcon(result.stage)}
                    {result.stage}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center text-sm font-semibold text-gray-800">
                    {result.grade}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center text-sm text-gray-600">
                    {formatYearCell(result.entryYear)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
