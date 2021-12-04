import { AvailCategories } from "./AvailCategories";
import { Link, useHistory } from "react-router-dom";
import { hashCode } from "./hashCode";
import { theme } from "./theme";
import { urls } from "./urlConfig";
import { useEffect, useState } from "react";
import chuckNorris from "./chuck-norris.png";
import loadingGif from "./loading.gif";
import styled from "styled-components";

// styles

export const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1940px;
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 420px) {
    margin: 10em auto 2em auto;
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
  height: 20vh;
  width: 100%;
  margin: 4em auto 0 auto;
`;

export const P = styled.p`
  color: ${theme.white};
  font-size: 22px;
  border: 2px solid yellow;
  padding: 10px;
`;

export const P_info = styled.p`
  color: ${theme.white};
  font-size: 22px;
  font-weight: 500;
  background-color: ${theme.darkRed};
  padding: 15px;
  border-radius: 5px;
`;

export const Img = styled.img`
  width: 8%;
  mix-blend-mode: darken;
  cursor: pointer;

  @media (max-width: 420px) {
    width: 31%;
  }
`;

export const Nav = styled.nav`
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
  color: ${theme.white};
  text-decoration: none;
  background: #7c0707;
  padding: 10px;
  border-radius: 5px;
`;

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 420px) {
    justify-content: flex-start;
  }
`;

const DivTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
`;

export const DivCard = styled.div`
  width: 20%;
  padding: 20px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: bold;
  color: ${theme.brown};
  justify-content: center;
  margin: 0.5em;

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 420px) {
    width: 90%;
  }
`;

export const DivCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  const [isShowAll, setIsShowAll] = useState(true);

  const history = useHistory();

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
      <DivTitle>
        <Img
          src={chuckNorris}
          alt="norris"
          onClick={() => {
            setIsShowAll(true);
            history.push("/chucknorris");
          }}
        />
        <P_info>I generated 20 random jokes for you </P_info>
      </DivTitle>
      <AvailCategories isShowAll={isShowAll} setIsShowAll={setIsShowAll} />
      {isShowAll && (
        <DivCardWrapper>
          {[...allJokes.entries()].map(([hash, data]) => {
            return <DivCard key={hash}>{data}</DivCard>;
          })}
        </DivCardWrapper>
      )}
    </Divwrapper>
  );
};
