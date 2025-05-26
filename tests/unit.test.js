import { buildLessonPrompt } from '../utils/buildLessonPrompt.js';
import { lessonPlanSchema } from '../lib/lessonPlanSchema.js';


/**
 * Tests for lessonPlanSchema
 *
 * Ensures valid lesson data passes, and invalid cases fail,
 */

describe('Lesson Plan Schema', () => {
    it('accepts valid input', () => {
      const valid = {
        title: 'Cold War Origins',
        subject: 'History',
        ageGroup: 'KS4',
        duration: '45 mins',
        objective: 'Understand the causes of the Cold War',
      };
      const result = lessonPlanSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  
    it('rejects short title', () => {
      const result = lessonPlanSchema.safeParse({
        title: 'Hi',
        subject: 'History',
        ageGroup: 'KS4',
        duration: '45 mins',
        objective: 'Explore events',
      });
      expect(result.success).toBe(false);
    });
  
    it('rejects missing subject', () => {
      const result = lessonPlanSchema.safeParse({
        title: 'Cold War',
        subject: '',
        ageGroup: 'KS4',
        duration: '45 mins',
        objective: 'Understand the Cold War',
      });
      expect(result.success).toBe(false);
    });
  
    it('rejects invalid ageGroup', () => {
      const result = lessonPlanSchema.safeParse({
        title: 'Cold War',
        subject: 'History',
        ageGroup: 'Primary', 
        duration: '45 mins',
        objective: 'Understand the Cold War',
      });
      expect(result.success).toBe(false);
    });
  
    it('rejects bad duration format', () => {
      const result = lessonPlanSchema.safeParse({
        title: 'Cold War',
        subject: 'History',
        ageGroup: 'KS3',
        duration: 'forty-five', 
        objective: 'Understand the Cold War',
      });
      expect(result.success).toBe(false);
    });
  
    it('rejects short objective', () => {
      const result = lessonPlanSchema.safeParse({
        title: 'Cold War',
        subject: 'History',
        ageGroup: 'KS3',
        duration: '45 mins',
        objective: 'Know', 
      });
      expect(result.success).toBe(false);
    });
  });

/**
 * Tests for buildLessonPrompt utility
 *
 * Ensures accurate input to be passed for prompt generation then OpenAI.
 */

  describe('Prompt Builder', () => {
    const baseData = {
      title: 'Cold War Origins',
      subject: 'History',
      ageGroup: 'KS3',
      duration: '60 mins',
      objective: 'Understand the causes of the Cold War',
    };
  
    it('correctly interpolates core lesson details', () => {
      const result = buildLessonPrompt(baseData);
  
      expect(result).toMatch(/lesson topic is: "Cold War Origins"/);
      expect(result).toMatch(/subject is: "History"/);
      expect(result).toMatch(/target group is: "KS3"/);
      expect(result).toMatch(/total lesson duration is: "60 mins"/);
      expect(result).toMatch(/learning objective is: "Understand the causes of the Cold War"/);
    });
  
    it('includes optional "style" when user fills it in', () => {
      const result = buildLessonPrompt({ ...baseData, style: 'Group work' });
      expect(result).toMatch(/teaching approach: "Group work"/);
    });
  
    it('excludes "style" when not filled out', () => {
      const result = buildLessonPrompt({ ...baseData, style: undefined });
      expect(result).not.toMatch(/teaching approach/);
    });
  
    it('includes optional "notes" when user fills it in', () => {
      const result = buildLessonPrompt({ ...baseData, notes: 'Use BBC Bitesize' });
      expect(result).toMatch(/additional context or classroom adaptations: "Use BBC Bitesize"/);
    });
  
    it('excludes "notes" when not filled out', () => {
      const result = buildLessonPrompt({ ...baseData, notes: undefined });
      expect(result).not.toMatch(/additional context/);
    });
  });