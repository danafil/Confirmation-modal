import confirmationFlow from './confirmationFlow';
import { useMachine } from 'react-robot';
import Modal from 'react-modal';
import './App.css';

async function doSomethingCustom() {
  // pretend to delete something
  return new Promise((resolve, reject) => {
    console.log('Beginning custom action...');
    setTimeout(() => {
      console.log('Done custom action');
      reject();
    }, 1000);
  });
}

function App() {
  const [current, send] = useMachine(confirmationFlow);
  return (
    <div className="App">
      <header>Current test</header>
      <h1>{current.name}</h1>
      <button
        onClick={() =>
          send({
            type: 'begin',
            onCommit: (context) => doSomethingCustom(),
          })
        }
      >
        Delete me
      </button>
      <Modal
        onRequestClose={() => send('cancel')}
        isOpen={current.name === 'confirming' || current.name === 'loading'}
      >
        Are you sure?!
        {current.context.error && <div>{current.context.error}</div>}
        <button onClick={() => send('cancel')}>Cancel</button>
        <button onClick={() => send('confirm')}>Yes Definitely</button>
      </Modal>
    </div>
  );
}

export default App;
