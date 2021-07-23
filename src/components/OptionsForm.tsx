import { useState, useEffect } from "react";
import { loadOptions, saveOptions } from "../utils/options";

type OptionsFormProps = {
  className?: string;
};

export const OptionsForm = ({ className }: OptionsFormProps): JSX.Element => {
  const [url, setUrl] = useState("");
  const [stringInputElement, setStringInputElement] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    loadOptions((options) => {
      setUrl(options.url);
      setStringInputElement(options.stringInputElement);
    });
  }, []);

  // TODO url, element のバリデーション
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveOptions({ url, stringInputElement }, () => {
      setShowTooltip(true);
    });
  };
  return (
    <div className={className} onSubmit={onSubmit}>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="url"
          >
            URL (Required)
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="urk"
            type="text"
            placeholder="https://google.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="input"
          >
            Input Element (Optional)
          </label>
          <textarea
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="input"
            placeholder='<input type="text" class="form-control" id="search" />'
            rows={3}
            value={stringInputElement}
            onChange={(e) => setStringInputElement(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onBlur={() => setShowTooltip(false)}
          >
            Save
          </button>
          <div className={showTooltip ? "" : "invisible"}>
            <span className="ml-2 text-green-500 bg-gray-100 rounded shadow-lg tooltip">
              Saved!
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
