import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {!!user && <h1>Welcome {user.name}</h1>}
      <h2>Thank You for Registering</h2>
    </div>
  );
}

export default Home;
