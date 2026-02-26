import clsx from 'clsx';
import { useField, useForm } from 'react-final-form';

import { DateInput, FormField, PhoneInput, SelectInput, TextInput, ToggleSwitch } from '@/shared/ui';

import { FIELD_NAMES, FORM_FIELDS, SECTION_TITLES, SELECT_PLACEHOLDER } from '../../constants/formContent';
import { CONTACT_METHOD_OPTIONS, GENDER_OPTIONS } from '../../constants/patientFields';
import styles from './PatientDataSection.module.scss';

export function PatientDataSection() {
  const form = useForm();
  const hasMiddleName = useField(FIELD_NAMES.hasMiddleName).input.value;
  const hasTaxId = useField(FIELD_NAMES.hasTaxId).input.value;

  const handleMiddleNameToggle = (checked: boolean) => {
    form.change(FIELD_NAMES.hasMiddleName, checked);
    if (!checked) form.change(FIELD_NAMES.middleName, '');
  };

  const handleTaxIdToggle = (checked: boolean) => {
    form.change(FIELD_NAMES.hasTaxId, checked);
    if (!checked) form.change(FIELD_NAMES.taxId, '');
  };

  const middleNameHint = hasMiddleName ? undefined : FORM_FIELDS.middleName.hint;
  const taxIdHint = hasTaxId ? undefined : FORM_FIELDS.taxId.hint;

  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>{SECTION_TITLES.patientData}</h2>

      <div className={styles.section__wrapper}>
        <div className={styles.section__grid}>
          <FormField name={FORM_FIELDS.lastName.name} label={FORM_FIELDS.lastName.label} required>
            {(props) => <TextInput {...props} />}
          </FormField>

          <FormField name={FORM_FIELDS.firstName.name} label={FORM_FIELDS.firstName.label} required>
            {(props) => <TextInput {...props} />}
          </FormField>

          <FormField
            name={FORM_FIELDS.middleName.name}
            label={FORM_FIELDS.middleName.label}
            required={hasMiddleName}
            disabled={!hasMiddleName}
            extra={<ToggleSwitch checked={hasMiddleName} onChange={handleMiddleNameToggle} />}
            hint={middleNameHint}
          >
            {(props) => <TextInput {...props} />}
          </FormField>

          <FormField
            name={FORM_FIELDS.taxId.name}
            label={FORM_FIELDS.taxId.label}
            required={hasTaxId}
            disabled={!hasTaxId}
            extra={<ToggleSwitch checked={hasTaxId} onChange={handleTaxIdToggle} />}
            hint={taxIdHint}
          >
            {(props) => <TextInput {...props} maxLength={10} inputMode="numeric" />}
          </FormField>

          <FormField name={FORM_FIELDS.birthDate.name} label={FORM_FIELDS.birthDate.label} required>
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

          <FormField name={FORM_FIELDS.gender.name} label={FORM_FIELDS.gender.label} required>
            {({ id, name, value, onChange, onBlur, hasError, disabled }) => (
              <SelectInput
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                hasError={hasError}
                disabled={disabled}
                options={GENDER_OPTIONS}
                placeholder={SELECT_PLACEHOLDER}
              />
            )}
          </FormField>
        </div>

        <div className={clsx(styles.section__grid, styles['section__grid--two-col'])}>
          <FormField name={FORM_FIELDS.birthCountry.name} label={FORM_FIELDS.birthCountry.label} required>
            {(props) => <TextInput {...props} />}
          </FormField>

          <FormField name={FORM_FIELDS.birthPlace.name} label={FORM_FIELDS.birthPlace.label} required>
            {(props) => <TextInput {...props} />}
          </FormField>

          <FormField name={FORM_FIELDS.contactMethod.name} label={FORM_FIELDS.contactMethod.label}>
            {({ id, name, value, onChange, onBlur, hasError, disabled }) => (
              <SelectInput
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                hasError={hasError}
                disabled={disabled}
                options={CONTACT_METHOD_OPTIONS}
                placeholder={SELECT_PLACEHOLDER}
              />
            )}
          </FormField>

          <FormField name={FORM_FIELDS.secretWord.name} label={FORM_FIELDS.secretWord.label} required>
            {(props) => <TextInput {...props} type="password" />}
          </FormField>

          <FormField name={FORM_FIELDS.phone.name} label={FORM_FIELDS.phone.label}>
            {({ id, value, onChange, onBlur, hasError, disabled, name }) => (
              <PhoneInput
                id={id}
                value={value}
                onChange={(value) => onChange(value)}
                onBlur={onBlur}
                hasError={hasError}
                disabled={disabled}
                name={name}
              />
            )}
          </FormField>

          <FormField name={FORM_FIELDS.email.name} label={FORM_FIELDS.email.label}>
            {(props) => <TextInput {...props} type="email" placeholder={FORM_FIELDS.email.placeholder} />}
          </FormField>
        </div>
      </div>
    </section>
  );
}