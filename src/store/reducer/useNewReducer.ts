// An enum with all the types of actions to use in our reducer
enum CountActionKind {
    addNewToBookmart = 'ADD_NEW_TO_BOOKMARK',
    removeNewToBookmart = 'REMOVE_NEW_TO_BOOKMARK',
  }
  
  // An interface for our actions
  interface CountAction {
    type: CountActionKind;
    payload: number;
  }
  
  // An interface for our state
  interface newState {
    count: number;
  }
  
  // Our reducer function that uses a switch statement to handle our actions
  export function counterReducer(state: newState, action: CountAction) {
    const { type, payload } = action;
    switch (type) {
      case CountActionKind.addNewToBookmart:
        return {
          ...state,
          value: state.count + payload,
        };
      case CountActionKind.removeNewToBookmart:
        return {
          ...state,
          value: state.count - payload,
        };
      default:
        return state;
    }
  }