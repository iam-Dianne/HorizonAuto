import React from "react";
import Button from "../components/Button";

interface ConfirmAlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-200 text-gray-800 rounded-lg w-full max-w-md p-6 shadow-xl border border-gray-300">
        <h2 className="text-lg font-semibold text-center mb-4">{message}</h2>
        <div className="flex justify-center gap-4">
          <Button
            buttonName="Confirm"
            type="button"
            fontColor="text-gray-200"
            buttonColor="bg-primary-light
            "
            buttonHoverColor="hover:bg-primary"
            buttonWidth="w-1/2"
            onClickFunction={onConfirm}
          />
          <Button
            buttonName="Cancel"
            type="button"
            fontColor="text-gray-900"
            buttonColor="bg-gray-300"
            buttonHoverColor="hover:bg-gray-400"
            buttonWidth="w-1/2"
            onClickFunction={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
