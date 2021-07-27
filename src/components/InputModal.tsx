type InputModalProps = {
  open: boolean;
  onClose: () => void;
};

export const InputModal = ({ open, onClose }: InputModalProps): JSX.Element => {
  if (!open) {
    return <div></div>;
  }
  return (
    <div className="fixed inset-0 flex overflow-auto bg-gray-800 bg-opacity-50">
      <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg">
        <div>Test</div>
        <span className="absolute top-0 right-0 p-4">
          <button onClick={() => onClose()}>Close</button>
        </span>
      </div>
    </div>
  );
};
