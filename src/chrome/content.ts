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
  // loosedrawing.comなどではinputイベントを発火させる必要がある
  inputAndForm.inputElement.dispatchEvent(
    new Event("input", { bubbles: true })
  );
  // TODO バックグランドで行う
  chrome.debugger.attach({ tabId: message.tabId }, "1.3", () => {
    inputAndForm.inputElement.focus();
    chrome.debugger.sendCommand(
      { tabId: message.tabId },
      "Input.dispatchKeyEvent",
      {
        type: "keyDown",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
        macCharCode: 13,
      },
      () => {
        chrome.debugger.sendCommand(
          { tabId: message.tabId },
          "Input.dispatchKeyEvent",
          {
            type: "keyUp",
            windowsVirtualKeyCode: 13,
            nativeVirtualKeyCode: 13,
            macCharCode: 13,
          },
          () => {
            chrome.debugger.detach({ tabId: message.tabId });
          }
        );
      }
    );
  });

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

export {};
