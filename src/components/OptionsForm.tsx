import { useState, useEffect } from "react";
import { loadOptions, saveOptions } from "../utils/options";
import { z } from "zod";
import { isInputElement, stringToElement } from "../utils/element";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type OptionsFormProps = {
  className?: string;
};

const schema = z.object({
  pages: z.array(
    z.object({
      url: z.string().min(1, "URL is Required").url("Not URL"),
      stringInputElement: z.string().refine((value) => {
        if (value === "") return true;
        const element = stringToElement(value);
        if (element == null) return false;
        return isInputElement(element);
      }, "Not Input Element"),
    })
  ),
});

type Schema = z.infer<typeof schema>;

const labels: { [P in keyof Schema["pages"][0]]-?: string } = {
  url: "URL(Required)",
  stringInputElement: "Input Element (Optional)",
};

export const OptionsForm = ({ className }: OptionsFormProps): JSX.Element => {
  const [url, setUrl] = useState("");
  const [stringInputElement, setStringInputElement] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    loadOptions((options) => {
      setUrl(options.pages[0].url);
      setStringInputElement(options.pages[0].stringInputElement);
    });
  }, []);

  const save = (data: Schema) => {
    saveOptions({ pages: data.pages }, () => {
      setShowTooltip(true);
    });
  };

  return (
    <div className={className} onSubmit={handleSubmit(save)}>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="url"
          >
            {labels.url}
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="url"
            placeholder="https://google.com"
            defaultValue={url}
            {...register("pages.0.url")}
          />
          {errors.pages?.[0]?.url?.message && (
            <p className="text-xs italic text-red-500">
              {errors.pages?.[0].url.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="input"
          >
            {labels.stringInputElement}
          </label>
          <textarea
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="input"
            placeholder='<input type="text" class="form-control" id="search" />'
            rows={3}
            defaultValue={stringInputElement}
            {...register("pages.0.stringInputElement")}
          />
          {errors.pages?.[0]?.stringInputElement?.message && (
            <p className="text-xs italic text-red-500">
              {errors.pages?.[0].stringInputElement.message}
            </p>
          )}
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
