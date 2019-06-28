import React from 'react';

const Header = ({ name }) => (
  <h1>
      {name}
  </h1>
);

const Part = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const Content = ({parts}) => (
  <>
      {
          parts.map(c => (
              <Part key={c.id} name={c.name} number={c.exercises}/>
          ))
      }
  </>
);

const Total = ({ totalExercises}) => (
  <p>
    <strong>Number of exercises {totalExercises}</strong>
  </p>
);

const Course = ({ course }) => {
  const sumAllExercises = (accumulator, currentValue) => accumulator + currentValue.exercises;
  const totalExercises = course.parts.reduce(sumAllExercises, 0);

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={totalExercises} />
    </>
  )
};

export default Course;