import { useState } from "react";
import { GroupForm } from "./GroupForm";
import { IoAdd, IoClose } from "react-icons/io5";
import {
  defaultGroupName,
  defaultStringInputElement,
  defaultUrl,
  Group,
  loadOptions,
  maxGroups,
  minGroups,
  Options,
  removeGroup,
  saveGroup,
} from "../utils/options";
import { useEffect } from "react";

type GroupTabsProps = {
  className?: string;
};

// TODO タブ切り替えで編集中データが消えないようにする
export const GroupTabs = ({ className }: GroupTabsProps): JSX.Element => {
  const [selected, setSelected] = useState(0);
  const [options, setOptions] = useState<Options | null>(null);

  useEffect(() => {
    loadOptions((options) => {
      setOptions(options);
    });
  }, []);

  const addTab = () => {
    if (options == null) return;
    const newGroup: Group = {
      name: defaultGroupName,
      pages: [
        { url: defaultUrl, stringInputElement: defaultStringInputElement },
      ],
    };
    saveGroup(newGroup, options.groups.length, (newGroups) => {
      setOptions({ groups: newGroups });
      setSelected(options.groups.length);
    });
  };
  const removeTab = (index: number) => {
    if (options == null) return;
    removeGroup(index, (newGroups) => {
      if (index <= selected) {
        if (selected !== 0) {
          setSelected(selected - 1);
        }
      }
      setOptions({ groups: newGroups });
    });
  };

  const setGroup = (
    group: Group,
    index: number,
    onSet?: (newGroups: Group[]) => void
  ) => {
    saveGroup(group, index, (newGroups) => {
      setOptions({ groups: newGroups });
      if (onSet != null) {
        onSet(newGroups);
      }
    });
  };

  if (options == null) return <div></div>;

  return (
    <div className={className}>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {options.groups.map((group, index) => {
            if (index === selected) {
              return (
                <div key={index} className="border-r">
                  <div className="flex px-6 py-4 border-b-2 border-blue-500">
                    <button
                      className="block mr-5 font-medium text-blue-500"
                      onClick={() => {
                        setSelected(index);
                      }}
                    >
                      {group.name}
                    </button>
                    {options.groups.length > minGroups && (
                      <button
                        className="block text-gray-600  hover:text-blue-500"
                        onClick={() => removeTab(index)}
                      >
                        <IoClose size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className="flex px-6 py-4 border-r">
                <button
                  className="block mr-5 text-gray-600 hover:text-blue-500"
                  onClick={() => {
                    setSelected(index);
                  }}
                >
                  {group.name}
                </button>
                {options.groups.length > minGroups && (
                  <button
                    className="block text-gray-600  hover:text-blue-500"
                    onClick={() => removeTab(index)}
                  >
                    <IoClose size={18} />
                  </button>
                )}
              </div>
            );
          })}
          {options.groups.length < maxGroups && (
            <button
              className="block px-6 py-4 text-gray-600  hover:text-blue-500"
              onClick={addTab}
            >
              <IoAdd size={24} />
            </button>
          )}
        </nav>
      </div>
      <GroupForm
        tabIndex={selected}
        group={options.groups[selected]}
        setGroup={setGroup}
      />
    </div>
  );
};
