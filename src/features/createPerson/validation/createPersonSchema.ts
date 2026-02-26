import { z } from 'zod';

import { isPassportType } from '../constants/documentTypes';

const REQUIRED_MSG = 'Поле не може бути пустим';
const PHONE_MASK_FULL_LENGTH = 19; // "+38 (0XX) XXX-XX-XX"

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const unzrRegex = /^\d{8}-\d{5}$/;
const documentSerialRegex = /^[А-ЯІЇЄҐа-яіїєґ]{3}\d{5,9}$/;

const requiredString = z.string().min(1, REQUIRED_MSG);
const requiredDate = requiredString.regex(dateRegex, 'Формат: ДД.ММ.РРРР');
const optionalDate = z.string()
  .regex(dateRegex, 'Формат: ДД.ММ.РРРР')
  .or(z.literal(''));

export const createPersonSchema = z
  .object({
    lastName: requiredString.default(''),
    firstName: requiredString.default(''),
    hasMiddleName: z.boolean().default(true),
    middleName: z.string().default(''),
    hasTaxId: z.boolean().default(true),
    taxId: z.string().default(''),
    birthDate: requiredDate.default(''),
    gender: requiredString.default(''),
    birthCountry: requiredString.default(''),
    birthPlace: requiredString.default(''),
    contactMethod: z.string().default(''),
    secretWord: requiredString
      .min(6, 'Введіть не менше 6 символів')
      .default(''),
    phone: z
      .string()
      .min(PHONE_MASK_FULL_LENGTH, 'Некоректний номер телефона.\nПриклад: +38 (093) 999-88-77')
      .or(z.literal(''))
      .default(''),
    email: z.string()
      .email('Некоректний формат email')
      .or(z.literal(''))
      .default(''),
    documentType: requiredString.default(''),
    documentNumber: requiredString.default(''),
    documentIssuedDate: requiredDate.default(''),
    documentValidUntil: optionalDate.default(''),
    documentIssuedBy: requiredString.default(''),
    unzr: z.string()
      .regex(unzrRegex, 'Некоректний формат. Формат має бути: РРРРММДД-ХХХХХ')
      .or(z.literal(''))
      .default(''),
  })
  .superRefine((data, ctx) => {
    if (data.hasMiddleName && !data.middleName.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: REQUIRED_MSG, path: ['middleName'] });
    }

    if (data.hasTaxId) {
      if (!data.taxId.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: REQUIRED_MSG, path: ['taxId'] });
      } else if (!/^\d{10}$/.test(data.taxId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'РНОКПП повинен містити рівно 10 цифр',
          path: ['taxId'],
        });
      }
    }

    if (
      data.documentNumber &&
      data.documentType &&
      !isPassportType(data.documentType) &&
      !documentSerialRegex.test(data.documentNumber)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Формат: 3 літери + 5-9 цифр',
        path: ['documentNumber'],
      });
    }
  });

export type CreatePersonFormValues = z.infer<typeof createPersonSchema>;

export const createPersonInitialValues = {
  hasMiddleName: true,
  hasTaxId: true,
} satisfies Partial<CreatePersonFormValues>;
