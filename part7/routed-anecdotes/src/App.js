import React, { useState } from "react";
import About from "./routes/About";
import AnecdoteList from "./routes/AnecdoteList";
import CreateNew from "./routes/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Anecdote from "./routes/Anecdote";
import Notification from "./components/Notification";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);

  const [notification, setNotification] = useState("");

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/create" render={() => <CreateNew addNew={addNew} />} />
        <Route path="/about" render={() => <About />} />
        <Route
          exact
          path="/anecdotes/:id"
          render={({ match }) => {
            return <Anecdote anecdote={anecdoteById(match.params.id)} />;
          }}
        />

      </Router>
      <Footer />
    </div>
  );
};

export default App;
