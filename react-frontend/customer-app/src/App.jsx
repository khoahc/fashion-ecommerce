import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import DefaultLayout from "./layouts";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <ScrollToTop>
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

            {/* {privateRoutes.map((route, index) => {
              const Page = route.element;
              let Layout = DefaultLayout;
              const PrivateRoute = route.privateRoute;

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
                      <PrivateRoute>
                        <Page />
                      </PrivateRoute>
                    </Layout>
                  }
                />
              );
            })} */}
          </Routes>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
