import { useLocation } from "react-router-dom";

export const useCategoryUrlName = () => {
  const location = useLocation();

  let categoryName = location.pathname.split("/")[2];

  return categoryName;
};
