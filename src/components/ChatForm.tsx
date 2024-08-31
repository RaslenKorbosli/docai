'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction, useMutation, useQuery } from 'convex/react';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

const formSchema = z.object({
  question: z.string().min(1).max(100),
});
export default function ChatForm({
  userId,
  documentId,
}: {
  userId: Id<'users'>;
  documentId: Id<'documents'>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const generateResponse = useAction(api.chat.generateConversation);
  const addChatHistory = useAction(api.chat.addChatHistory);
  const chatConversation = useQuery(api.chat.getConversationRecords, {
    fileId: documentId,
    userId: userId,
  });
  const updateLastConversationDate = useMutation(
    api.chat.updateLastConversationDate
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await generateResponse({
      question: values.question,
      userId: userId,
      fileId: documentId,
    });
    chatConversation?.length === 0
      ? addChatHistory({
          fileId: documentId,
          userId: userId,
          lastQuestion: values.question,
        })
      : updateLastConversationDate({
          fileId: documentId,
          userId: userId,
          lastQuestion: values.question,
        });
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
