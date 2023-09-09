import { useContext } from "react";
import AuthContext from "@js/context/AuthContext";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {authCtx.currentUser?.displayName}</p>
    </div>
  );
};

export default Home;
