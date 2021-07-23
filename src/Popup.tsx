import { OptionsButton } from "./components/OptionsButton";
import { Search } from "./components/Search";

export const Popup = (): JSX.Element => {
  return (
    <div className="container mx-auto w-80">
      <div className="m-2">
        <Search />
        <OptionsButton className="block ml-auto" />
      </div>
    </div>
  );
};
