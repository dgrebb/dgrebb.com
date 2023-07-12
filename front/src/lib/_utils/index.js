export const scrollTop = (e) => {
  e?.preventDefault();
  document?.getElementById("header").scrollIntoView();
};
