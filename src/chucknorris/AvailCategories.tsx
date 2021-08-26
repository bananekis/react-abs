import { A, DivLoading, Diverror, Img, Li, Nav, Ul } from "./NorrisApp";
import { CategoryJoke } from "./CategoryJoke";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { urls } from "./urlConfig";
import { useEffect, useState } from "react";
import loadingGif from "./loading.gif";

// component

export const AvailCategories: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(urls.categoryJoke);

        if (!response.ok) {
          setError(true);
        } else {
          const data = await response.json();
          setCategories(data);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
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
  }

  return (
    <Router>
      <Nav>
        <Ul>
          {categories.map((item) => {
            return (
              <Li key={item}>
                <A to={`/chucknorris/${item}`}>{item}</A>
              </Li>
            );
          })}
        </Ul>
      </Nav>
      <Switch>
        <Route path="/chucknorris/:id">
          <CategoryJoke />
        </Route>
      </Switch>
    </Router>
  );
};
