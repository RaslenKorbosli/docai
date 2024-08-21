'use client';
import { useQuery } from 'convex/react';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '@/PDF';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
export default function PdfViewer({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const document = useQuery(api.document.getUserDocument, {
    documentId: documentId,
  });
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    documentStorageId: document?.documentStorageId!,
  });
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <>
      <Document file={documentFileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="h-1"
        />
      </Document>
      <div
        className={cn(
          'absolute r-[50%] bottom-8 w-[200px] flex  items-center justify-between backdrop-blur opacity-40 hover:opacity-90 transition-all shadow-xl bg-slate-100 rounded-full'
        )}
      >
        <Button
          variant="ghost"
          className={cn(' rounded-full  hover:bg-slate-200')}
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prv) => (prv > 1 ? prv - 1 : prv))}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button
          variant="ghost"
          className={cn('rounded-full  hover:bg-slate-200')}
          disabled={pageNumber === numPages}
          onClick={() =>
            setPageNumber((prv) => (prv < numPages! ? prv + 1 : prv))
          }
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
