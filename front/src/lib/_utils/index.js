export const darkTheme = 'dark-theme';
export const lightTheme = 'light-theme';

export const themeStorage = (dark) => {
  const key = 'dgd';
  const storedValue = localStorage.getItem(key);
  if (dark !== undefined) {
    localStorage.setItem(key, dark);
  } else {
    return storedValue && storedValue !== 'null' && storedValue !== 'undefined'
      ? storedValue
      : false;
  }
};

export const themeName = async function (preference) {
  return preference ? darkTheme : lightTheme;
};

export const scrollTop = (e) => {
  e?.preventDefault();
  document.getElementById('header')?.scrollIntoView();
};

export const isElementOutsideViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

/**
 * Determine if a browser/system setting prefers reduced motion
 * @returns boolean
 */
export const motionless = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
