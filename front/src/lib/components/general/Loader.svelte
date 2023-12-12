<script>
  import { onMount } from 'svelte';

  /** @type {Function} */
  let loader;

  /** @type {Object} */
  let Component;

  onMount(async () => {
    // await new Promise((f) => setTimeout(f, 1000)); // simulate delay
    /** @type {Object} */
    Component = (await loader()).default;
  });

  /** @type {Function} */
  export { loader as this, Component };
</script>

/** * Svelte component that dynamically loads another component on mount. *
@module DynamicComponent * @param {Function} loader - Asynchronous function that
loads the component. * @param {Object} $$restProps - Additional props passed to the
parent component. */

<svelte:component this={Component} {...$$restProps}>
  <slot />
</svelte:component>

{#if !Component}
  <slot name="fallback" />
{/if}
