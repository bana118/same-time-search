import { useState, useEffect } from "react";
import {
  loadOptions,
  optionsLabel,
  Options,
  optionsSchema,
  saveOptions,
} from "../utils/options";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAdd, IoClose } from "react-icons/io5";

type OptionsFormProps = {
  className?: string;
};

export const OptionsForm = ({ className }: OptionsFormProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Options>({
    resolver: zodResolver(optionsSchema),
    defaultValues: {
      pages: [
        {
          url: "https://google.com",
          stringInputElement: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pages",
  });

  useEffect(() => {
    loadOptions((options) => {
      setValue("pages", options.pages, { shouldValidate: true });
    });
  }, []);

  const save = (data: Options) => {
    saveOptions({ pages: data.pages }, () => {
      setShowTooltip(true);
    });
  };

  const addPage = () => {
    append({ url: "https://google.com", stringInputElement: "" });
  };

  const removePage = (index: number) => {
    remove(index);
  };

  return (
    <div className={className} onSubmit={handleSubmit(save)}>
      <form>
        <div className="flex flex-col items-center mb-4">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onBlur={() => setShowTooltip(false)}
          >
            Save
          </button>
          <div className={showTooltip ? "" : "invisible"}>
            <span className="text-sm text-green-500 rounded shadow-lg tooltip">
              Saved!
            </span>
          </div>
        </div>
        {fields.map((option, index) => {
          return (
            <div
              key={index}
              className="px-8 py-6 mb-4 bg-white rounded shadow-md"
            >
              <div className="flex">
                <p className="text-sm">{index + 1}</p>
                <button
                  className="ml-auto"
                  type="button"
                  onClick={() => removePage(index)}
                >
                  <IoClose size={24} />
                </button>
              </div>
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
      </form>
      <button
        className="flex ml-auto mr-auto bg-blue-500 rounded-full"
        onClick={addPage}
      >
        <IoAdd size={36} color="white" />
      </button>
    </div>
  );
};
