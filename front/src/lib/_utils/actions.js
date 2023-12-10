/**
 * Traps the focus within the given node when enabled.
 *
 * @param {Node} node - The node within which to trap the focus.
 * @param {boolean} enabled - Whether the focus trap is enabled.
 * @returns {boolean} - Returns false if the focus trap is not enabled.
 */
export const focusTrap = (node, enabled) => {
  if (!enabled) return false;

  /**
   * Event listener for handling keydown events within the focus trap.
   *
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  const keydownHandler = (e) => {
    const isTab = e.key === 'Tab' || e.keyCode === 9;
    const isEsc = e.key === 'Escape' || e.keyCode === 27;

    if (isTab) {
      const activeElement = document.activeElement;
      const focusElement = e.shiftKey ? firstFocusableEl : lastFocusableEl;

      if (activeElement === focusElement) {
        e.preventDefault();
        (e.shiftKey ? lastFocusableEl : firstFocusableEl).focus();
      }
    } else if (isEsc) {
      const miniNavToggle = document.getElementById('page-navigation-checkbox');
      miniNavToggle.checked = false;
      miniNavToggle.focus();
    } else {
      return;
    }
  };

  // Cache the result of querySelectorAll
  const focusableEls = node.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  // Add event listener for keydown events
  node.addEventListener('keydown', keydownHandler);
};
