'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { useAction } from 'convex/react';

const formSchema = z.object({
  question: z.string().min(1).max(100),
});
export default function ChatForm({ userId }: { userId: Id<'users'> }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const generateResponse = useAction(api.chat.generateConversation);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await generateResponse({ question: values.question, userId: userId });
    console.log(userId);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ask ai about your document"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="flex items-center justify-center">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
