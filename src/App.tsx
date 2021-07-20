import { Search } from "./components/Search";

export const App = (): JSX.Element => {
  return (
    <div className="container mx-auto">
      <Search />
      <button
        onClick={() => {
          chrome.runtime.openOptionsPage();
        }}
      >
        設定画面
      </button>
    </div>
  );
};
