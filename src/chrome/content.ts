import { searchInputAndForm, searchSubmitButton } from "../utils/element";
import {
  ContentToBackgroundMessage,
  PopupToContentMessage,
} from "../utils/message";

chrome.runtime.onMessage.addListener((message: PopupToContentMessage) => {
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
  // TODO バックグランドで行う
  inputAndForm.inputElement.focus();
  const toBackgroundMessage: ContentToBackgroundMessage = {
    tabId: message.tabId,
  };
  chrome.runtime.sendMessage(toBackgroundMessage);
  // const submitButton = searchSubmitButton(inputAndForm.formElement);
  // if (submitButton == null) {
  //   const enterKeyDownEvent = new KeyboardEvent("keydown", {
  //     bubbles: true,
  //     cancelable: true,
  //     keyCode: 13,
  //   });
  //   inputAndForm.inputElement.dispatchEvent(enterKeyDownEvent);
  // } else {
  //   // submit buttonがあればsubmitイベントが発火するのでsubmit buttonを使う
  //   submitButton.click();
  // }
});
