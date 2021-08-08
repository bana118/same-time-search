// import { ContentToBackgroundMessage } from "../utils/message";

console.log("hoge");

// chrome.runtime.onMessage.addListener((message: ContentToBackgroundMessage) => {
//   chrome.debugger.attach({ tabId: message.tabId }, "1.3", () => {
//     chrome.debugger.sendCommand(
//       { tabId: message.tabId },
//       "Input.dispatchKeyEvent",
//       {
//         type: "keyDown",
//         windowsVirtualKeyCode: 13,
//         nativeVirtualKeyCode: 13,
//         macCharCode: 13,
//       },
//       () => {
//         chrome.debugger.sendCommand(
//           { tabId: message.tabId },
//           "Input.dispatchKeyEvent",
//           {
//             type: "keyUp",
//             windowsVirtualKeyCode: 13,
//             nativeVirtualKeyCode: 13,
//             macCharCode: 13,
//           },
//           () => {
//             chrome.debugger.detach({ tabId: message.tabId });
//           }
//         );
//       }
//     );
//   });
// });

export {};
