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

/**
 * A Svelte action to dispatch a custom event when a click occurs outside of the specified node.
 *
 * @param {HTMLElement} node - The HTML element to monitor for outside clicks.
 * @returns An object with a `destroy` method to clean up the event listener.
 */
export function clickOutside(node) {
  /**
   * Handles click events and dispatches a custom event if the click is outside the node.
   *
   * @param {Event} event - The click event object.
   */
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    /**
     * Cleans up the event listener when the action is destroyed.
     */
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
