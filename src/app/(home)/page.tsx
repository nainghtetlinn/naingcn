import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <title>Naingcn</title>
      <div className='relative flex w-full flex-1 flex-col'>
        <div
          className='absolute inset-0 z-0 dark:hidden'
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: '32px 32px',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
          }}
        />
        <div
          className='absolute inset-0 z-0 hidden dark:block'
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
            backgroundSize: '32px 32px',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
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
