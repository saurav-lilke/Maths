import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const studyPlan = [
  {
    day: 1,
    topic: "Rational & Irrational Numbers",
    section: "Algebra",
    details: [
      "Definition, properties, representation on number line",
      "Surds and their simplification",
      "Practice problems",
    ],
  },
  {
    day: 2,
    topic: "Indices",
    section: "Algebra",
    details: [
      "Laws of indices",
      "Simplification with positive, negative, fractional indices",
      "Exponential form problems",
    ],
  },
  {
    day: 3,
    topic: "Expansions",
    section: "Algebra",
    details: [
      "Standard identities: (a+b)², (a-b)², (a+b)(a-b)",
      "Application-based problems",
      "20–25 practice problems",
    ],
  },
  {
    day: 4,
    topic: "Factorisation",
    section: "Algebra",
    details: [
      "Common factors, grouping, splitting middle term",
      "Factorisation of algebraic expressions",
      "Division of polynomials",
    ],
  },
  {
    day: 5,
    topic: "Simultaneous Linear Equations",
    section: "Algebra",
    details: [
      "Elimination method",
      "Substitution method",
      "Cross multiplication method",
    ],
  },
  {
    day: 6,
    topic: "Simultaneous Linear Equations (Contd.)",
    section: "Algebra",
    details: ["Word problems", "Mixed exercise"],
  },
  {
    day: 7,
    topic: "Compound Interest",
    section: "Commercial Mathematics",
    details: [
      "Formula: CI = A – P",
      "Annual, half-yearly, quarterly compounding",
      "Practice problems",
    ],
  },
  {
    day: 8,
    topic: "Pythagoras Theorem",
    section: "Geometry",
    details: [
      "Proof of theorem",
      "Applications in right triangles",
      "Problems on isosceles & equilateral triangles",
    ],
  },
  {
    day: 9,
    topic: "Circle",
    section: "Geometry",
    details: [
      "Chord properties",
      "Angle subtended by chord",
      "Cyclic quadrilaterals",
    ],
  },
  {
    day: 10,
    topic: "Statistics – Mean",
    section: "Statistics",
    details: ["Mean: direct method", "Assumed mean method", "Word problems"],
  },
  {
    day: 11,
    topic: "Statistics – Median",
    section: "Statistics",
    details: [
      "Median for discrete data",
      "Median for grouped data",
      "Interpretation problems",
    ],
  },
  {
    day: 12,
    topic: "Coordinate Geometry – Distance Formula",
    section: "Coordinate Geometry",
    details: [
      "Distance formula derivation & problems",
      "Section formula basics",
      "Triangle problems",
    ],
  },
  {
    day: 13,
    topic: "Coordinate Geometry – Graphical Solution",
    section: "Coordinate Geometry",
    details: [
      "Plotting linear equations",
      "Graphical solution of simultaneous equations",
      "Word problems",
    ],
  },
  {
    day: 14,
    topic: "Revision & Practice",
    section: "Others",
    details: [
      "Full syllabus revision",
      "Past years’ ICSE questions",
      "Mock test",
    ],
  },
];

const sections = [
  "Algebra",
  "Commercial Mathematics",
  "Geometry",
  "Statistics",
  "Coordinate Geometry",
  "Others",
];

export default function StudyApp() {
  const [day, setDay] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);

  const toggleCompletion = (dayIndex) => {
    if (completedDays.includes(dayIndex)) {
      setCompletedDays(completedDays.filter((d) => d !== dayIndex));
    } else {
      setCompletedDays([...completedDays, dayIndex]);
    }
  };

  const progressData = sections.map((section) => {
    const total = studyPlan.filter((s) => s.section === section).length;
    const completed = studyPlan.filter(
      (s, idx) => s.section === section && completedDays.includes(idx)
    ).length;
    return { section, total, completed };
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid gap-6 place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="rounded-2xl shadow-lg p-6 bg-white mb-6">
          <CardContent>
            <h1 className="text-2xl font-bold text-center mb-4">
              ICSE Class IX Maths 14-Day Study Plan
            </h1>
            <h2 className="text-xl font-semibold mb-2">
              Day {studyPlan[day].day}: {studyPlan[day].topic}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Section: {studyPlan[day].section}
            </p>
            <ul className="list-disc list-inside space-y-1">
              {studyPlan[day].details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <div className="flex justify-between mt-6">
              <Button
                onClick={() =>
                  setDay((day - 1 + studyPlan.length) % studyPlan.length)
                }
              >
                Previous
              </Button>
              <Button
                onClick={() => toggleCompletion(day)}
                variant={
                  completedDays.includes(day) ? "destructive" : "default"
                }
              >
                {completedDays.includes(day)
                  ? "Mark as Incomplete"
                  : "Mark as Completed"}
              </Button>
              <Button onClick={() => setDay((day + 1) % studyPlan.length)}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar Chart */}
        <Card className="rounded-2xl shadow-lg p-6 bg-white">
          <CardContent>
            <h2 className="text-xl font-bold mb-4 text-center">
              Study Progress by Section
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" name="Total Chapters" />
                <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
