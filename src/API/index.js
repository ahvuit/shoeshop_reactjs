export const getAllProductss = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};
