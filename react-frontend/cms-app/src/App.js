import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="users"></Route>
            <Route path="customers"></Route>
            <Route path="categories"></Route>
            <Route path="products"></Route>
            <Route path="orders"></Route>
            <Route path="vouchers"></Route>
            <Route path="deliveries"></Route>
            <Route path="statistics"></Route>
            <Route path="settings"></Route>
            <Route path="account"></Route>
            <Route path="logout"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
