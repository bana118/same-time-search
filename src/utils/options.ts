import { z } from "zod";
import { isInputElement, stringToElement } from "./element";

export const defaultUrl = "https://google.com";
export const defaultStringInputElement = "";
export const maxUrls = 20;
export const minUrls = 1;
const maxUrlLength = 1000;
const maxInputElementLength = 1000;

export const pagesSchema = z.object({
  pages: z
    .array(
      z.object({
        url: z
          .string()
          .min(1, "URL is Required")
          .url("Not URL")
          .max(maxUrlLength, `Maximum URL length is 1000 ${maxUrlLength}`),
        stringInputElement: z
          .string()
          .max(
            maxInputElementLength,
            `Maximum Input Element length is ${maxInputElementLength}`
          )
          .refine((value) => {
            if (value === "") return true;
            const element = stringToElement(value);
            if (element == null) return false;
            return isInputElement(element);
          }, "Not Input Element"),
      })
    )
    .min(1, "At least one URL is required")
    .max(maxUrls, `Maximum number of URLs is ${maxUrls}`),
});

export type Pages = z.infer<typeof pagesSchema>;

export const optionsSchema = z.object({
  groups: z.array(pagesSchema),
});

export type Options = z.infer<typeof optionsSchema>;

export const pagesLabel: {
  [P in keyof Pages["pages"][0]]-?: string;
} = {
  url: "URL(Required)",
  stringInputElement: "Input Element (Optional)",
};

export const saveOptions = (options: Options, onSave?: () => void): void => {
  chrome.storage.sync.set(options, onSave);
};

export const loadOptions = (onLoad?: (options: Options) => void): void => {
  chrome.storage.sync.get(["pages"], (items) => {
    const options = items as Options;
    if (onLoad != null && options.groups != null) {
      onLoad(options);
    }
  });
};
