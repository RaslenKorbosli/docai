'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import '@/PDF';
import { useAction, useMutation, useQuery } from 'convex/react';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { useToast } from './ui/use-toast';

export default function DropMenuOptions({
  document,
}: {
  document: Doc<'documents'>;
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const { toast } = useToast();
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    fileStorageId: document?.fileStorageId!,
  });

  const deleteDocument = useMutation(api.document.deleteDocument);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/chat/${document._id}`}>AI chat</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={documentFileUrl ?? ''} target="_blanc">
              Download
            </Link>{' '}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-600"
            onClick={() => {
              setOpenAlert(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              document .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteDocument({
                  fileId: document._id,
                  userId: document.userId,
                  fileStorageId: document.fileStorageId,
                });
                toast({
                  title: 'Document deleted successfully',
                  className: 'bg-green-400 text-white ',
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
