import { typeAction } from "../actionConfig";

export const increment = (identifier: number) => ({
  type: typeAction.increment,
  payload: identifier,
});

export const decrement = (identifier: number) => ({
  type: typeAction.decrement,
  payload: identifier,
});

export const diversify = (identifier: number) => ({
  type: typeAction.divide,
  payload: identifier,
});

export const power = (identifier: number) => ({
  type: typeAction.power,
  payload: identifier,
});

export const square = (identifier: number) => ({
  type: typeAction.square,
  payload: identifier,
});
