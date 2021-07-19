import { Message } from "../utils/message-type";

chrome.runtime.onMessage.addListener((message: Message) => {
  const inputEl = document.getElementsByClassName(
    "gLFyf gsfi"
  )[0] as HTMLInputElement;
  inputEl.value = message.searchText;
});

export {};
