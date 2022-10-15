import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ScrollTop from "./layouts/ScrollToTop";
import { Fragment } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";
// import UseToken from "./utils/UseToken";
// import Login from "./pages/Login";

function App() {
  // const { token, setToken } = UseToken();

  // authentication
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Router>
      <ScrollTop>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              console.log(route);

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
      </ScrollTop>
    </Router>
  );
}

export default App;
