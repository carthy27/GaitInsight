import React from 'react';
export interface GaitMetrics {
  subject_id: string;
  file_name: string;
  activity_type: string;
  VERTICAL_OSCILLATION: number;
  VERTICAL_OSCILLATION_ASYMMETRY: number;
  STRIDE_LENGTH: number;
  STRIDE_LENGTH_ASYMMETRY: number;
  STRIDE_RATE: number;
  STRIDE_RATE_ASYMMETRY: number;
  STEP_WIDTH: number;
  STEP_WIDTH_ASYMMETRY: number;
  STANCE_TIME?: number;
  STANCE_TIME_ASYMMETRY?: number;
  SWING_TIME?: number;
  SWING_TIME_ASYMMETRY?: number;
  FOOT_PROG_ANGLE?: number;
  FOOT_PROG_ANGLE_ASYMMETRY?: number;
  ANKLE_DF_PEAK_ANGLE?: number;
  ANKLE_DF_PEAK_ANGLE_ASYMMETRY?: number;
  ANKLE_EVE_PEAK_ANGLE?: number;
  ANKLE_EVE_PEAK_ANGLE_ASYMMETRY?: number;
  KNEE_FLEX_PEAK_ANGLE?: number;
  KNEE_FLEX_PEAK_ANGLE_ASYMMETRY?: number;
  HIP_EXT_PEAK_ANGLE?: number;
  HIP_EXT_PEAK_ANGLE_ASYMMETRY?: number;
  PRONATION_ONSET?: number;
  PRONATION_ONSET_ASYMMETRY?: number;
  PRONATION_OFFSET?: number;
  PRONATION_OFFSET_ASYMMETRY?: number;
  form_score: number;
  date?: string; // Will extract from file_name
}

// Get date string from filename format '20101005T132240.json'
const extractDateFromFilename = (filename: string): string => {
  if (!filename) return '';
  
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})T/);
  if (match) {
    const [_, year, month, day] = match;
    return `${year}-${month}-${day}`;
  }
  return '';
};

// Sample data - running examples extracted from the CSV data
const runningGaitMetrics: GaitMetrics[] = [
  // Example 1: High-performing runner
  {
    subject_id: "100891",
    file_name: "20140108T132240.json",
    activity_type: "running",
    VERTICAL_OSCILLATION: 65.78956044688327,
    VERTICAL_OSCILLATION_ASYMMETRY: 5.324789154620745,
    STRIDE_LENGTH: 2.1347826086956523,
    STRIDE_LENGTH_ASYMMETRY: 1.3698630136986314,
    STRIDE_RATE: 85.71428571428571,
    STRIDE_RATE_ASYMMETRY: 1.4084507042253522,
    STEP_WIDTH: 0.08912453774770883,
    STEP_WIDTH_ASYMMETRY: 0.0,
    FOOT_PROG_ANGLE: -2.2358216790641686,
    FOOT_PROG_ANGLE_ASYMMETRY: -98.35964012298584,
    KNEE_FLEX_PEAK_ANGLE: -39.98794462153831,
    KNEE_FLEX_PEAK_ANGLE_ASYMMETRY: -10.354898336414565,
    form_score: 78.92475366781059
  },
  // Example 2: Mid-range runner
  {
    subject_id: "100763",
    file_name: "20140412T103748.json",
    activity_type: "running",
    VERTICAL_OSCILLATION: 72.44906287658924,
    VERTICAL_OSCILLATION_ASYMMETRY: 12.452381904761901,
    STRIDE_LENGTH: 1.8760000000000001,
    STRIDE_LENGTH_ASYMMETRY: 3.174603174603177,
    STRIDE_RATE: 81.96721311475409,
    STRIDE_RATE_ASYMMETRY: 3.174603174603177,
    STEP_WIDTH: 0.09823731923237961,
    STEP_WIDTH_ASYMMETRY: 0.0,
    FOOT_PROG_ANGLE: -6.812325022583633,
    FOOT_PROG_ANGLE_ASYMMETRY: -35.71802250361977,
    KNEE_FLEX_PEAK_ANGLE: -38.77892251411192,
    KNEE_FLEX_PEAK_ANGLE_ASYMMETRY: -8.572596773716648,
    form_score: 54.37862913654621
  },
  // Example 3: Beginner runner
  {
    subject_id: "100532",
    file_name: "20130215T121750.json",
    activity_type: "running",
    VERTICAL_OSCILLATION: 89.28439172322936,
    VERTICAL_OSCILLATION_ASYMMETRY: 18.75,
    STRIDE_LENGTH: 1.5520000000000005,
    STRIDE_LENGTH_ASYMMETRY: 7.377049180327875,
    STRIDE_RATE: 76.27118644067797,
    STRIDE_RATE_ASYMMETRY: 7.377049180327875,
    STEP_WIDTH: 0.10923579608657012,
    STEP_WIDTH_ASYMMETRY: 0.0,
    FOOT_PROG_ANGLE: -9.327463224689812,
    FOOT_PROG_ANGLE_ASYMMETRY: -45.68923463489523,
    KNEE_FLEX_PEAK_ANGLE: -36.27582361243792,
    KNEE_FLEX_PEAK_ANGLE_ASYMMETRY: -15.924398625429556,
    form_score: 31.67289548732564
  }
];

// Add date property to each record
const gaitMetricsWithDates = runningGaitMetrics.map(metrics => ({
  ...metrics,
  date: extractDateFromFilename(metrics.file_name)
}));

// Get a specific subject by ID
export const getSubjectById = (id: string): GaitMetrics | undefined => {
  return gaitMetricsWithDates.find(metrics => metrics.subject_id === id);
};

// Get all subjects
export const getAllSubjects = (): GaitMetrics[] => {
  return gaitMetricsWithDates;
};

// Get only running subjects
export const getRunningSubjects = (): GaitMetrics[] => {
  return gaitMetricsWithDates.filter(metrics => 
    metrics.activity_type.toLowerCase() === 'running'
  );
};

// Get top subjects by form score
export const getTopSubjects = (count: number = 3): GaitMetrics[] => {
  return [...gaitMetricsWithDates]
    .sort((a, b) => b.form_score - a.form_score)
    .slice(0, count);
};

export default GaitMetrics;