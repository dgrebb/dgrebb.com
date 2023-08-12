export const darkTheme = 'dark-theme';
export const lightTheme = 'light-theme';

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

export const themeName = async function (preference) {
  return preference ? darkTheme : lightTheme;
}

export const scrollTop = (e) => {
  e?.preventDefault();
  document.getElementById("header")?.scrollIntoView();
};