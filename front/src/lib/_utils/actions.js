/**
 * Traps the focus within the given node when enabled.
 *
 * @param {Node} node - The node within which to trap the focus.
 * @param {boolean} enabled - Whether the focus trap is enabled.
 * @returns {boolean} - Returns false if the focus trap is not enabled.
 */
export const focusTrap = (node, enabled) => {
  if (!enabled) return false;
  var focusableEls = node.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];

  node.addEventListener('keydown', function (e) {
    var isTab = e.key === 'Tab' || e.keyCode === 9;
    var isEsc = e.key === 'Escape' || e.keyCode === 27;
    if (isTab) {
      var activeElement = document.activeElement;
      var focusElement = e.shiftKey ? firstFocusableEl : lastFocusableEl;
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
  });
};
