import type { MaskedInputProps } from '../MaskedInput';
import { MaskedInput } from '../MaskedInput';

type PhoneInputProps = Omit<MaskedInputProps, 'mask' | 'inputMode' | 'placeholder'>;

export function PhoneInput(props: PhoneInputProps) {
  return (
    <MaskedInput
      mask="+38 (000) 000-00-00"
      placeholder="+38 (0__) ___-__-__"
      inputMode="tel"
      {...props}
    />
  );
}