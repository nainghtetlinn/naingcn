import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <title>Naingcn</title>

      <main className='container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4'>
        <h1 className='text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl'>
          Components crafted with love
        </h1>
        <p className='text-foreground max-w-3xl text-base text-balance sm:text-lg'>
          naingcn is a component library build with shadcn and maintained by
          Naing Htet Linn.
        </p>
        <div className='flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none'>
          <Button asChild>
            <Link href='/docs/'>Introduction</Link>
          </Button>
          <Button asChild variant={'ghost'}>
            <Link href='/docs/components'>View Components</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
