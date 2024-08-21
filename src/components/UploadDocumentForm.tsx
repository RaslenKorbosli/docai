'use client';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useToast } from './ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { delay } from '@/lib/helper';

const formSchema = z.object({
  docName: z.string().min(1).max(20),
  file: z.instanceof(File),
});
//---------
export default function UploadDocumentForm({
  setOpenForm,
}: {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useUser();
  const { toast } = useToast();
  const [progressBar, setProgressBar] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docName: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const generateUploadUrl = useMutation(api.document.generateUploadUrl);
  const addDocument = useMutation(api.document.addDocument);
  function progressBarTimeOut() {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setProgressBar((prv) => {
        if (prv < 90) return prv + 10;
        else {
          clearInterval(interval);
          return prv;
        }
      });
      if (form.formState.isSubmitted) {
        setProgressBar(100);
        clearInterval(interval);
      }
    }, 500);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    progressBarTimeOut();
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': values.file!.type },
      body: values.file,
    });
    const { storageId } = await result.json();
    await addDocument({
      docName: values.docName,
      userId: user.user?.id!,
      documentStorageId: storageId,
    });
    toast({
      title: 'Document add successfully',
      description: 'Start asking question about your document!',
      className: 'bg-green-400 text-white ',
    });

    form.reset();
    setOpenForm(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="docName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label>Document name</Label>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...restProps } }) => (
            <FormItem className="flex-1">
              <Label>File</Label>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  {...restProps}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(file);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Progress value={progressBar} />

        <DialogFooter className="sm:justify-start flex gap-2 pt-6 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="flex items-center justify-center"
            disabled={isLoading}
          >
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
