import { useCallback } from 'react';
import { useField, useForm } from 'react-final-form';

import clsx from 'clsx';

import { DateInput, FormField, PhoneInput, SelectInput, TextInput, ToggleSwitch } from '@/shared/ui';

import { CONTACT_METHOD_OPTIONS, GENDER_OPTIONS } from '../../constants/patientFields';
import styles from './PatientDataSection.module.scss';

export function PatientDataSection() {
  const form = useForm();
  const hasMiddleName = useField('hasMiddleName').input.value;
  const hasTaxId = useField('hasTaxId').input.value;

  const handleMiddleNameToggle = useCallback(
    (checked: boolean) => {
      form.change('hasMiddleName', checked);
      if (!checked) form.change('middleName', '');
    },
    [form],
  );

  const handleTaxIdToggle = useCallback(
    (checked: boolean) => {
      form.change('hasTaxId', checked);
      if (!checked) form.change('taxId', '');
    },
    [form],
  );

  const middleNameHint = hasMiddleName ? undefined : 'Немає по батькові згідно документів';
  const taxIdHint = hasTaxId ? undefined : 'Немає ІПН за віком чи має відмітку у паспорті';

  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Дані пацієнта</h2>

      <div className={styles.section__grid}>
        <FormField name="lastName" label="Прізвище" required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField name="firstName" label="Ім'я" required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField
          name="middleName"
          label="По батькові"
          required={hasMiddleName}
          disabled={!hasMiddleName}
          extra={<ToggleSwitch checked={hasMiddleName} onChange={handleMiddleNameToggle} />}
          hint={middleNameHint}
        >
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField
          name="taxId"
          label="РНОКПП (ІПН)"
          required={hasTaxId}
          disabled={!hasTaxId}
          extra={<ToggleSwitch checked={hasTaxId} onChange={handleTaxIdToggle} />}
          hint={taxIdHint}
        >
          {(props) => <TextInput {...props} maxLength={10} inputMode="numeric" />}
        </FormField>

        <FormField name="birthDate" label="Дата народження" required>
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

        <FormField name="gender" label="Стать" required>
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
              placeholder="- Вибрати -"
            />
          )}
        </FormField>
      </div>

      <div className={clsx(styles.section__grid, styles['section__grid--two-col'])}>
        <FormField name="birthCountry" label="Країна народження" required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField name="birthPlace" label="Місце народження" required>
          {(props) => <TextInput {...props} />}
        </FormField>

        <FormField name="contactMethod" label="Бажаний спосіб зв'язку із пацієнтом">
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
              placeholder="- Вибрати -"
            />
          )}
        </FormField>

        <FormField name="secretWord" label="Секретне слово (не менше 6 символів)" required>
          {(props) => <TextInput {...props} type="password" />}
        </FormField>

        <FormField name="phone" label="Контактний номер телефону">
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

        <FormField name="email" label="Адреса електронної пошти">
          {(props) => <TextInput {...props} type="email" placeholder="example@example.com" />}
        </FormField>
      </div>
    </section>
  );
}