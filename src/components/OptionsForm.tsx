import { useState, useEffect } from "react";
import {
  loadOptions,
  optionsLabel,
  Options,
  optionsSchema,
  saveOptions,
} from "../utils/options";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAdd } from "react-icons/io5";

type OptionsFormProps = {
  className?: string;
};

export const OptionsForm = ({ className }: OptionsFormProps): JSX.Element => {
  const [loadedOptions, setLoadedOptions] = useState<Options | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Options>({
    resolver: zodResolver(optionsSchema),
  });

  useEffect(() => {
    loadOptions((options) => {
      setLoadedOptions(options);
    });
  }, []);

  const save = (data: Options) => {
    saveOptions({ pages: data.pages }, () => {
      setShowTooltip(true);
    });
  };

  const addPage = () => {
    if (loadedOptions == null) return;
    const newPage: Options["pages"][0] = {
      url: "https://google.com",
      stringInputElement: "",
    };
    setLoadedOptions({ pages: [...loadedOptions.pages, newPage] });
  };

  return (
    <div className={className} onSubmit={handleSubmit(save)}>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        {loadedOptions != null &&
          loadedOptions.pages.map((option, index) => {
            return (
              <div key={index}>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="url"
                  >
                    {optionsLabel.url}
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="url"
                    placeholder="https://google.com"
                    defaultValue={option.url}
                    {...register(`pages.${index}.url`)}
                  />
                  {errors.pages?.[index]?.url?.message && (
                    <p className="text-xs italic text-red-500">
                      {errors.pages[index]?.url?.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="input"
                  >
                    {optionsLabel.stringInputElement}
                  </label>
                  <textarea
                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="input"
                    placeholder='<input type="text" class="form-control" id="search" />'
                    rows={3}
                    defaultValue={option.stringInputElement}
                    {...register(`pages.${index}.stringInputElement`)}
                  />
                  {errors.pages?.[index]?.stringInputElement?.message && (
                    <p className="text-xs italic text-red-500">
                      {errors.pages[index]?.stringInputElement?.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
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
      <button
        className="flex items-center ml-auto mr-auto bg-blue-500 border rounded-full w-9 h-9"
        onClick={addPage}
      >
        <IoAdd size={36} color="white" />
      </button>
    </div>
  );
};
