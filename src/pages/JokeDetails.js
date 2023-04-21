import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedJoke from "../components/jokes/HighlightedJoke";
import Loader from "../components/UI/Loader";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";

const JokeDetails = () => {
  const { jokeId } = useParams();
  const routMatch = useRouteMatch();

  const { sendHttpRequest, status, data: loadedJoke, error } = useHttp(getJoke, true);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedJoke.text) {
    return <h1 className="centered">Joke not found!</h1>;
  }

  return (
    <>
      <HighlightedJoke text={loadedJoke.text} topic={loadedJoke.topic} />
      <Route path={`${routMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--empty" to={`${routMatch.url}/comments`}>
            Показать комментарии
          </Link>
        </div>
      </Route>
      {/* <Route path={`${process.env.PUBLIC_URL}/${routMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--empty" to={`${process.env.PUBLIC_URL}/${routMatch.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route> */}
      <Route path={`${routMatch.path}/comments`}>
        <Comments />
      </Route>
      {/* <Route path={`${process.env.PUBLIC_URL}/${routMatch.path}/comments`}>
        <Comments />
      </Route> */}
    </>
  );
};

export default JokeDetails;
