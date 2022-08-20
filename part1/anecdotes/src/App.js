import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const generateRandomIndex = () => Math.floor(Math.random()*anecdotes.length);
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint32Array(anecdotes.length));

  let maxIdx = 0;
  for(let i = 1; i < points.length; i++)
    if(points[i] > points[maxIdx])
      maxIdx = i;

  const increaseVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const nextAnecdote = () => {
    setSelected(generateRandomIndex());
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={increaseVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIdx]}</p>
      <p>has {points[maxIdx]} votes</p>
    </div>
  );
};

export default App;