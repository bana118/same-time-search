export type Options = {
  url: string;
  stringInputElement: string;
};

export const saveOptions = (options: Options, onSave?: () => void): void => {
  chrome.storage.sync.set(options, onSave);
};

export const loadOptions = (onLoad?: (options: Options) => void): void => {
  chrome.storage.sync.get(["url", "inputElement"], (items) => {
    if (onLoad != null) {
      const options = items as Options;
      onLoad(options);
    }
  });
};
