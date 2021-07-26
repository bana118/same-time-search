import { useEffect, useState } from "react";
import { Message } from "../utils/message";
import { Group, loadOptions, Options } from "../utils/options";
import { IoChevronDown } from "react-icons/io5";

const createChromeTab = async (
  page: Group["pages"][0],
  searchText: string
): Promise<number> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create(
      {
        url: page.url,
        active: false,
      },
      (tab) => {
        if (tab.id != null) {
          const sendMessageToContentScript = (
            tabId: number,
            changeInfo: chrome.tabs.TabChangeInfo
          ) => {
            if (tabId === tab.id && changeInfo.status == "complete") {
              const stringInputElement = page.stringInputElement;
              const msg: Message = { searchText, stringInputElement };
              chrome.tabs.sendMessage(tabId, msg);
              chrome.tabs.onUpdated.removeListener(sendMessageToContentScript);
            }
          };
          chrome.tabs.onUpdated.addListener(sendMessageToContentScript);
          resolve(tab.id);
        }
        reject(new Error("Create Tab Failed"));
      }
    );
  });
};

export const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<Options | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    loadOptions((options) => {
      setOptions(options);
    });
  }, []);

  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchText === "" || options == null) return;
    const group = options.groups[selected];
    const tabIds = await Promise.all(
      group.pages.map((page) => createChromeTab(page, searchText))
    );
    const groupId = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(groupId, { title: group.name });
  };

  if (options == null) return <div></div>;

  return (
    <form onSubmit={search}>
      <input
        placeholder={chrome.i18n.getMessage("popupSearchPlaceholder")}
        className="flex-1 w-full px-4 py-2 my-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="w-full px-3">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-700"
          htmlFor="group"
        >
          {chrome.i18n.getMessage("popupSearchGroupLabel")}
        </label>
        <div className="relative">
          <select
            className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            id="group"
            onChange={(e) => {
              setSelected(parseInt(e.target.value, 10));
            }}
          >
            {options.groups.map((group, index) => {
              if (index === selected) {
                return (
                  <option key={index} value={index} selected>
                    {group.name}
                  </option>
                );
              }
              return (
                <option key={index} value={index}>
                  {group.name}
                </option>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <IoChevronDown />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex-shrink-0 px-4 py-2 mt-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
      >
        {chrome.i18n.getMessage("popupSearchButtonLabel")}
      </button>
    </form>
  );
};
