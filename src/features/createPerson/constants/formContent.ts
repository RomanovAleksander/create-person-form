import { CreatePersonFormValues } from "..//validation/createPersonSchema.ts";

export const FIELD_NAMES = {
  lastName: 'lastName',
  firstName: 'firstName',
  hasMiddleName: 'hasMiddleName',
  middleName: 'middleName',
  hasTaxId: 'hasTaxId',
  taxId: 'taxId',
  birthDate: 'birthDate',
  gender: 'gender',
  birthCountry: 'birthCountry',
  birthPlace: 'birthPlace',
  contactMethod: 'contactMethod',
  secretWord: 'secretWord',
  phone: 'phone',
  email: 'email',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  documentIssuedDate: 'documentIssuedDate',
  documentValidUntil: 'documentValidUntil',
  documentIssuedBy: 'documentIssuedBy',
  unzr: 'unzr',
} satisfies Record<keyof CreatePersonFormValues, string>;

export const SECTION_TITLES = {
  patientData: 'Дані пацієнта',
  document: 'Документ, що посвідчує особу',
} as const;

export const SELECT_PLACEHOLDER = '- Вибрати -';

export const FORM_FIELDS = {
  [FIELD_NAMES.lastName]: {
    name: FIELD_NAMES.lastName,
    label: 'Прізвище',
  },
  [FIELD_NAMES.firstName]: {
    name: FIELD_NAMES.firstName,
    label: "Ім'я",
  },
  [FIELD_NAMES.middleName]: {
    name: FIELD_NAMES.middleName,
    label: 'По батькові',
    hint: 'Немає по батькові згідно документів',
  },
  [FIELD_NAMES.taxId]: {
    name: FIELD_NAMES.taxId,
    label: 'РНОКПП (ІПН)',
    hint: 'Немає ІПН за віком чи має відмітку у паспорті',
  },
  [FIELD_NAMES.birthDate]: {
    name: FIELD_NAMES.birthDate,
    label: 'Дата народження',
  },
  [FIELD_NAMES.gender]: {
    name: FIELD_NAMES.gender,
    label: 'Стать',
  },
  [FIELD_NAMES.birthCountry]: {
    name: FIELD_NAMES.birthCountry,
    label: 'Країна народження',
  },
  [FIELD_NAMES.birthPlace]: {
    name: FIELD_NAMES.birthPlace,
    label: 'Місце народження',
  },
  [FIELD_NAMES.contactMethod]: {
    name: FIELD_NAMES.contactMethod,
    label: "Бажаний спосіб зв'язку із пацієнтом",
  },
  [FIELD_NAMES.secretWord]: {
    name: FIELD_NAMES.secretWord,
    label: 'Секретне слово (не менше 6 символів)',
  },
  [FIELD_NAMES.phone]: {
    name: FIELD_NAMES.phone,
    label: 'Контактний номер телефону',
  },
  [FIELD_NAMES.email]: {
    name: FIELD_NAMES.email,
    label: 'Адреса електронної пошти',
    placeholder: 'example@example.com',
  },
  [FIELD_NAMES.documentType]: {
    name: FIELD_NAMES.documentType,
    label: 'Тип документу',
  },
  [FIELD_NAMES.documentNumber]: {
    name: FIELD_NAMES.documentNumber,
    label: 'Серія (за наявності), номер',
  },
  [FIELD_NAMES.documentIssuedDate]: {
    name: FIELD_NAMES.documentIssuedDate,
    label: 'Коли видано',
  },
  [FIELD_NAMES.documentValidUntil]: {
    name: FIELD_NAMES.documentValidUntil,
    label: 'Діє до',
  },
  [FIELD_NAMES.documentIssuedBy]: {
    name: FIELD_NAMES.documentIssuedBy,
    label: 'Ким видано',
  },
  [FIELD_NAMES.unzr]: {
    name: FIELD_NAMES.unzr,
    label: 'Запис № (УНЗР)',
    hint: 'Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)',
  },
} as const;
