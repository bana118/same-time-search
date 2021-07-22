import { searchInputAndForm, searchSubmitButton } from "../utils/element";
import { Message } from "../utils/message";
import { loadOptions } from "../utils/options";

chrome.runtime.onMessage.addListener((message: Message) => {
  loadOptions((options) => {
    const inputAndForm = searchInputAndForm(options.stringInputElement);
    if (inputAndForm == null) return;

    inputAndForm.inputElement.value = message.searchText;
    // zenn.devなどではchangeイベントを発火させる必要がある
    inputAndForm.inputElement.dispatchEvent(
      new Event("change", { bubbles: true })
    );

    const submitButton = searchSubmitButton(inputAndForm.formElement);
    if (submitButton == null) {
      inputAndForm.formElement.submit();
    } else {
      // submit buttonがあればsubmitイベントが発火するのでsubmit buttonを使う
      submitButton.click();
    }
  });
});

export {};
