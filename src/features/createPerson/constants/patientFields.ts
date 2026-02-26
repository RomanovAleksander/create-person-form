import type { SelectOption } from '@/shared/types/form';

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'female', label: 'Жіноча' },
  { value: 'male', label: 'Чоловіча' },
];

export const CONTACT_METHOD_OPTIONS: SelectOption[] = [
  { value: 'email', label: 'Електронною поштою' },
  { value: 'phone', label: 'Телефоном' },
];
