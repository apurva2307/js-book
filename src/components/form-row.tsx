import React from "react";
interface FormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: (e: Event) => void;
}
const FormRow: React.FC<FormRowProps> = ({
  type,
  name,
  value,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        // @ts-ignore
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
