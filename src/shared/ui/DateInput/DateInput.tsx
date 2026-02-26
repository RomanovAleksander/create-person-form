import type { MaskedInputProps } from '../MaskedInput';
import { MaskedInput } from '../MaskedInput';

type DateInputProps = Omit<MaskedInputProps, 'mask' | 'inputMode' | 'placeholder'>;

export function DateInput(props: DateInputProps) {
  return (
    <MaskedInput
      mask="00.00.0000"
      placeholder="ДД.ММ.РРРР"
      inputMode="numeric"
      {...props}
    />
  );
}
