import { Line } from "./Line";

export const Playground = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => {
        return <Line min={index * 10} key={Math.random()} />;
      })}
    </>
  );
};
