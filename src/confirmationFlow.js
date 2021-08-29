import {
  createMachine,
  state,
  transition,
  invoke,
  reduce,
} from 'robot3';

const deleteAction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Job done');
      resolve();
    }, 1000);
  });
};

const confirmationFlow = createMachine({
  initial: state(transition('begin', 'confirming', reduce((contex, event) => ({
		...contex,
		onCommit: event.onCommit,
	})))),
  confirming: state(
    transition('confirm', 'loading'),
    transition('cancel', 'initial')
  ),
  loading: invoke(
    (context, event) => context.onCommit(context, event),
    transition('done', 'initial'),
    transition(
      'error',
      'confirming',
      reduce((contex, event) => ({
        ...contex,
        error: event.error,
      }))
    )
  ),
});

export default confirmationFlow;
