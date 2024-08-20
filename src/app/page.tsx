import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useUser } from '@clerk/clerk-react';
export default async function Home() {
  // const session = await useUser();
  // console.log(session);
  return (
    <MaxWidthWrapper className=" flex justify-center items-center flex-col mt-28 sm:mt-40 text-center">
      <div className="mx-auto mb-4 flex rounded-full overflow-hidden justify-center items-center space-x-2 max-w-fit border border-gray-200 backdrop-blur px-7 py-2 shadow-md transition-all hover:border-gray-300 bg-white hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          {' '}
          docai is open to use
        </p>
      </div>
      <h1 className="font-bold md:text-6xl lg:text-7xl text-5xl max-w-4xl">
        {' '}
        chat with your <span className="text-blue-600">documents</span> in
        secondes
      </h1>
      <p className="mt-5 max-w-prose">
        Docai allows you to have a conversation with your PDF document . Simply
        upload your document and start asking your question right away
      </p>
      <Button asChild variant="secondary" className="mt-5">
        <Link href="/dashboard">
          Get started <ArrowRight className="ml-2 w-5 h-5" />{' '}
        </Link>
      </Button>
    </MaxWidthWrapper>
  );
}
