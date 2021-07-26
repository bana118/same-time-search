import { z } from "zod";
import { isInputElement, stringToElement } from "./element";

export const GroupNameLabel = chrome.i18n.getMessage("optionsGroupNameLabel");
export const defaultUrl = "https://google.com";
export const defaultStringInputElement = "";
export const defaultGroupName = chrome.i18n.getMessage(
  "optionsDefaultGroupName"
);
export const maxUrls = 20;
export const minUrls = 1;
const maxUrlLength = 1000;
const maxInputElementLength = 1000;
const maxGroupNameLength = 100;
export const maxGroups = 10;
export const minGroups = 1;

export const groupSchema = z.object({
  name: z
    .string()
    .min(1, chrome.i18n.getMessage("optionsGroupNameRequire"))
    .max(
      maxGroupNameLength,
      chrome.i18n.getMessage("optionsGroupNameMax", [maxGroupNameLength])
    ),
  pages: z
    .array(
      z.object({
        url: z
          .string()
          .min(1, chrome.i18n.getMessage("optionsUrlRequire"))
          .url(chrome.i18n.getMessage("optionsUrlInvalid"))
          .max(
            maxUrlLength,
            chrome.i18n.getMessage("optionsUrlMax", [maxUrlLength])
          ),
        stringInputElement: z
          .string()
          .max(
            maxInputElementLength,
            chrome.i18n.getMessage("optionsInputElementMax", [
              maxInputElementLength,
            ])
          )
          .refine((value) => {
            if (value === "") return true;
            const element = stringToElement(value);
            if (element == null) return false;
            return isInputElement(element);
          }, chrome.i18n.getMessage("optionsInputElementInvalid")),
      })
    )
    .min(1, chrome.i18n.getMessage("optionsPageRequire"))
    .max(maxUrls, chrome.i18n.getMessage("optionsPageMax", [maxUrls])),
});

export type Group = z.infer<typeof groupSchema>;

export type Options = { groups: Group[] };

export const pagesLabel: {
  [P in keyof Group["pages"][0]]-?: string;
} = {
  url: chrome.i18n.getMessage("optionsUrlLabel"),
  stringInputElement: chrome.i18n.getMessage("optionsInputElementLabel"),
};

export const saveOptions = (options: Options, onSave?: () => void): void => {
  chrome.storage.sync.set(options, onSave);
};

export const loadOptions = (onLoad?: (options: Options) => void): void => {
  chrome.storage.sync.get(["groups"], (items) => {
    if (items.groups == null) {
      const defaultGroups: Group[] = [
        {
          name: defaultGroupName,
          pages: [
            {
              url: defaultUrl,
              stringInputElement: defaultStringInputElement,
            },
          ],
        },
      ];
      items.groups = defaultGroups;
    }
    const options = items as Options;
    if (onLoad != null && options != null) {
      onLoad(options);
    }
  });
};

export const saveGroup = (
  group: Group,
  index: number,
  onSave?: (newGroups: Group[]) => void
): void => {
  loadOptions((options) => {
    if (options.groups.length + 1 < index) return;
    // Add Group
    if (options.groups.length + 1 === index) {
      const newGroups = [...options.groups, group];
      saveOptions({ groups: newGroups }, () => {
        if (onSave != null) {
          onSave(newGroups);
        }
      });
      return;
    }
    // Modify Group
    const newGroups = options.groups;
    newGroups[index] = group;
    saveOptions({ groups: newGroups }, () => {
      if (onSave != null) {
        onSave(newGroups);
      }
    });
  });
};

export const removeGroup = (
  index: number,
  onRemove?: (newGroups: Group[]) => void
): void => {
  loadOptions((options) => {
    if (options.groups.length < index) return;
    const newGroups = [...options.groups];
    newGroups.splice(index, 1);
    saveOptions({ groups: newGroups }, () => {
      if (onRemove != null) {
        onRemove(newGroups);
      }
    });
  });
};
