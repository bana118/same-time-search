import { IoClose } from "react-icons/io5";

type InputModalProps = {
  open: boolean;
  onClose: () => void;
  defaultValue?: string;
  helpText?: string;
  submitButtonText?: string;
};

export const InputModal = ({
  open,
  onClose,
  defaultValue,
  helpText,
  submitButtonText,
}: InputModalProps): JSX.Element => {
  if (!open) {
    return <div></div>;
  }
  return (
    <div className="fixed inset-0 flex overflow-auto bg-gray-800 bg-opacity-50">
      <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg">
        <span className="absolute top-0 right-0 pt-2 pb-4 pl-2 pr-4">
          <button onClick={() => onClose()}>
            <IoClose size={24} />
          </button>
        </span>
        <div className="mx-2 mb-2">{helpText != null && <p>{helpText}</p>}</div>
        <textarea
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="input"
          rows={3}
          defaultValue={defaultValue}
        />
        {submitButtonText != null && (
          <div className="flex justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {submitButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
