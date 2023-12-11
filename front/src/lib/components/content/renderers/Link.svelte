<script>
  import { onMount } from 'svelte';

  /**
   * Svelte component representing a conditional hyperlink.
   *
   * @namespace
   * @typedef {object} Hyperlink
   * @property {string} href - The URL of the hyperlink.
   * @property {string} text - The text content of the hyperlink.
   * @property {string} [title] - The title attribute of the hyperlink.
   */
  export let href = '';
  export let text = '';
  export let title = undefined;

  /**
   * Regular expression pattern for matching certain characters in the `href` string.
   *
   * @type {RegExp}
   */
  const internalPattern = /[/#mt]/g;

  /**
   * Flag indicating whether the hyperlink is external.
   *
   * @type {boolean}
   */
  let external;

  /**
   * Svelte lifecycle hook that runs after the component mounts.
   *
   * @function
   * @name onMount
   * @param {function} callback - The callback function to be executed on mount.
   */
  onMount(() => {
    /**
     * Determines if the hyperlink is external or internal based on the `href` property.
     *
     * @type {boolean}
     */
    external =
      !href.charAt(0).match(internalPattern) &&
      new URL(href).origin !== location.origin;
  });
</script>

<!--
  @component
  ## Link.svelte

- Svelte hyperlink element.

@element a
@param {Hyperlink} props - The properties of the hyperlink.
@param {string} props.href - The URL of the hyperlink.
@param {string} [props.title] - The title attribute of the hyperlink.
@param {string} props.text - The text content of the hyperlink.
-->
<a
  {href}
  title={title ? title : undefined}
  target={external ? '_blank' : undefined}
  rel={external ? 'nofollow noopener noreferrer' : undefined}
>
  {text}
</a>
