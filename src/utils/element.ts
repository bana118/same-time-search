export const isInputElement = (
  element: Element
): element is HTMLInputElement => {
  return element.tagName.toLowerCase() === "input";
};

type InputAndForm = {
  inputElement: HTMLInputElement;
  formElement: HTMLFormElement | null;
};

const searchFormByInput = (inputElement: HTMLInputElement): InputAndForm => {
  let formElement: HTMLFormElement | null = null;
  let element: HTMLElement = inputElement;
  while (element.parentElement != null) {
    if (element.parentElement.tagName.toLowerCase() === "form") {
      formElement = element.parentElement as HTMLFormElement;
      break;
    }
    element = element.parentElement;
  }
  return { inputElement, formElement };
};

export const stringToElement = (stringElement: string): Element | null => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = stringElement;
  return tempElement.firstElementChild;
};

export const searchInputAndForm = (
  stringInputElement: string
): InputAndForm | null => {
  const htmlInputElement = stringToElement(stringInputElement);
  if (htmlInputElement != null && !isInputElement(htmlInputElement)) {
    // idから検索
    const id = htmlInputElement.id;
    const elementById = document.getElementById(id);
    if (elementById != null && isInputElement(elementById)) {
      const formAndInput = searchFormByInput(elementById);
      return formAndInput;
    }

    // classNameから検索
    const className = htmlInputElement.className;
    const elementsByClassName = Array.from(
      document.getElementsByClassName(className)
    );
    const inputElementsByClassName = elementsByClassName.filter(
      (element): element is HTMLInputElement => isInputElement(element)
    );
    for (const inputElementByClassName of inputElementsByClassName) {
      const formAndInput = searchFormByInput(inputElementByClassName);
      return formAndInput;
    }
  }

  // すべてのinput elementから検索
  const inputElements = Array.from(document.getElementsByTagName("input"));
  for (const inputElement of inputElements) {
    const formAndInput = searchFormByInput(inputElement);
    return formAndInput;
  }

  return null;
};

export const searchSubmitButton = (
  formElement: HTMLFormElement
): HTMLElement | null => {
  const submitButton = formElement.querySelector("[type=submit]");
  if (submitButton == null) return null;
  return submitButton as HTMLElement;
};
