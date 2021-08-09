import { searchInputAndForm, searchSubmitButton } from "../utils/element";
import { Message } from "../utils/message";

chrome.runtime.onMessage.addListener((message: Message) => {
  const inputAndForm = searchInputAndForm(message.stringInputElement);
  // TODO エラーを表示する
  if (inputAndForm == null) return;

  inputAndForm.inputElement.value = message.searchText;
  // zenn.devなどではchangeイベントを発火させる必要がある
  inputAndForm.inputElement.dispatchEvent(
    new Event("change", { bubbles: true })
  );

  if (inputAndForm.formElement != null) {
    const submitButton = searchSubmitButton(inputAndForm.formElement);
    if (submitButton == null) {
      inputAndForm.formElement.submit();
    } else {
      // submit buttonがあればsubmitイベントが発火するのでsubmit buttonを使う
      submitButton.click();
    }
  }
});

export {};
