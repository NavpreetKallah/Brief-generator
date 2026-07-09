import { Brief } from "@/app/types";

export function validateBrief(brief: Brief, expectedWeeks: number): boolean {
  if (!brief || typeof brief !== 'object') return false;

  const hasValidMetadata = typeof brief.title === 'string' && typeof brief.overview === 'string';
  const hasValidSkills = Array.isArray(brief.skillsDeveloped);
  const hasValidTimeline = Array.isArray(brief.weekByWeekPlan) && brief.weekByWeekPlan.length === expectedWeeks;

  return hasValidMetadata && hasValidSkills && hasValidTimeline;
}