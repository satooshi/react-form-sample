import React from 'react';
import ErrorMessage from './Atoms/ErrorMessage';
import FormLabel from './Atoms/FormLabel';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
};

const TextArea: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  value,
}) => {
  console.log('render TextArea', { id });

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <>
      <FormLabel id={id} labelText={labelText} />
      <textarea
        id={id}
        onChange={handleChange}
        className={error ? 'form-control is-invalid' : 'form-control'}
        value={value}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default React.memo(TextArea);
