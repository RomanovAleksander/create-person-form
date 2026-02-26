import type { SelectOption } from '@/shared/types/form';

export const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'additional_protection_certificate', label: 'Посвідчення особи, яка потребує додаткового захисту' },
  { value: 'passport', label: 'Паспорт (ID-картка)' },
  { value: 'passport_book', label: 'Паспорт (книжечка)' },
  { value: 'residence_permit_permanent', label: 'Посвідка на постійне проживання в Україні' },
  { value: 'refugee_certificate', label: 'Посвідка біженця' },
  { value: 'residence_permit', label: 'Посвідка на проживання' },
  { value: 'temporary_certificate', label: 'Тимчасове посвідчення громадянина України' },
];

export const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  PASSPORT_BOOK: 'passport_book',
} as const;

export const PASSPORT_TYPES = new Set<string>(Object.values(DOCUMENT_TYPES));

export function isPassportType(documentType: string): boolean {
  return PASSPORT_TYPES.has(documentType);
}
