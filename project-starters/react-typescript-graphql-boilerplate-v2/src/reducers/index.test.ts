import { incrementEnthusiasm, decrementEnthusiasm } from '../actions';
import { enthusiasm } from '.';

it('increases the level of enthusiasm', () => {
  const initialState = {
    languageName: 'english',
    enthusiasmLevel: 4
  };
  const enthusiasmAction = incrementEnthusiasm();

  const storeState = enthusiasm(initialState, enthusiasmAction);

  expect(storeState.languageName).toEqual('english');
  expect(storeState.enthusiasmLevel).toEqual(5);
});

it('decreases the level of enthusiasm', () => {
  const initialState = { languageName: 'english', enthusiasmLevel: 4 };
  const enthusiasmAction = decrementEnthusiasm();

  const storeState = enthusiasm(initialState, enthusiasmAction);

  expect(storeState.languageName).toEqual('english');
  expect(storeState.enthusiasmLevel).toEqual(3);
});

it("doesn't decreaase the level of enthusiasm below 1", () => {
  const initialState = { languageName: 'english', enthusiasmLevel: 1 };
  const enthusiasmAction = decrementEnthusiasm();

  const storeState = enthusiasm(initialState, enthusiasmAction);

  expect(storeState.languageName).toEqual('english');
  expect(storeState.enthusiasmLevel).toEqual(1);
});
