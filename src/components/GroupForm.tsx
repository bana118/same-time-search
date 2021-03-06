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
import { InputModal } from "./InputModal";

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
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
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
    <div className={className}>
      <div className="flex justify-center mb-4">
        <InputModal
          open={importModalOpen}
          onClose={() => setImportModalOpen(false)}
          onBackgroundClick={() => setImportModalOpen(false)}
          defaultValue=""
          helpText={chrome.i18n.getMessage("importHelpText")}
          submitButtonText={chrome.i18n.getMessage("importSaveButtonLabel")}
          onSubmit={(value) => {
            setImportModalOpen(false);
            try {
              const group: Group = JSON.parse(value);
              setValue("pages", group.pages, { shouldValidate: true });
              setValue("name", group.name, { shouldValidate: true });
              handleSubmit(save)();
            } catch {
              setError("name", {
                type: "manual",
                message: chrome.i18n.getMessage("importErrorMessage"),
              });
            }
          }}
        />
        <button
          className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setImportModalOpen(true);
          }}
        >
          {chrome.i18n.getMessage("importButtonLabel")}
        </button>
        <InputModal
          open={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          onBackgroundClick={() => setExportModalOpen(false)}
          defaultValue={JSON.stringify(group)}
          helpText={chrome.i18n.getMessage("exportHelpText")}
        />
        <button
          className="px-4 py-2 font-bold text-white bg-pink-500 rounded hover:bg-pink-700 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setExportModalOpen(true);
          }}
        >
          {chrome.i18n.getMessage("exportButtonLabel")}
        </button>
      </div>
      <form onSubmit={handleSubmit(save)}>
        <div className="flex flex-col items-center mb-4">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onBlur={() => setShowTooltip(false)}
          >
            {chrome.i18n.getMessage("optionsSaveButtonLabel")}
          </button>
          <div className={showTooltip ? "" : "invisible"}>
            <span className="text-sm text-green-500 rounded shadow-lg tooltip">
              {chrome.i18n.getMessage("optionsSavedTooltip")}
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
        {fields.map((_option, index) => {
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
          className="flex ml-auto mr-auto bg-blue-500 rounded-full hover:bg-blue-700"
          onClick={addPage}
        >
          <IoAdd size={36} color="white" />
        </button>
      )}
    </div>
  );
};
