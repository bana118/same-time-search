import { OptionsForm } from "../components/OptionsForm";

export const OptionsPage = (): JSX.Element => {
  // TODO 複数のURLのオプションを設定
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center m-3">
        <h1 className="mb-2 text-xl text-center">Same Time Search</h1>
        <OptionsForm className="w-9/12" />
      </div>
    </div>
  );
};
