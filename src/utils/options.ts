import { z } from "zod";
import { isInputElement, stringToElement } from "./element";

export const optionsSchema = z.object({
  pages: z
    .array(
      z.object({
        url: z
          .string()
          .min(1, "URL is Required")
          .url("Not URL")
          .max(1000, "Maximum URL length is 1000"),
        stringInputElement: z
          .string()
          .max(1000, "Maximum Input Element length is 1000")
          .refine((value) => {
            if (value === "") return true;
            const element = stringToElement(value);
            if (element == null) return false;
            return isInputElement(element);
          }, "Not Input Element"),
      })
    )
    .min(1, "At least one URL is required")
    .max(10, "Maximum number of URLs is 10"),
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

export const defaultUrl = "https://google.com";
export const defaultStringInputElement = "";
export const maxUrls = 20;
export const minUrls = 1;
