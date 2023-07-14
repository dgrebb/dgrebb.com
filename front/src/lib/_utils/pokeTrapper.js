export const pokeTrapper = {
  tocClick: (heading) => plausible("TOC Click", { props: { heading } }),
  categoryClick: (page, category) =>
    plausible("Category Click", { props: { page, category } }),
  relatedClick: (page, title) =>
    plausible("Related Post Click", { props: { page, title } }),
};
