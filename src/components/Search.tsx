import { useState } from "react";

export const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const search = async () => {
    console.log("Search:", searchText);
    await chrome.tabs.create({
      url: "https://www.google.com/",
      active: false,
    });
  };
  return (
    <form className="m-2" onSubmit={search}>
      <div className="flex">
        <input
          placeholder="Search..."
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex mt-2">
        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
          Search
        </button>
      </div>
    </form>
  );
};
