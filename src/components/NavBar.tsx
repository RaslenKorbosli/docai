'use client';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';
import UserImageProfile from './UserImageProfile';
import { ModeToggle } from './ModeToggle';

export default function NavBar() {
  const user = useUser();

  return (
    <nav className="sticky z-10 h-14 inset-x-0 top-0 w-full bg-primary/5 border-b border-border  backdrop-blur-md transition-all shadow-sm">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center h-14 text-xl">
          <Link href="/" className="font-semibold">
            Docai.
          </Link>

          <div className="flex gap-2 items-center">
            <SignedIn>
              <p className="text-sm">
                {user.user?.firstName} {user.user?.lastName}
              </p>
              <UserImageProfile
                ImageUrl={user.user?.imageUrl ?? ''}
                firstName={user.user?.firstName ?? ''}
                lastName={user.user?.lastName ?? ''}
              />
              <Button variant="outline" className="ml-4">
                <SignOutButton redirectUrl="/">Sign out</SignOutButton>
              </Button>
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
            <ModeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
