import { IoClose } from "react-icons/io5";

type InputModalProps = {
  open: boolean;
  onClose: () => void;
  defaultValue?: string;
};

export const InputModal = ({
  open,
  onClose,
  defaultValue,
}: InputModalProps): JSX.Element => {
  if (!open) {
    return <div></div>;
  }
  return (
    <div className="fixed inset-0 flex overflow-auto bg-gray-800 bg-opacity-50">
      <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg">
        <textarea
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="input"
          rows={3}
          defaultValue={defaultValue}
        />
        <span className="absolute top-0 right-0 pt-2 pb-4 pl-2 pr-4">
          <button onClick={() => onClose()}>
            <IoClose size={24} />
          </button>
        </span>
      </div>
    </div>
  );
};
