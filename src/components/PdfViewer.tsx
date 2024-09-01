'use client';
import { useMutation, useQuery } from 'convex/react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '@/PDF';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function PdfViewer({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const document = useQuery(api.document.getUserDocument, {
    fileId: documentId,
  });
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    fileStorageId: document?.fileStorageId!,
  });
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const docs = [
    { uri: documentFileUrl ?? '' }, // Remote file
  ];
  const patchDocumentData = useMutation(api.document.patchDocumentContent);
  if (document?.fileType === 'txt') {
    fetch(documentFileUrl as string | URL | Request)
      .then((response) => response.text())
      .then((data) => {
        patchDocumentData({
          fileId: documentId,
          filePageContent: data,
        });
      });
  }
  return (
    <>
      {document?.fileType === 'txt' ? (
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
          style={{
            overflow: 'hidden',
            padding: '16px',
            minWidth: '200px',
            background: 'none',
          }}
        />
      ) : (
        <>
          <Document
            file={documentFileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              onGetTextSuccess={async ({ items }) => {
                const text = items.map((item: TextItem) => item.str).join(' ');
                await patchDocumentData({
                  fileId: documentId,
                  filePageContent: text,
                });
              }}
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={false}
              className="h-1"
            />
          </Document>
          <div
            className={cn(
              'absolute z-50 r-[50%] bottom-8 w-fit flex  items-center justify-between backdrop-blur opacity-40 hover:opacity-90 transition-all shadow-xl bg-slate-100 rounded-full'
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
      )}
    </>
  );
}
