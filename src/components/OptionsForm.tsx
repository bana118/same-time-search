import { useState } from "react";
import {
  pagesLabel,
  defaultStringInputElement,
  defaultUrl,
  maxUrls,
  minUrls,
  groupSchema,
  Group,
  GroupNameLabel,
} from "../utils/options";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAdd, IoClose } from "react-icons/io5";
import { useEffect } from "react";

type GroupFormProps = {
  className?: string;
  tabIndex: number;
  group: Group;
  setGroup: (
    group: Group,
    index: number,
    onSet?: ((newGroups: Group[]) => void) | undefined
  ) => void;
};

export const GroupForm = ({
  className,
  tabIndex,
  group,
  setGroup,
}: GroupFormProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Group>({
    resolver: zodResolver(groupSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pages",
  });

  useEffect(() => {
    setValue("pages", group.pages, { shouldValidate: true });
    setValue("name", group.name, { shouldValidate: true });
  }, [group]);

  const save = (data: Group) => {
    setGroup(data, tabIndex, () => {
      setShowTooltip(true);
    });
  };

  const addPage = () => {
    append({ url: defaultUrl, stringInputElement: defaultStringInputElement });
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
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            {GroupNameLabel}
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-xs italic text-red-500">{errors.name.message}</p>
          )}
        </div>
        {fields.map((option, index) => {
          return (
            <div
              key={index}
              className="px-8 py-6 mb-4 bg-white rounded shadow-md"
            >
              <div className="flex">
                <p className="text-sm">{index + 1}</p>
                {fields.length > minUrls && (
                  <button
                    className="ml-auto"
                    type="button"
                    onClick={() => removePage(index)}
                  >
                    <IoClose size={24} />
                  </button>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="url"
                >
                  {pagesLabel.url}
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="url"
                  placeholder="https://google.com"
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
                  {pagesLabel.stringInputElement}
                </label>
                <textarea
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="input"
                  placeholder='<input type="text" class="form-control" id="search" />'
                  rows={3}
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
      {fields.length < maxUrls && (
        <button
          className="flex ml-auto mr-auto bg-blue-500 rounded-full"
          onClick={addPage}
        >
          <IoAdd size={36} color="white" />
        </button>
      )}
    </div>
  );
};
