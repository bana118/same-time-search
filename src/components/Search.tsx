import { useState } from "react";
import { Message } from "../utils/message";
import { loadOptions } from "../utils/options";

export const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchText === "") return;
    loadOptions((options) => {
      for (const page of options.pages) {
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
                  chrome.tabs.onUpdated.removeListener(
                    sendMessageToContentScript
                  );
                }
              };
              chrome.tabs.onUpdated.addListener(sendMessageToContentScript);
            }
          }
        );
      }
    });
  };

  return (
    <form onSubmit={search}>
      <input
        placeholder="Search..."
        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="submit"
        className="flex-shrink-0 px-4 py-2 mt-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      >
        Search
      </button>
    </form>
  );
};
