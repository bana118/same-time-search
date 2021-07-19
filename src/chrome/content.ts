import { Message } from "../utils/message";

chrome.runtime.onMessage.addListener((message: Message) => {
  const inputEl = document.getElementsByClassName(
    "gLFyf gsfi"
  )[0] as HTMLInputElement;
  inputEl.value = message.searchText;
  let formEl: HTMLFormElement | null = null;
  let element: HTMLElement = inputEl;
  while (element.parentElement != null) {
    if (element.parentElement.tagName.toLowerCase() === "form") {
      formEl = element.parentElement as HTMLFormElement;
      break;
    }
    element = element.parentElement;
  }
  if (formEl != null) {
    formEl.submit();
  }
});

export {};
