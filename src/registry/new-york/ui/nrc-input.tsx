'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { NRC_STATES, NRC_TOWNSHIPS, NRC_TYPES } from 'public/nrc.min.json';

export const enNrcPattern =
  /^([1-9]|1[0-3])\/([A-Z]{6,9})\((N|E|P|T|Y|S)\)([0-9]{6})$/;

export const mmNrcPattern =
  /^([၁-၉]|1[၀-၃])\/([က-အ]{3,3})\((နိုင်|ဧည့်|ပြု|သာသနာ|ယာယီ|စ)\)([၀-၉]{6})$/;

type NRCState = {
  stateId: string;
  townshipId: string;
  typeId: string;
  number: string;
};

type NRCAction = {
  setStateId: (id: string) => void;
  setTownshipId: (id: string) => void;
  setTypeId: (id: string) => void;
  setNumber: (number: string) => void;
};

type NRCInputContext = NRCState & NRCAction;

const NRCInputContext = React.createContext<NRCInputContext>(
  {} as NRCInputContext
);

const initialState: NRCState = {
  stateId: '',
  townshipId: '',
  typeId: '',
  number: '',
};

const useNRCInput = () => {
  const context = React.useContext(NRCInputContext);

  if (!context) {
    throw new Error('useNRCInput should be used within <NRCInput>');
  }

  return context;
};

function NRCInput({
  className,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<'div'> & {
  defaultValue?: string;
  onValueChange?: (data: string) => void;
}) {
  const [stateId, setStateId] = React.useState('');
  const [townshipId, setTownshipId] = React.useState('');
  const [typeId, setTypeId] = React.useState('');
  const [number, setNumber] = React.useState('');

  const [state, setState] = React.useState('');
  const [township, setTownship] = React.useState('');
  const [type, setType] = React.useState('');

  React.useEffect(() => {
    const result = parseNRC(defaultValue);

    if (result) {
      setStateId(result.stateId);
      setState(result.state);
      setTownshipId(result.townshipId);
      setTownship(result.township);
      setTypeId(result.typeId);
      setType(result.type);
      setNumber(result.number);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (stateId) setState(NRC_STATES.find((s) => s.id === stateId)?.en ?? '');
  }, [stateId]);

  React.useEffect(() => {
    if (stateId && townshipId)
      setTownship(
        NRC_TOWNSHIPS[stateId as keyof typeof NRC_TOWNSHIPS].find(
          (ts) => ts.id === townshipId
        )?.en ?? ''
      );
  }, [stateId, townshipId]);

  React.useEffect(() => {
    if (typeId) setType(NRC_TYPES.find((t) => t.id === typeId)?.en ?? '');
  }, [typeId]);

  React.useEffect(() => {
    if (onValueChange) onValueChange(`${state}/${township}(${type})${number}`);
  }, [state, township, type, number]);

  return (
    <NRCInputContext.Provider
      value={{
        stateId,
        townshipId,
        typeId,
        number,
        setStateId: (id: string) => {
          setStateId(id);
          setTownshipId('');
          setTownship('');
        },
        setTownshipId,
        setTypeId,
        setNumber,
      }}
    >
      <div
        data-slot='nrc-input'
        className={cn('flex flex-wrap gap-1', className)}
        {...props}
      />
    </NRCInputContext.Provider>
  );
}

function NRCStateInput({
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  const { stateId, setStateId } = useNRCInput();

  return (
    <Select onValueChange={setStateId} value={stateId}>
      <SelectTrigger {...props} aria-invalid={false}>
        <SelectValue placeholder='State' />
      </SelectTrigger>
      <SelectContent>
        {NRC_STATES.map((state) => (
          <SelectItem key={state.id} value={state.id}>
            {state.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NRCTownshipInput({
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  const { stateId, townshipId, setTownshipId } = useNRCInput();

  const townships = React.useMemo(() => {
    if (stateId === '') return [];
    const key = stateId as keyof typeof NRC_TOWNSHIPS;
    return NRC_TOWNSHIPS[key];
  }, [stateId]);

  return (
    <Select
      disabled={!stateId}
      onValueChange={setTownshipId}
      value={townshipId}
    >
      <SelectTrigger {...props} aria-invalid={false}>
        <SelectValue placeholder='Township' />
      </SelectTrigger>
      <SelectContent>
        {townships.map((township) => (
          <SelectItem key={township.id} value={township.id}>
            {township.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NRCTypeInput({
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  const { typeId, setTypeId } = useNRCInput();

  return (
    <Select onValueChange={setTypeId} value={typeId}>
      <SelectTrigger {...props} aria-invalid={false}>
        <SelectValue placeholder='Type' />
      </SelectTrigger>
      <SelectContent>
        {NRC_TYPES.map((type) => (
          <SelectItem key={type.id} value={type.id}>
            {type.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NRCNumberInput({ ...props }: React.ComponentProps<typeof Input>) {
  const { number, setNumber } = useNRCInput();

  return (
    <Input
      {...props}
      aria-invalid={false}
      placeholder='Number'
      maxLength={6}
      value={number}
      onChange={(e) => {
        setNumber(e.target.value);
      }}
    />
  );
}

function parseNRC(value?: string) {
  if (!value) return;

  const match = value.match(enNrcPattern);

  if (!match) return;

  const [, state, township, type, number] = match;

  const stateId = NRC_STATES.find((s) => s.en === state)?.id ?? '';
  const townshipId =
    NRC_TOWNSHIPS[stateId as keyof typeof NRC_TOWNSHIPS].find(
      (t) => t.en === township
    )?.id ?? '';
  const typeId = NRC_TYPES.find((t) => t.en === type)?.id ?? '';

  return {
    stateId,
    state: stateId && state,
    townshipId,
    township: townshipId && township,
    typeId,
    type: typeId && type,
    number,
  };
}

export {
  NRCInput,
  NRCNumberInput,
  NRCStateInput,
  NRCTownshipInput,
  NRCTypeInput,
};
