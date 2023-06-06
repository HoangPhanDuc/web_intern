import { Route, Routes } from "react-router-dom";
import Questions from "../components/pages/Questions";
import Home from "../components/pages/Home";

const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/questions", element: <Questions /> },
];

const App = () => {
  return (
    <Routes>
      {pageRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
