import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{Number.isNaN(value) ? 'N/A' : value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = (all !== 0) ? ((good * 1 + neutral * 0 + bad * -1) / all) : NaN;
  const pos = (all !== 0) ? ((good / all) * 100 + '%') : NaN;

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={avg} />
          <Statistic text='positive' value={pos} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ text, value, setValue }) => {
  return (
    <button onClick={() => setValue(value + 1)}>{text}</button>
  );
};

const Feedback = ({ good, neutral, bad }) => {

  return (
    <h2>give feedback</h2>

  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback />
      <Button
        text='good'
        value={good}
        setValue={setGood}
      />
      <Button
        text='neutral'
        value={neutral}
        setValue={setNeutral}
      />
      <Button
        text='bad'
        value={bad}
        setValue={setBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)