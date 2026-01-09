import { Toaster } from "react-hot-toast";
import Providers from "./Provider";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <Providers>
      <AppRouter />
      <Toaster position="top-right" />
    </Providers>
  );
};

export default App;
