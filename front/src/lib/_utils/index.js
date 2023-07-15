export const scrollTop = (e) => {
  e?.preventDefault();
  document.getElementById("header")?.scrollIntoView();
};

export const themeStorage = (dark) => {
  const key = "dgd";
  const storedValue = localStorage.getItem(key);
  if (dark !== undefined) {
    localStorage.setItem(key, dark);
  } else {
    return storedValue && storedValue !== "null" && storedValue !== "undefined"
      ? storedValue
      : false;
  }
};
