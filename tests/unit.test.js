import { buildLessonPrompt } from "../utils/buildLessonPrompt";
import { lessonPlanSchema} from "../lib/lessonPlanSchema";

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

describe('Prompt Builder', () => {
    const baseData = {
      title: 'Cold War Origins',
      subject: 'History',
      ageGroup: 'KS3',
      duration: '60 mins',
      objective: 'Understand the causes of the Cold War',
    };
  
    it('includes all required ## section headings', () => {
      const result = buildLessonPrompt({ ...baseData });
  
      expect(result).toMatch(/## Learning Objectives/);
      expect(result).toMatch(/## Introduction/);
      expect(result).toMatch(/## Main Activities/);
      expect(result).toMatch(/## Differentiation Strategies/);
      expect(result).toMatch(/## Engagement Strategy/);
      expect(result).toMatch(/## Extension Tasks/);
      expect(result).toMatch(/## Digital Teaching Resources/);
      expect(result).toMatch(/## Conclusion/);
    });
  
    it('includes title, subject, and duration', () => {
      const result = buildLessonPrompt({ ...baseData });
  
      expect(result).toMatch(/lesson topic is: "Cold War Origins"/);
      expect(result).toMatch(/subject is: "History"/);
      expect(result).toMatch(/total lesson duration is: "60 mins"/);
      expect(result).toMatch(/learning objective is: "Understand the causes of the Cold War"/);
    });
  });  