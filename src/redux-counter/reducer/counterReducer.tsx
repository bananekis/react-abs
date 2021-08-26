import { typeAction } from "../actionConfig";

export type CounterType = {
  count: number;
  error: string | null;
};

const initialState: CounterType = {
  count: 10,
  error: null,
};

export const counterReducer = (
  state: CounterType = initialState,
  action: any
): CounterType => {
  switch (action.type) {
    case typeAction.increment:
      return { ...state, count: state.count + action.payload };
    case typeAction.decrement:
      return { ...state, count: state.count - action.payload };
    case typeAction.divide:
      return action.payload === 0
        ? { ...state, error: "you can't divide by zero." }
        : { ...state, count: state.count / action.payload };
    case typeAction.power:
      return {
        ...state,
        count: Math.pow(state.count, action.payload),
      };
    case typeAction.square:
      return {
        ...state,
        count: Math.sqrt(Math.abs(state.count)),
      };
    default:
      return state;
  }
};
