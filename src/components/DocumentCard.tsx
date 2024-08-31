'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import '@/PDF';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { Document, Page } from 'react-pdf';
import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import DropMenuOptions from './DropMenuOptions';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
export default function DocumentCard({
  document,
}: {
  document: Doc<'documents'>;
}) {
  const documentFileUrl = useQuery(api.document.getDocumentFileUrl, {
    fileStorageId: document?.fileStorageId!,
  });

  const docs = [
    { uri: documentFileUrl ?? '' }, // Remote file
  ];

  return (
    <Card className="flex flex-col !overflow-hidden  w-[294px] h-[421px] hover:shadow-lg">
      <CardHeader className="flex justify-between flex-row items-center ">
        <div className="flex gap-2 flex-row items-center mt-[6px]">
          {document.fileType === 'txt' ? (
            <Image src="/txtLogo.svg" width={25} height={25} alt="pdf logo" />
          ) : (
            <Image src="/pdfLogo.svg" width={25} height={25} alt="pdf logo" />
          )}
          <CardTitle>{document.fileName}</CardTitle>
        </div>

        <DropMenuOptions document={document} />
      </CardHeader>
      <CardContent className="self-center ">
        <div className="  aspect-square h-fit w-fit ">
          {document.fileType === 'txt' ? (
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
              style={{ overflow: 'hidden' }}
            />
          ) : (
            <Document file={documentFileUrl} noData={''} loading={'loading...'}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className=""
                scale={0.4}
                noData="loading..."
              />
            </Document>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
