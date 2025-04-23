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
import { lessonPlanSchema } from '../lib/lessonPlanSchema';

export default function LessonPlanForm({ onSubmit, onSave, showSave }) {
  const [error, setError] = useState(null);

  const form = useForm({
    validate: zodResolver(lessonPlanSchema),
    initialValues: {
      title: '',
      subject: '',
      ageGroup: '',
      duration: '',
      objective: '',
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

  const handleSaveClick = async () => {
    const validated = lessonPlanSchema.safeParse(form.values);
    if (!validated.success) {
      setError('Please fix the form errors before saving.');
      return;
    }
  
    try {
      await onSave(form.values);
    } catch (err) {
      console.error('Save failed:', err);
      setError('Something went wrong saving the lesson plan.');
    }
  };

  return (
    <Container size="sm" >
    <Paper  shadow="sm" p="lg" radius="md" maw={600} mx="auto"  style={{ backgroundColor: '#5F25D9' }}>
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
          
          
            <details className="mt-4">
                <summary className="cursor-pointer ...">Additional Parameters (optional)</summary>
                <div className="mt-3 space-y-4">
                    <TextInput label="Preferred Activities" placeholder="e.g. hands-on, quiz" {...form.getInputProps('style')} />
                    <Textarea label="Special Notes" placeholder="Any specific needs or adaptations?" {...form.getInputProps('notes')} />
                </div>
            </details>
            {showSave && onSave && (
              <Button
                type="button"
                onClick={handleSaveClick}
                variant="outline"
                fullWidth
                styles={{
                  root: {
                    borderColor: '#00ff99',
                    color: '#00ff99',
                    fontWeight: 'bold',
                    borderRadius: '9999px',
                  },
                }}
              >
                Save Lesson Plan
              </Button>
            )}
          <Group justify="flex-end" mt="md">
            <Button 
            type="submit"
            variant="filled"
            styles={{
                root: {
                  backgroundColor: '#00ff99', 
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                },
              }}
            radius="xl"
            fullWidth
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
