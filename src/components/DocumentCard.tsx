'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import '@/PDF';
import { useMutation, useQuery } from 'convex/react';
import { EllipsisVertical, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Document, Page } from 'react-pdf';
import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useToast } from './ui/use-toast';

export default function DocumentCard({
  document,
}: {
  document: Doc<'documents'>;
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const { toast } = useToast();
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    documentStorageId: document?.documentStorageId!,
  });
  const deleteDocument = useMutation(api.document.deleteDocument);
  return (
    <>
      <Card className="flex flex-col !overflow-hidden justify-between w-[294px] h-[421px] hover:shadow-lg">
        <CardHeader className="flex justify-between flex-row items-center ">
          <div className="flex gap-2 flex-row items-center mt-[6px]">
            <Image src="/pdfLogo.svg" width={25} height={25} alt="pdf logo" />
            <CardTitle>{document.docName}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
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
                className="text-red-600 focus:text-red-500"
                onClick={() => {
                  setOpenAlert(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="self-center ">
          <div className="relative  aspect-square h-fit w-fit ">
            <Document file={documentFileUrl} noData={''} loading={'loading...'}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className=""
                scale={0.4}
              />
            </Document>
          </div>
        </CardContent>
      </Card>
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
                  documentId: document._id,
                  documentStorageId: document.documentStorageId,
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
