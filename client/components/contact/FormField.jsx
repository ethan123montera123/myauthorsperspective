import propTypes from "prop-types";

export default function FormField({
  value,
  setFn,
  label,
  type,
  name,
  id,
  placeholder,
  required,
}) {
  return (
    <div className="FormField flex flex-col mb-4">
      <label htmlFor={name} className="uppercase font-medium">
        {label}
      </label>
      <input
        className="border-[1.5px] border-black rounded-xl px-2 py-1"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setFn(e.target.value);
        }}
        required={required}
      />
    </div>
  );
}

FormField.propTypes = {
  value: propTypes.string.isRequired,
  setFn: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  placeholder: propTypes.string,
  required: propTypes.any,
};
