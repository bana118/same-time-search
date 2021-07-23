import { z } from "zod";
import { isInputElement, stringToElement } from "./element";

export const optionsSchema = z.object({
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

export type Options = z.infer<typeof optionsSchema>;

export const optionsLabel: { [P in keyof Options["pages"][0]]-?: string } = {
  url: "URL(Required)",
  stringInputElement: "Input Element (Optional)",
};

export const saveOptions = (options: Options, onSave?: () => void): void => {
  chrome.storage.sync.set(options, onSave);
};

export const loadOptions = (onLoad?: (options: Options) => void): void => {
  chrome.storage.sync.get(["pages"], (items) => {
    if (onLoad != null) {
      const options = items as Options;
      onLoad(options);
    }
  });
};
