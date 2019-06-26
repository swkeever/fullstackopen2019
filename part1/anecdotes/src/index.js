import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const VoteButton = ({points, setPoints, selected}) => {
    const handleClick = () => {
        const copy = [...points];
        copy[selected]++;
        setPoints(copy);
    };

    return (
        <button onClick={handleClick}>vote</button>
    );
};

const NextAnecdoteButton = ({selected, setSelected, n}) => {
    const handleClick = () => {
        let next = selected;

        // so we don't select the same anecdote
        while (next === selected) {
            next = Math.floor(Math.random() * n);
        }

        setSelected(next);
    };

    return (
        <button onClick={handleClick}>next anecdote</button>
    );
};

const Anecdote = ({anecdote}) => <p>{anecdote}</p>;

const Votes = ({points}) => <p>has {points} votes</p>;

const TopAnecdoteDisplay = ({anecdotes, points}) => {
    let maxIndex = points.indexOf(Math.max(...points));

    return (
        <>
            <h2>Anecdote with most votes</h2>
            <Anecdote anecdote={anecdotes[maxIndex]}/>
            <Votes points={points[maxIndex]}/>
        </>
    );
}

const App = (props) => {
    const numAnecdotes = props.anecdotes.length;
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(numAnecdotes).fill(0));

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <Anecdote
                anecdote={props.anecdotes[selected]}
            />
            <Votes
                points={points[selected]}
            />
            <VoteButton
                points={points}
                setPoints={setPoints}
                selected={selected}
            />
            <NextAnecdoteButton
                selected={selected}
                setSelected={setSelected}
                n={numAnecdotes}
            />
            <TopAnecdoteDisplay
                points={points}
                anecdotes={anecdotes}
            />
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);