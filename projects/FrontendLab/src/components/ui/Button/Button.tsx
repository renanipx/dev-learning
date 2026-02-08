import "../../../styles/button.css"

type ButtonProps = {
  children: React.ReactNode
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="ui-button">
      {children}
    </button>
  )
}
