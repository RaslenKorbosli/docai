'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UploadDocumentForm from '@/components/UploadDocumentForm';
import { useState } from 'react';
export default function AddNewDocument() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button variant="default">Add document</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
          <DialogDescription>
            Add your document and start ask questions.
          </DialogDescription>
        </DialogHeader>
        <UploadDocumentForm setOpenForm={setOpenForm} />
      </DialogContent>
    </Dialog>
  );
}
