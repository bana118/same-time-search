const isInputElement = (element: Element): element is HTMLInputElement => {
  return element.tagName.toLowerCase() === "input";
};

type InputAndForm = {
  inputElement: HTMLInputElement;
  formElement: HTMLFormElement;
};

const searchFormByInput = (
  inputElement: HTMLInputElement
): InputAndForm | null => {
  let formElement: HTMLFormElement | null = null;
  let element: HTMLElement = inputElement;
  while (element.parentElement != null) {
    if (element.parentElement.tagName.toLowerCase() === "form") {
      formElement = element.parentElement as HTMLFormElement;
      break;
    }
    element = element.parentElement;
  }
  if (formElement == null) return null;
  return { inputElement, formElement };
};

export const searchInputAndForm = (
  stringInputElement: string
): InputAndForm | null => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = stringInputElement;
  const htmlInputElement = tempElement.firstElementChild;
  if (htmlInputElement != null && !isInputElement(htmlInputElement)) {
    // idから検索
    const id = htmlInputElement.id;
    const elementById = document.getElementById(id);
    if (elementById != null && isInputElement(elementById)) {
      const formAndInput = searchFormByInput(elementById);
      if (formAndInput != null) return formAndInput;
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
      if (formAndInput != null) return formAndInput;
    }
  }

  // すべてのinput elementから検索
  const inputElements = Array.from(document.getElementsByTagName("input"));
  for (const inputElement of inputElements) {
    const formAndInput = searchFormByInput(inputElement);
    if (formAndInput != null) return formAndInput;
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
