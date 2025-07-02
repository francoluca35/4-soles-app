interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-3">
      <label className="block text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b-2 border-orange-300 outline-none placeholder-white placeholder-opacity-70 text-white"
        placeholder={label}
      />
    </div>
  );
}
