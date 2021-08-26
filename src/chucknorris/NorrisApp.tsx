import { AvailCategories } from "./AvailCategories";
import { Link } from "react-router-dom";
import { hashCode } from "./hashCode";
import { theme } from "./theme";
import { urls } from "./urlConfig";
import { useEffect, useState } from "react";
import loadingGif from "./loading.gif";
import styled from "styled-components";

// styles

export const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const Diverror = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.red};
  font-size: 33px;
  height: 40vh;
`;

export const DivLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 33px;
  height: 40vh;
`;

export const P = styled.p`
  color: ${theme.white};
  font-size: 22px;
  border: 2px solid yellow;
  padding: 10px;
`;

export const P_info = styled.p`
  color: ${theme.yellow};
  font-size: 22px;
  font-weight: 500;
`;

export const Img = styled.img`
  /* mix-blend-mode: multiply; */
`;

export const Nav = styled.nav`
  background-color: ${theme.yellow};
  font-size: 20px;
  margin: 0 auto;
  width: 100%;
`;

export const Li = styled.li`
  list-style: none;
  display: flex;
  padding: 8px;
`;

export const A = styled(Link)`
  color: ${theme.black};
`;

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  ${Li}:not(:last-child) {
    margin-right: 1em;
  }
`;

// constants

const RANDOM_JOKES_NUMBER = 20;
export const CATEGORY_JOKES_NUMBER = 5;

// main app

export const NorrisApp: React.FC = () => {
  // states
  const [allJokes, setAllJokes] = useState(new Map<number, string>());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(urls.randomJoke);
      if (!response.ok) {
        return setError(true);
      } else {
        const data = await response.json();
        return data.value;
      }
    };

    const setValidJokes = async (length: number) => {
      const jokes = new Map<number, string>();

      for (let index = 0; index < length; index++) {
        do {
          let currentJokeCall = "";

          try {
            setLoading(true);
            currentJokeCall = await fetchData();

            // set hash
            const hash = hashCode(currentJokeCall);

            // check whether jokes does NOT contain duplicite joke,
            // if not set it up, else loop thru
            if (!jokes.has(hash)) {
              jokes.set(hash, currentJokeCall);
              break;
            }
          } catch {
            setError(true);
          }
        } while (true);
      }

      // set all jokes to state all at once
      setAllJokes(jokes);
      setLoading(false);
    };

    setValidJokes(RANDOM_JOKES_NUMBER);
  }, []);

  // if there is error display error message
  // else if theres no joke loaded, keep loading...

  if (error === true) {
    return <Diverror>The page could not be loaded.</Diverror>;
  } else if (loading === true) {
    return (
      <DivLoading>
        <Img src={loadingGif} alt="loading" />
      </DivLoading>
    );
  } else if (allJokes.size === 0) {
    return <Diverror>No data available</Diverror>;
  }

  // default render state

  return (
    <Divwrapper>
      <P_info>20 random jokes</P_info>
      {[...allJokes.entries()].map(([hash, data]) => {
        return <P key={hash}>{data}</P>;
      })}
      <P_info>Choose 1 category to display 5 jokes below</P_info>
      <AvailCategories />
    </Divwrapper>
  );
};
