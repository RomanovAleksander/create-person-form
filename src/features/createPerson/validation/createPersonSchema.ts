import { isBefore, isValid, parse, startOfToday } from 'date-fns';
import { z } from 'zod';

import { PASSPORT_TYPES } from '../constants/documentTypes';
import { FIELD_NAMES } from '../constants/formContent';

const SECRET_WORD_MIN_LENGTH = 6;
const PHONE_MASK_FULL_LENGTH = 19; // "+38 (0XX) XXX-XX-XX"
const MAX_AGE_YEARS = 120;

const taxIdRegex = /^\d{10}$/;
const unzrRegex = /^\d{8}-\d{5}$/;
const passportBookRegex = /^[А-ЯІЇЄҐа-яіїєґ]{2}\d{6}$/;
const idCardRegex = /^\d{9}$/;
const documentSerialRegex = /^[А-ЯІЇЄҐа-яіїєґ]{3}\d{5,9}$/;

const MSG = {
  required: 'Поле не може бути пустим',
  taxIdFormat: 'РНОКПП повинен містити рівно 10 цифр',
  docNumFormat: 'Формат: 3 літери + 5-9 цифр',
  docNumPassportBook: 'Формат: 2 літери + 6 цифр (наприклад АА123456)',
  docNumIdCard: 'Формат: 9 цифр',
  docIssuedBeforeBirth: 'Дата видачі документа не може бути раніше дати народження',
  docValidUntilBeforeIssued: 'Термін дії не може бути раніше дати видачі',
  phone: 'Некоректний номер телефона. Приклад: +38 (093) 999-88-77',
  email: 'Некоректний формат email',
  unzr: 'Некоректний формат. Формат має бути: РРРРММДД-ХХХХХ',
  secretWordMin: `Введіть не менше ${SECRET_WORD_MIN_LENGTH} символів`,
} as const;

const requiredString = z.string().min(1, MSG.required);

const parseDate = (val: string) => parse(val, 'dd.MM.yyyy', new Date());

function createDateSchema(label: string, maxAgeYears = MAX_AGE_YEARS) {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - maxAgeYears);
  minDate.setHours(0, 0, 0, 0);

  return z
    .string()
    .min(1, MSG.required)
    .superRefine((val, ctx) => {
      const date = parseDate(val);

      if (!isValid(date)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label}: введіть реальну дату`
        });

        return z.NEVER;
      }

      if (date > startOfToday()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} не може бути в майбутньому`
        });
      }

      if (date < minDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} не може бути раніше ${maxAgeYears} років тому`
        });
      }
    });
}

const optionalDate = z
  .string()
  .refine(
    (val) => val === '' || isValid(parseDate(val)),
    'Введіть реальну дату',
  )
  .default('');

export const createPersonSchema = z
  .object({
    lastName: requiredString.default(''),
    firstName: requiredString.default(''),
    hasMiddleName: z.boolean().default(true),
    middleName: z.string().default(''),
    hasTaxId: z.boolean().default(true),
    taxId: z.string().default(''),
    birthDate: createDateSchema('Дата народження').default(''),
    gender: requiredString.default(''),
    birthCountry: requiredString.default(''),
    birthPlace: requiredString.default(''),
    contactMethod: z.string().default(''),
    secretWord: requiredString.min(SECRET_WORD_MIN_LENGTH, MSG.secretWordMin).default(''),
    phone: z.string()
      .min(PHONE_MASK_FULL_LENGTH, MSG.phone)
      .or(z.literal(''))
      .default(''),
    email: z.string().email(MSG.email).or(z.literal('')).default(''),
    documentType: requiredString.default(''),
    documentNumber: requiredString.default(''),
    documentIssuedDate: createDateSchema('Дата видачі документа').default(''),
    documentValidUntil: optionalDate,
    documentIssuedBy: requiredString.default(''),
    unzr: z.string().regex(unzrRegex, MSG.unzr).or(z.literal('')).default(''),
  })
  .superRefine((data, ctx) => {
    if (data.hasMiddleName && !data.middleName.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MSG.required,
        path: [FIELD_NAMES.middleName]
      });
    }

    if (data.hasTaxId) {
      if (!data.taxId.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: MSG.required,
          path: [FIELD_NAMES.taxId]
        });
      } else if (!taxIdRegex.test(data.taxId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: MSG.taxIdFormat,
          path: [FIELD_NAMES.taxId]
        });
      }
    }

    const birthDate = parseDate(data.birthDate);
    const issuedDate = parseDate(data.documentIssuedDate);

    if (isValid(birthDate) && isValid(issuedDate) && isBefore(issuedDate, birthDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MSG.docIssuedBeforeBirth,
        path: [FIELD_NAMES.documentIssuedDate],
      });
    }

    const validUntilDate = parseDate(data.documentValidUntil);

    if (isValid(issuedDate) && isValid(validUntilDate) && isBefore(validUntilDate, issuedDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MSG.docValidUntilBeforeIssued,
        path: [FIELD_NAMES.documentValidUntil],
      });
    }

    if (data.documentNumber && data.documentType) {
      const { PASSPORT, PASSPORT_BOOK } = PASSPORT_TYPES;

      let regex = documentSerialRegex;
      let errorMsg: string = MSG.docNumFormat;

      if (data.documentType === PASSPORT_BOOK) {
        regex = passportBookRegex;
        errorMsg = MSG.docNumPassportBook;
      } else if (data.documentType === PASSPORT) {
        regex = idCardRegex;
        errorMsg = MSG.docNumIdCard;
      }

      if (!regex.test(data.documentNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMsg,
          path: [FIELD_NAMES.documentNumber]
        });
      }
    }
  });

export type CreatePersonFormValues = z.infer<typeof createPersonSchema>;

export const createPersonInitialValues = {
  hasMiddleName: true,
  hasTaxId: true,
} satisfies Partial<CreatePersonFormValues>;
