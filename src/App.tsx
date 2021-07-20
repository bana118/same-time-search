import { OptionsButton } from "./components/OptionsButton";
import { Search } from "./components/Search";

export const App = (): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div className="m-2">
        <Search />
        <OptionsButton className="block ml-auto" />
      </div>
    </div>
  );
};
