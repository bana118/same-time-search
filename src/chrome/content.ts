import { searchInputAndForm, searchSubmitButton } from "../utils/element";
import { Message } from "../utils/message";
import { noSubmitDomains } from "../utils/no-submit-domain-list";

chrome.runtime.onMessage.addListener((message: Message) => {
  const inputAndForm = searchInputAndForm(message.stringInputElement);
  // TODO エラーを表示する
  if (inputAndForm == null) return;

  inputAndForm.inputElement.value = message.searchText;
  // zenn.devなどではchangeイベントを発火させる必要がある
  inputAndForm.inputElement.dispatchEvent(
    new Event("change", { bubbles: true })
  );
  // loosedrawing.comなどではinputイベントを発火させる必要がある
  inputAndForm.inputElement.dispatchEvent(
    new Event("input", { bubbles: true })
  );

  const domain = document.domain;

  if (inputAndForm.formElement != null && !noSubmitDomains.includes(domain)) {
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
