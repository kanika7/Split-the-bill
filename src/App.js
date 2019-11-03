import React from "react";
import UsersList from "./containers/UsersList";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="page">
      <Header />
      <UsersList />
    </div>
  );
};

export default App;
