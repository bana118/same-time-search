import { useState } from "react";
import { IoClose } from "react-icons/io5";

type InputModalProps = {
  open: boolean;
  onClose: () => void;
  onBackgroundClick?: () => void;
  defaultValue: string;
  helpText?: string;
  submitButtonText?: string;
  onSubmit?: (value: string) => void;
};

export const InputModal = ({
  open,
  onClose,
  onBackgroundClick,
  defaultValue,
  helpText,
  submitButtonText,
  onSubmit,
}: InputModalProps): JSX.Element => {
  if (!open) {
    return <div></div>;
  }
  const [textareaValue, setTextareaValue] = useState(defaultValue);
  return (
    <div
      className="fixed inset-0 flex overflow-auto bg-gray-800 bg-opacity-50"
      onClick={onBackgroundClick}
    >
      <div
        className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="absolute top-0 right-0 pt-2 pb-4 pl-2 pr-4">
          <button onClick={() => onClose()}>
            <IoClose size={24} />
          </button>
        </span>
        <div className="mx-2 mb-2 text-base">
          {helpText != null && <p>{helpText}</p>}
        </div>
        <textarea
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          rows={10}
          value={textareaValue}
          onChange={(event) => {
            setTextareaValue(event.target.value);
          }}
        />
        {submitButtonText != null && onSubmit != null && (
          <div className="flex justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => onSubmit(textareaValue)}
            >
              {submitButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
