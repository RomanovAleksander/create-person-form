import type { MaskedInputProps } from '../MaskedInput';
import { MaskedInput } from '../MaskedInput';

type UnzrInputProps = Omit<MaskedInputProps, 'mask' | 'inputMode' | 'placeholder'>;

export function UnzrInput(props: UnzrInputProps) {
  return (
    <MaskedInput
      mask="00000000-00000"
      placeholder="РРРРММДД-XXXXX"
      inputMode="numeric"
      {...props}
    />
  );
}