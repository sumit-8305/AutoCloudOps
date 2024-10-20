import Link from 'next/link';

import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import clsx from 'clsx';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'



export default function SideNav() {

  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      
      <Link
        className={clsx(
          'mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40', // Default styles
          'hidden', // Hide by default
          'md:flex' // Show when screen is larger than 500px
        )}
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Image
            src="/acd-logo.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className='h-auto w-full grow rounded-md  mt-4'>
        <header className='ml-2'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          </div>
        <div className="hidden h-auto w-full grow rounded-md  mt-4  md:block">
          </div>
      </div>
          
    </div>
  );
}