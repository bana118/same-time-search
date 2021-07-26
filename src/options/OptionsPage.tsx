import { GroupTabs } from "../components/GroupTabs";

export const OptionsPage = (): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center m-3">
        <h1 className="mb-2 text-xl font-bold text-center">
          {chrome.i18n.getMessage("optionsTitle")}
        </h1>
        <h2 className="mb-2 text-lg font-bold text-center">
          {chrome.i18n.getMessage("optionsCaution")}
        </h2>
        <GroupTabs className="w-9/12" />
      </div>
    </div>
  );
};
