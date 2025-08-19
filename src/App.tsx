import AppRoutes from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
      <RouterProvider router={AppRoutes} />
  );
}

export default App;
