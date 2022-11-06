import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import Login from "./pages/Login";
import useToken from "./utils/useToken";

function App() {
  const { setToken } = useToken();

  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <Routes>
          <Route path={"/login"} element={<Login setToken={setToken} />} />

          {publicRoutes.map((route, index) => {
            const Page = route.element;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
