import {
  CATEGORY_JOKES_NUMBER,
  DivLoading,
  Diverror,
  Img,
  P,
  P_info,
} from "./NorrisApp";
import { urls } from "./urlConfig";
import { useCategoryUrlName } from "./GetCategoryName";
import React, { useEffect, useState } from "react";
import loadingGif from "./loading.gif";

export const CategoryJoke: React.FC = () => {
  const [categoryJokes, setCategoryJokes] = useState(new Set<string>());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentCategory = useCategoryUrlName();

  useEffect(() => {
    // reset on each request
    setCategoryJokes(new Set<string>());

    // fetch API
    const fetchData = async () => {
      const response = await fetch(urls.specificCategoryJoke + currentCategory);

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const data = await response.json();
        return data.value;
      }
    };

    const setJoke = async (length: number) => {
      const jokes = new Set<string>();

      for (let i = 0; i < length; i++) {
        try {
          setLoading(true);
          const data = await fetchData();
          jokes.add(data);
        } catch {
          setError(true);
        }
      }

      setCategoryJokes(jokes);
      setLoading(false);
    };

    setJoke(CATEGORY_JOKES_NUMBER);
  }, [currentCategory]);

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
  } else if (categoryJokes.size === 0) {
    return <Diverror>No data available</Diverror>;
  }

  return (
    <>
      <P_info>
        You chose to display 5 {currentCategory} jokes and {categoryJokes.size}{" "}
        unique {currentCategory} joke(s) rendered.
      </P_info>
      {[...categoryJokes.entries()].map(([hash, data]) => {
        return <P key={hash}>{data}</P>;
      })}
    </>
  );
};
