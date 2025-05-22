interface ButtonProps {
  buttonName: string;
  fontColor?: string;
  onClickFunction?: () => void;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonWidth?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonName,
  fontColor = "text-gray-200",
  onClickFunction,
  buttonColor = "bg-primary-light",
  buttonHoverColor = "hover:bg-primary",
  buttonWidth = "w-full",
}) => {
  return (
    <button
      onClick={onClickFunction}
      className={`cursor-pointer rounded-lg py-2 px-5 mt-5 ${fontColor} ${buttonColor} ${buttonHoverColor} ${buttonWidth} transition duration-200`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
