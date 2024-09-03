// 'use client';
// import AddNewDocument from '@/components/AddNewDocument';
// import DocumentCard from '@/components/DocumentCard';
// import { useUser } from '@clerk/clerk-react';
// import { useQuery } from 'convex/react';
// import { formatDistance } from 'date-fns';
// import { Grid2X2, LayoutTemplate, Loader2 } from 'lucide-react';
// import Image from 'next/image';
// import { api } from '../../../../convex/_generated/api';
// import { Doc } from '../../../../convex/_generated/dataModel';

// import DropMenuOptions from '@/components/DropMenuOptions';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// export default function FilesPage() {
//   const user = useUser();

//   const userDocuments = useQuery(api.document.getUserDocuments, {
//     userId: user?.user?.id ?? '',
//   });

//   return (
//     <div className="flex-1 h-[calc(100vh-56px)] border-l-2 b-border ">
//       <div className="flex py-8 md:px-20 justify-between items-center">
//         <h1 className="text-2xl font-semibold">Your Documents</h1>{' '}
//         <AddNewDocument />
//       </div>
//       <Tabs defaultValue="table">
//         <TabsList className="mx-8 md:mx-20">
//           <TabsTrigger value="table">
//             <Grid2X2 className="h-6 w-6" />
//           </TabsTrigger>
//           <TabsTrigger value="widget">
//             <LayoutTemplate className="h-6 w-6" />
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="table" className="mx-8 md:mx-20">
//           {userDocuments === undefined ? (
//             <div className="flex justify-center items-center container h-3/6 ">
//               <Loader2 className="animate-spin h-14 w-14 " />
//             </div>
//           ) : userDocuments.length === 0 ? (
//             <div className="flex flex-col justify-center items-center h-fit mt-24">
//               <Image
//                 src="/noData.svg"
//                 width={300}
//                 height={300}
//                 alt="no documents yet logo"
//                 className=" aspect-square"
//               />
//               <h1 className="text-2xl">No document yet , please upload one</h1>
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow className="grid grid-cols-[repeat(5,150px)] justify-between">
//                   <TableHead>FileName</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Size</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead>FileOptions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {userDocuments.map((doc) => (
//                   <TableRow
//                     key={doc._id}
//                     className="grid grid-cols-[repeat(5,150px)] justify-between  items-center"
//                   >
//                     <TableCell>{doc.fileName}</TableCell>
//                     <TableCell className="flex gap-1">
//                       {' '}
//                       <Image
//                         src={`/${doc.fileType}Logo.svg`}
//                         className="aspect-square"
//                         height={15}
//                         width={15}
//                         alt={`${doc.fileType} logo image`}
//                       />
//                       {doc.fileType}
//                     </TableCell>
//                     <TableCell>{doc.fileSize}</TableCell>
//                     <TableCell>
//                       {formatDistance(doc._creationTime, new Date(), {
//                         addSuffix: true,
//                       })}
//                     </TableCell>

//                     <TableCell>{<DropMenuOptions document={doc} />}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TabsContent>
//         <TabsContent value="widget">
//           {userDocuments === undefined ? (
//             <div className="flex justify-center items-center container h-3/6 ">
//               <Loader2 className="animate-spin h-14 w-14 " />
//             </div>
//           ) : userDocuments.length === 0 ? (
//             <div className="flex flex-col justify-center items-center h-fit mt-24">
//               <Image
//                 src="/noData.svg"
//                 width={300}
//                 height={300}
//                 alt="no documents yet logo"
//                 className=" aspect-square"
//               />
//               <h1 className="text-2xl">No document yet , please upload one</h1>
//             </div>
//           ) : (
//             <div className="flex flex-wrap justify-start gap-4 py-4 md:px-20 overflow-y-scroll max-h-[calc(100vh-64px-100px-37px)]">
//               {userDocuments.map((doc) => (
//                 <DocumentCard
//                   key={doc._id}
//                   document={doc as Doc<'documents'>}
//                 />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
export default function page() {
  return <div></div>;
}
