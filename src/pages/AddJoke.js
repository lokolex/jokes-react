import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import JokeForm from "../components/jokes/JokeForm";
import { addJoke } from "../utils/firebase-api";

const AddJoke = () => {
  const history = useHistory();
  const { sendHttpRequest, status } = useHttp(addJoke);

  useEffect(() => {
    if (status === "completed") {
      history.push(`${process.env.PUBLIC_URL}/jokes`);
    }
  }, [status, history]);

  const addJokeHandler = (jokeData) => {
    sendHttpRequest(jokeData);
  };

  return <JokeForm isLoading={status === "pending"} onAddJoke={addJokeHandler} />;
};

export default AddJoke;
