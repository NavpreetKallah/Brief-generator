import { expect, test } from 'vitest';
import { validateBrief } from './validateBrief';

const brief = {
    title: "Practice Iced Tea Project",
    overview: "A test overview sentence one. A test overview sentence two.",
    weekByWeekPlan: ["Week 1: Market Research", "Week 2: Final Presentation"], 
    skillsDeveloped: ["Marketing", "Strategy"]
  };

test('Rejects a brief where the number of weeks does not match the input', () => {
  const isValid = validateBrief(brief, 4);
  expect(isValid).toBe(false);
});

test('Accepts a brief where the number of weeks does match the input', () => {
  const isValid = validateBrief(brief, 2);
  expect(isValid).toBe(true);
});