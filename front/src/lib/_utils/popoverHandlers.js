import { popover } from '@store';
import { popoverImage } from '@utils/uiHelpers';

export function popImage(e, page) {
  e.preventDefault();
  const node = e.target;
  const image = node.href || node.src || false;
  const { title = false } = node;

  popover.update(function (popover) {
    return (popover = {
      ...popover,
      show: true,
      title,
      content: image
        ? `<img src=${image} />`
        : `<h2>Oops...</h2><p>We lost that image somewhere along the way. Sorry!</p>`,
    });
  });

  popoverImage(title, image, page);
}
