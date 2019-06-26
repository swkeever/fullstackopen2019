import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>
        {props.name}
    </h1>
);

const Part = (props) => (
    <div>
        <h2>
            {props.name}
        </h2>
        <em>Exercise {props.number}</em>
    </div>

);

const Content = (props) => (
    <>
        {
            props.parts.map(c => (
                <Part name={c.name} number={c.exercise}/>
            ))
        }
    </>
);

const Total = (props) => (
    <p>Number of exercises {props.parts.length}</p>
);

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercise: 10
            },
            {
                name: 'Using props to pass data',
                exercise: 7
            },
            {
                name: 'State of a component',
                exercise: 14
            }
        ]
    };

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'))