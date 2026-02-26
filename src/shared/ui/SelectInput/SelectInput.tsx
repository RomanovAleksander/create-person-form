import type { SingleValue } from 'react-select';
import ReactSelect from 'react-select';

import clsx from 'clsx';

import type { SelectOption } from '@/shared/types/form';

import styles from './SelectInput.module.scss';

interface SelectInputProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}

export function SelectInput({
  id,
  name,
  options,
  placeholder,
  hasError,
  value,
  onChange,
  onBlur,
  disabled,
}: SelectInputProps) {
  const selectedOption = options.find((option) => option.value === value) ?? null;

  const handleChange = (option: SingleValue<SelectOption>) => {
    onChange(option?.value ?? '');
  };

  return (
    <ReactSelect<SelectOption>
      inputId={id}
      name={name}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onBlur={onBlur}
      isClearable
      isSearchable={false}
      placeholder={placeholder}
      isDisabled={disabled}
      unstyled
      className={clsx(styles.select, {
        [styles.select_error]: hasError,
        [styles.select_placeholder]: !value
      })}
      classNamePrefix="react-select"
    />
  );
}