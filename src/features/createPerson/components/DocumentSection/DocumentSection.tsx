import {
  DateInput,
  FormField,
  SelectInput,
  TextareaInput,
  TextInput,
  UnzrInput
} from '@/shared/ui';

import { DOCUMENT_TYPE_OPTIONS } from '../../constants/documentTypes';
import { FORM_FIELDS, SECTION_TITLES, SELECT_PLACEHOLDER } from '../../constants/formContent';
import styles from './DocumentSection.module.scss';

export function DocumentSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>{SECTION_TITLES.document}</h2>

      <div className={styles.section__grid}>
        <FormField name={FORM_FIELDS.documentType.name} label={FORM_FIELDS.documentType.label} required>
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
              placeholder={SELECT_PLACEHOLDER}
            />
          )}
        </FormField>

        <FormField name={FORM_FIELDS.documentNumber.name} label={FORM_FIELDS.documentNumber.label} required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField name={FORM_FIELDS.documentIssuedDate.name} label={FORM_FIELDS.documentIssuedDate.label} required>
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

        <FormField name={FORM_FIELDS.documentValidUntil.name} label={FORM_FIELDS.documentValidUntil.label}>
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

        <FormField name={FORM_FIELDS.documentIssuedBy.name} label={FORM_FIELDS.documentIssuedBy.label} required>
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

        <FormField name={FORM_FIELDS.unzr.name} label={FORM_FIELDS.unzr.label} hint={FORM_FIELDS.unzr.hint}>
          {(props) => <UnzrInput {...props} />}
        </FormField>
      </div>
    </section>
  );
}