import { useState } from "react";
import { GroupForm } from "./OptionsForm";
import { IoAdd, IoClose } from "react-icons/io5";

type GroupTabsProps = {
  className?: string;
};

export const GroupTabs = ({ className }: GroupTabsProps): JSX.Element => {
  const [selected, setSelected] = useState(0);
  const array = [0, 1, 2, 3];
  const addTab = () => {
    console.log("add");
  };
  const removeTab = (index: number) => {
    console.log(`remove ${index}`);
  };
  return (
    <div className={className}>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {array.map((i) => {
            if (i === selected) {
              return (
                <div key={i} className="border-r">
                  <div className="flex px-6 py-4 border-b-2 border-blue-500">
                    <button
                      className="block mr-5 font-medium text-blue-500"
                      onClick={() => {
                        setSelected(i);
                      }}
                    >
                      Tab {i + 1}
                    </button>
                    <button
                      className="block text-gray-600  hover:text-blue-500"
                      onClick={() => removeTab(i)}
                    >
                      <IoClose size={18} />
                    </button>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex px-6 py-4 border-r">
                <button
                  className="block mr-5 text-gray-600 hover:text-blue-500"
                  onClick={() => {
                    setSelected(i);
                  }}
                >
                  Tab {i + 1}
                </button>
                <button
                  className="block text-gray-600  hover:text-blue-500"
                  onClick={() => removeTab(i)}
                >
                  <IoClose size={18} />
                </button>
              </div>
            );
          })}
          <button
            className="block px-6 py-4 text-gray-600  hover:text-blue-500"
            onClick={addTab}
          >
            <IoAdd size={24} />
          </button>
        </nav>
      </div>
      <GroupForm tabIndex={selected} />
    </div>
  );
};
