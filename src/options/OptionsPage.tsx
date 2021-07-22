import { useEffect } from "react";
import { useState } from "react";
import { loadOptions, saveOptions } from "../utils/options";

export const OptionsPage = (): JSX.Element => {
  const [url, setUrl] = useState("");
  const [inputElement, setInputElement] = useState("");
  useEffect(() => {
    loadOptions((options) => {
      setUrl(options.url);
      setInputElement(options.inputElement);
    });
  }, []);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveOptions({ url, inputElement });
  };
  return (
    <div className="container mx-auto">
      <p>設定</p>
      <form onSubmit={onSubmit}>
        <input
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={inputElement}
          onChange={(e) => setInputElement(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
