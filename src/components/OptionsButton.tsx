import { FaCog } from "react-icons/fa";

type OptionsButtonProps = {
  className?: string;
};

export const OptionsButton = ({
  className,
}: OptionsButtonProps): JSX.Element => {
  return (
    <button
      className={className}
      onClick={() => {
        chrome.runtime.openOptionsPage();
      }}
    >
      <FaCog size={24} />
    </button>
  );
};
