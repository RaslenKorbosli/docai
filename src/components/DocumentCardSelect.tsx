'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import '@/PDF';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { useToast } from './ui/use-toast';
import Link from 'next/link';

export default function DocumentCardSelect({
  document,
}: {
  document: Doc<'documents'>;
}) {
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    documentStorageId: document?.documentStorageId!,
  });

  return (
    <Link href={`/dashboard/chat/${document._id}`}>
      {' '}
      <Card className="flex !overflow-hidden  flex-col justify-between w-[294px] h-[421px] hover:shadow-lg">
        <CardHeader className="flex justify-between flex-row items-center ">
          <div className="flex gap-2 flex-row items-center mt-[6px]">
            <Image src="/pdfLogo.svg" width={25} height={25} alt="pdf logo" />
            <CardTitle>{document.docName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="self-center  ">
          <div className="relative  aspect-square">
            <Document file={documentFileUrl} noData={''} loading={'loading...'}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={0.4}
              />
            </Document>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
