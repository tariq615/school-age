import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Country } from '@/types';

interface SchoolResult {
  stage: string;
  grade: string;
  age: number;
  entryYear: number | { month: number; day: number };
  graduationYear: number | { month: number; day: number };
}

interface ResultsTableProps {
  results: SchoolResult[];
  country: Country;
  province: string;
}

export default function ResultsTable({ results, country, province }: ResultsTableProps) {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    Preschool: true,
    Primary: true,
    Secondary: true
  });

  const provinceData = country.provinces.find(p => p.id === province);

  const toggleStage = (stage: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stage]: !prev[stage]
    }));
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.stage]) acc[result.stage] = [];
    acc[result.stage].push(result);
    return acc;
  }, {} as Record<string, SchoolResult[]>);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatCutoffDate = (cutoff: { month: number; day: number } | string) => {
    if (typeof cutoff === 'string') return cutoff;
    const monthName = monthNames[cutoff.month - 1] ?? 'Unknown';
    return `${monthName} ${cutoff.day}`;
  };

  const formatYearCell = (value: number | { month: number; day: number }) => {
    if (typeof value === 'number') return value;
    const monthName = monthNames[value.month - 1] ?? 'Unknown';
    return `${monthName} ${value.day}`;
  };

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-blue-600 text-white py-3">
            <CardTitle className="text-lg">
              Key Information: {provinceData?.name || country.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium mr-2">Cut-off date:</span>
                {formatCutoffDate(provinceData?.cutoffDate ?? country.cutoffDate)}
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium mr-2">Starting age:</span>
                {country.startingAge} years
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium mr-2">Preschool mandatory:</span>
                {country.educationSystem.preschool.mandatory ? 'Yes' : 'No'}
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium mr-2">School term starts:</span>
                Usually in August or September
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <Table className="min-w-full rounded-lg overflow-hidden shadow-lg">
            <TableHeader className="bg-blue-600">
              <TableRow className="hover:bg-blue-600">
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">School Stage</TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Grade Level</TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Age</TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Entry Year</TableHead>
                <TableHead className="text-white text-center py-3 px-4 text-sm font-medium">Completion Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedResults).map(([stage, stageResults]) => (
                <React.Fragment key={stage}>
                  <TableRow
                    className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleStage(stage)}
                  >
                    <TableCell colSpan={5} className="font-bold py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>{stage}</span>
                        <Button variant="ghost" size="sm">
                          {expandedStages[stage] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedStages[stage] && stageResults.map((result, index) => (
                    <TableRow key={index} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="py-3 px-4"></TableCell>
                      <TableCell className="py-3 px-4 text-center font-medium">{result.grade}</TableCell>
                      <TableCell className="py-3 px-4 text-center">{result.age} years</TableCell>
                      <TableCell className="py-3 px-4 text-center">{formatYearCell(result.entryYear)}</TableCell>
                      <TableCell className="py-3 px-4 text-center">{formatYearCell(result.graduationYear)}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>


    </div>
  );
}
