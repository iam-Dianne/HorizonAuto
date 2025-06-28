interface ButtonProps {
  buttonName: string;
  type?: "button" | "submit" | "reset";
  fontColor?: string;
  onClickFunction?: () => void;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonWidth?: string;
  border?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonName,
  type = "button",
  fontColor = "text-gray-200",
  onClickFunction,
  buttonColor = "bg-primary-light",
  buttonHoverColor = "hover:bg-primary",
  buttonWidth = "w-full",
  border = "border-0",
}) => {
  return (
    <button
      type={type}
      onClick={onClickFunction}
      className={`cursor-pointer rounded-lg py-2 px-5 mt-5 ${fontColor} ${buttonColor} ${buttonHoverColor} ${buttonWidth} ${border} transition duration-200`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
