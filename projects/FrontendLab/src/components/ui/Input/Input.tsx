import "../../../styles/input.css"

type InputProps = {
  type?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export function Input({
  type = "text",
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="ui-input"
    />
  )
}
