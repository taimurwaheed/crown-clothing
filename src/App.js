import React from "react";
import Home from "./routes/home/home-component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation-component";
import Authentication from "./routes/authentication/authentication-component";

const Shop = () => {
  return (
    <div>
      <h1>I am Shop Page</h1>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
