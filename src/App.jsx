import { useReducer } from 'react'
import './App.css'

// reducer
const reducer = (state, action) => {
  // can destructure state and action
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'newUserInput':
      return { ...state, userInput: action.payload }
    case 'toggleColor':
      return { ...state, color: !state.color }
    default:
      throw new Error()
  }
}

// actions object
const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  NEW_USER_INPUT: 'newUserInput',
  TOGGLE_COLOR: 'toggleColor',
}

function App() {
  const initialState = {
    count: 0,
    userInput: '',
    color: false,
  }

  // state object, function to dispatch/send an action to alter state
  // destructuring count, userInput and color from 'state' var
  const [{ count, userInput, color }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const handleClick = ({ target: { name } }) => {
    if (name === 'increment') dispatch({ type: ACTION.INCREMENT })
    else dispatch({ type: ACTION.DECREMENT })
  }

  return (
    <main style={{ color: color ? '#FFF' : '#FFF952' }}>
      {userInput && <h1>{userInput}</h1>}
      <input
        type='text'
        value={userInput}
        onChange={
          (
            { target: { value } } // destructuring 'e' event object
          ) => dispatch({ type: 'newUserInput', payload: value }) // payload is the e.target.value
        }
      />
      <br />
      <h1>
        <strong>{count}</strong>
      </h1>
      <span>
        <button onClick={handleClick} name='increment'>
          +
        </button>
        <button onClick={handleClick} name='decrement'>
          -
        </button>
        <div>
          <button onClick={() => dispatch({ type: ACTION.TOGGLE_COLOR })}>
            Toggle Color
          </button>
        </div>
      </span>
    </main>
  )
}

export default App
