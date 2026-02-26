import {
  DateInput,
  FormField,
  SelectInput,
  TextareaInput,
  TextInput,
  UnzrInput
} from '@/shared/ui';

import { DOCUMENT_TYPE_OPTIONS } from '../../constants/documentTypes';
import styles from './DocumentSection.module.scss';

export function DocumentSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Документ, що посвідчує особу</h2>

      <div className={styles.section__grid}>
        <FormField name="documentType" label="Тип документу" required>
          {({ id, name, value, onChange, onBlur, hasError, disabled }) => (
            <SelectInput
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              hasError={hasError}
              disabled={disabled}
              options={DOCUMENT_TYPE_OPTIONS}
              placeholder="- Вибрати -"
            />
          )}
        </FormField>

        <FormField name="documentNumber" label="Серія (за наявності), номер" required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField name="documentIssuedDate" label="Коли видано" required>
          {({ value, onChange, onBlur, hasError, disabled }) => (
            <DateInput
              value={value}
              onChange={(value) => onChange(value)}
              onBlur={onBlur}
              hasError={hasError}
              disabled={disabled}
            />
          )}
        </FormField>

        <FormField name="documentValidUntil" label="Діє до">
          {({ value, onChange, onBlur, hasError, disabled }) => (
            <DateInput
              value={value}
              onChange={(value) => onChange(value)}
              onBlur={onBlur}
              hasError={hasError}
              disabled={disabled}
            />
          )}
        </FormField>

        <FormField name="documentIssuedBy" label="Ким видано" required>
          {({ value, onChange, onBlur, hasError, name }) => (
            <TextareaInput
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              hasError={hasError}
              name={name}
            />
          )}
        </FormField>

        <FormField
          name="unzr"
          label="Запис № (УНЗР)"
          hint="Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"
        >
          {(props) => <UnzrInput {...props} />}
        </FormField>
      </div>
    </section>
  );
}