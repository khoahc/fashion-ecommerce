import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
// import Login from "./pages/Login";
import { publicRoutes } from "./routes/routes";
// import useToken from "./utils/useToken";

function App() {

  // const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Router>
        <div className="App">
        <Routes>
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
