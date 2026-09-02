const dictionary = () => import("../dictionaries/en.json").then((module) => module.default);

export const getDictionary = async () => {
  return dictionary();
};
