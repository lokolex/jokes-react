import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddJoke from "./pages/AddJoke";
import JokeDetails from "./pages/JokeDetails";
import Jokes from "./pages/Jokes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`} exact>
          <Redirect to={`${process.env.PUBLIC_URL}/jokes`} />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/jokes`} exact>
          <Jokes />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/jokes/:jokeId`}>
          <JokeDetails />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/add-joke`}>
          <AddJoke />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
