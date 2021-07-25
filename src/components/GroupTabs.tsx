import { useState } from "react";
import { GroupForm } from "./OptionsForm";

type GroupTabsProps = {
  className?: string;
};

export const GroupTabs = ({ className }: GroupTabsProps): JSX.Element => {
  const [selected, setSelected] = useState(0);
  const array = [0, 1, 2, 3];
  return (
    <div className={className}>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {array.map((i) => {
            if (i === selected) {
              return (
                <button
                  key={i}
                  className="block px-6 py-4 font-medium text-blue-500 border-b-2 border-blue-500 hover:text-blue-500 focus:outline-none"
                  onClick={() => {
                    setSelected(i);
                  }}
                >
                  Tab {i + 1}
                </button>
              );
            }
            return (
              <button
                key={i}
                className="block px-6 py-4 text-gray-600 hover:text-blue-500 focus:outline-none"
                onClick={() => {
                  setSelected(i);
                }}
              >
                Tab {i + 1}
              </button>
            );
          })}
        </nav>
      </div>
      <GroupForm tabIndex={selected} />
    </div>
  );
};
