<script>
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import { getHighContrastHexColor, getRGBFromHex } from '@utils';

  export let skills;
</script>

<h2>Skill Breakdown</h2>

<figure class="skill-graph">
  {#each skills as { name, slug, percentage, graphColor, iconColor, summary }}
    {@const RGBColor = getRGBFromHex(graphColor)}
    <div
      class="skill-graph__item"
      style={`
        background-color: ${graphColor}; background-image: linear-gradient(180deg, rgba(${RGBColor},0.33), rgba(${RGBColor},1)), url('/v/noise.svg'); width: ${percentage}%;`}
    >
      <dl class="skill-graph__item__details">
        <dt class="skill-graph__item__details__term">
          <SkillIcon {slug} {iconColor} classes="skill-icon__svg" />
          {name}
        </dt>
        {#if summary}<dd class="skill-graph__item__details__def">
            {summary}
          </dd>{/if}
        {#if percentage}<dd class="skill-graph__item__details__def">
            <span style={`color: ${getHighContrastHexColor(graphColor)};`}
              >{percentage}&#65285;</span
            >
          </dd>{/if}
      </dl>
    </div>
  {/each}
</figure>

<style lang="postcss">
  .skill-graph {
    display: flex;
    position: relative;
    margin-top: 11rem;
    box-shadow: var(--shadow-elevation-low);
    &__item {
      position: relative;
      filter: brightness(1);
      transition-duration: var(--transition-duration-fast);
      transition-property: transform, filter, box-shadow, border-color;
      transition-timing-function: var(--transition-timing-function);
      will-change: opacity, border-color, background-color;
      cursor: pointer;
      box-sizing: border-box;
      padding: 1rem 0;
      overflow: hidden;
      &::before {
        display: block;
        position: absolute;
        top: 0;
        opacity: 1;
        z-index: 0;
        mix-blend-mode: var(--skill-graph-blend);
        /* mix-blend-mode: multiply; */
        filter: contrast(10%) brightness(100%) blur(0);
        /* transition-delay: 1s; */
        transition-duration: var(--transition-duration);
        transition-property: background, filter, opacity;
        will-change: opacity, border-color, background-color, filter;
        /* box-shadow: inset 0 0 1rem 0; */
        background-image: inherit;
        background-clip: padding-box;
        padding-right: 3px;
        padding-left: 3px;
        width: 100%;
        height: 100%;
        content: '';
      }
      &:not(:hover),
      &:not(:focus),
      &:not(:focus-visible),
      &:not(:active) {
        &::before {
          transition-delay: 50ms;
          transition-duration: 500ms;
        }
      }
      &:hover,
      &:focus,
      &:focus-visible,
      &:active {
        opacity: 1;
        z-index: 1;
        box-shadow: var(--shadow-elevation-low);
        overflow: visible;
        /* filter: brightness(1.1); */
        /* transform: scale(1.01); */
        &::before {
          opacity: 0.5;
          filter: contrast(10%) brightness(100%) blur(1rem);
          transition-delay: 0s;
          /* transition-duration: var(--transition-duration-md); */
        }
        &:first-of-type {
          border-left: none;
        }
        &:last-of-type {
          border-right: none;
        }
      }
      &:first-of-type {
        &:before {
          border-left: none;
        }
        &:before,
        & {
          border-top-left-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
        }
      }
      &:last-of-type {
        &:before {
          border-right: none;
        }
        &:before,
        & {
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      }
      &__details {
        position: absolute;
        bottom: 0;
        justify-content: center;
        opacity: 0;
        z-index: 2;
        transition-duration: var(--transition-duration);
        transition-property: opacity;
        will-change: opacity;
        box-sizing: border-box;
        width: 100%;
        text-align: center;
        &__term,
        &__def,
        & dd,
        & {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        &__term {
          & .skill-icon__svg {
            padding: 2.5rem 0 0.25rem 0;
          }
        }
        &__def {
          position: relative;
          z-index: 1;
          mix-blend-mode: difference;
          line-height: 2rem;
        }
      }
      &:hover &__details {
        opacity: 1;
      }
    }
  }
</style>
