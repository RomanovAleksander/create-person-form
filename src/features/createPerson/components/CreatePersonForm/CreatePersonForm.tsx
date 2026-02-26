import { useCallback, useState } from 'react';
import { Form } from 'react-final-form';

import { Button } from '@/shared/ui';
import { zodAdapter } from '@/shared/utils/zodAdapter';

import {
  createPersonInitialValues,
  type CreatePersonFormValues,
  createPersonSchema,
} from '../../validation/createPersonSchema';
import { DocumentSection } from '../DocumentSection';
import { FormResult } from '../FormResult';
import { PatientDataSection } from '../PatientDataSection';
import styles from './CreatePersonForm.module.scss';

const validate = zodAdapter(createPersonSchema);

export function CreatePersonForm() {
  const [submittedData, setSubmittedData] = useState<CreatePersonFormValues | null>(null);

  const handleSubmit = useCallback((values: CreatePersonFormValues) => {
    setSubmittedData(values);
  }, []);

  return (
    <>
      <Form<CreatePersonFormValues>
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={createPersonInitialValues}
      >
        {({ handleSubmit: formHandleSubmit, submitting, invalid }) => (
          <form onSubmit={formHandleSubmit} noValidate className={styles.form}>
            <PatientDataSection />
            <DocumentSection />
            <div className={styles.form__actions}>
              <Button type="submit" disabled={submitting || invalid}>
                Створити
              </Button>
            </div>
          </form>
        )}
      </Form>

      {submittedData && <FormResult data={submittedData} />}
    </>
  );
}
