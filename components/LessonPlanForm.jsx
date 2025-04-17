'use client';

import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Stack,
  Notification,
  Paper,
  Container,
  Title,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subject: z.string().min(2, 'Please enter a subject'),
  ageGroup: z.enum(['KS1', 'KS2', 'KS3', 'KS4', 'KS5'], {
    errorMap: () => ({ message: 'Select a valid age group' }),
  }),
  duration: z
    .string()
    .min(2, 'Please specify a duration')
    .refine((val) => /^\d+\s*(mins|min|minutes)$/.test(val.trim().toLowerCase()), {
      message: 'Use format like "45 mins"',
    }),
  objective: z.string().min(5, 'Objective must be more descriptive'),
  keywords: z.string().optional(),
  style: z.string().optional(),
  notes: z.string().optional(),
});

export default function LessonPlanForm({ onSubmit }) {
  const [error, setError] = useState(null);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: '',
      subject: '',
      ageGroup: '',
      duration: '',
      objective: '',
      keywords: '',
      style: '',
      notes: '',
    },
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const cleanedValues = Object.fromEntries(
          Object.entries(values).map(([key, val]) => [key, val?.trim?.() || ''])
        );
        await onSubmit(cleanedValues);
      } catch (err) {
        console.error(err);
        setError('Something went wrong generating the lesson plan.');
      }
    },
    [onSubmit]
  );

  return (
    <Container size="sm" mt="xl">
    <Paper withBorder shadow="sm" p="lg" radius="md" maw={600} mx="auto" mt="xl">
      <Title order={2} mb="md">Create a Lesson Plan</Title>
      {error && <Notification color="red" mb="md">{error}</Notification>}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Lesson Title" placeholder="e.g. Exploring Volcanoes" {...form.getInputProps('title')} required />
          <TextInput label="Subject" placeholder="e.g. Geography" {...form.getInputProps('subject')} required />
          <Select
            label="Age Group"
            placeholder="Select age group"
            data={['KS1', 'KS2', 'KS3', 'KS4', 'KS5']}
            {...form.getInputProps('ageGroup')}
            required
          />
          <TextInput label="Duration" placeholder="e.g. 45 mins" {...form.getInputProps('duration')} required />
          <Textarea label="Objective" placeholder="What should students learn?" {...form.getInputProps('objective')} required />
          <TextInput label="Keywords" placeholder="e.g. volcano, lava, eruption" {...form.getInputProps('keywords')} />
          <TextInput label="Preferred Activities" placeholder="e.g. hands-on, quiz" {...form.getInputProps('style')} />
          <Textarea label="Special Notes" placeholder="Any specific needs or adaptations?" {...form.getInputProps('notes')} />
          <Group justify="flex-end" mt="md">
            <Button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-medium"
            >
                Generate Lesson Plan
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
    </Container>
  );
}
