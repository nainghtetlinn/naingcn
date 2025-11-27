import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <title>Naingcn</title>
      <div className='relative flex w-full flex-1 flex-col bg-black'>
        {/* Vercel Grid */}
        <div
          className='absolute inset-0 opacity-30'
          style={{
            backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
            backgroundSize: '60px 60px',
          }}
        />

        <main className='relative z-10 flex flex-1 flex-col items-center justify-center gap-8 text-center'>
          <h1 className='text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter'>
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
      </div>
    </>
  );
}
