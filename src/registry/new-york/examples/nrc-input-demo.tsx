'use client';

import React from 'react';

import {
  NRCInput,
  NRCStateInput,
  NRCTownshipInput,
  NRCTypeInput,
  NRCNumberInput,
} from '@/registry/new-york/ui/nrc-input';

export const NRCInputDemo = () => {
  const [nrc, setNrc] = React.useState('');

  return (
    <div className='w-full max-w-[350px]'>
      <NRCInput
        lang='mm'
        className='grid gap-1'
        defaultValue='13/TAKANA(N)112233'
        onValueChange={setNrc}
      >
        <div className='flex gap-1 flex-wrap'>
          <NRCStateInput className='grow' />
          <NRCTownshipInput className='grow' />
          <NRCTypeInput className='grow' />
        </div>
        <NRCNumberInput />
      </NRCInput>
      <p className='text-center'>{nrc}</p>
    </div>
  );
};
