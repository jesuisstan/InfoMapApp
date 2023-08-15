import { useState } from 'react';
import styles from '../../styles/FormInput.module.css';

const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (event: React.FormEvent) => {
    setFocused(false); // change to true if error message is desired to be shown onBlur too
  };

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}:</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={focused.toString()}
        className={styles.input}
      />
      <span className={styles.helper}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
