<script>
  import { codeCopyClick } from '@utils/uiHelpers';
  export let pageTitle, pageSlug, title, text, key;
  $: copied = false;
  let animations;
  let resets;

  async function handleCopying(e) {
    const button = e.target;
    button.closest('.syntax-highlighter').classList.toggle('copying', true);
  }

  async function handleCopy(e) {
    const button = e.target;
    animations = button.querySelectorAll('.icon-code-copied animate');
    resets = button.querySelectorAll('.icon-code-copied set');
    button.closest('.syntax-highlighter').classList.toggle('copying', false);

    if (e.type === 'click' || e.code === 'Enter' || e.code === 'Space') {
      codeCopyClick(pageTitle, pageSlug, title, key);
      await navigator.clipboard.writeText(text);
      button.classList.toggle('copying', true);
      setTimeout(() => {
        resets[1].beginElement();
        animations[0].beginElement();
      }, 100);
      setTimeout(() => {
        copied = true;
      }, 2000);
      setTimeout(() => {
        copied = false;
        button.classList.toggle('copying', false);
        resets.forEach((a) => a.beginElement());
      }, 2333);
    }
  }
</script>

<button
  class="code-copy-btn"
  class:copied
  on:mousedown={handleCopying}
  on:click={handleCopy}
  on:keyup={handleCopy}
  aria-label="Copy this code snippet"
>
  <svg
    class="icon-code-copy"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    ><g
      fill="none"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="4"
      ><path
        stroke-linecap="round"
        d="M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.187 35h-4.67"
      /><path
        d="M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.187V15.814A2.813 2.813 0 0 0 32.187 13Z"
      /></g
    ></svg
  >
  <svg
    class="icon-code-copied"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path
        stroke-dasharray="60"
        stroke-dashoffset="60"
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="indefinite"
          dur="0.5s"
          values="60;0"
          restart="whenNotActive"
          id="circle{key}"
        />
        <set id="reset-check" attributeName="stroke-dashoffset" to="60" />
      </path>
      <path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10">
        <animate
          fill="freeze"
          id={key}
          attributeName="stroke-dashoffset"
          begin="circle{key}.begin+0.33s"
          dur="0.2s"
          values="14;0"
          restart="whenNotActive"
        />
        <set
          id="reset-circle-{key}"
          attributeName="stroke-dashoffset"
          to="14"
        />
      </path>
    </g>
  </svg>
</button>
