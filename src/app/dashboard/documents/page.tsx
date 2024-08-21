'use client';
import AddNewDocument from '@/components/AddNewDocument';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Image from 'next/image';
import DocumentCard from '@/components/DocumentCard';
import { Doc } from '../../../../convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';

export default function FilesPage() {
  const user = useUser();
  const userDocuments = useQuery(api.document.getUserDocuments, {
    userId: user.user?.id!,
  });
  console.log(userDocuments);
  return (
    <div className="flex-1 h-[calc(100vh-56px)] ">
      <div className="flex py-8 md:px-20 justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Documents</h1>{' '}
        <AddNewDocument />
      </div>

      {userDocuments === undefined ? (
        <div className="flex justify-center items-center container h-3/6 ">
          <Loader2 className="animate-spin h-14 w-14 " />
        </div>
      ) : userDocuments.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-fit mt-24">
          <Image
            src="/noData.svg"
            width={300}
            height={300}
            alt="no documents yet logo"
            className=" aspect-square"
          />
          <h1 className="text-2xl">No document yet , please upload one</h1>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-4 py-4 md:px-20 overflow-y-scroll max-h-[calc(100vh-64px-100px)]">
          {userDocuments.map((doc) => (
            <DocumentCard key={doc._id} document={doc as Doc<'documents'>} />
          ))}
        </div>
      )}
    </div>
  );
}
