import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>
        {props.course}
    </h1>
);

const Part = (props) => (
    <p>Part: {props.name}, Exercise: {props.number}</p>
);

const Content = (props) => (
    <>
        {
            props.content.map(c => (
                <Part name={c.part} number={c.exercise}/>
            ))
        }
    </>
);

const Total = (props) => (
    <p>Number of exercises {props.content.length}</p>
);

const App = () => {
    const course = 'Half Stack application development';

    const content = [
        {
            part: 'Fundamentals of React',
            exercise: 10
        },
        {
            part: 'Using props to pass data',
            exercise: 7
        },
        {
            part: 'State of a component',
            exercise: 14
        }
    ];

    return (
        <div>
            <Header course={course}/>
            <Content content={content}/>
            <Total content={content}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'))