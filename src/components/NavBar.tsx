'use client';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';

export default function NavBar() {
  return (
    <nav className="sticky z-10 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-md transition-all">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center border-b border-zinc-200 h-14">
          <Link href="/" className="font-semibold">
            Docai.
          </Link>

          <div className="flex gap-4">
            <SignedIn>
              <UserButton showName />
            </SignedIn>
            <SignedOut>
              <Button>
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl="/dashboard/documents"
                >
                  Sign in
                </SignInButton>
              </Button>
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
