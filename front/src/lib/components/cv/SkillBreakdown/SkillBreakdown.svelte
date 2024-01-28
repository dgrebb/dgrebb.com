<script>
  import './SkillBreakdown.css';
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import { getHighContrastHexColor, getRGBFromHex } from '@utils';

  export let skills;
</script>

<h2>Skill Breakdown</h2>

<figure class="skill-graph">
  {#each skills as { name, slug, percentage, graphColor, iconColor, summary }}
    {@const RGBColor = getRGBFromHex(graphColor)}
    <div
      class="skill-graph__item {slug}"
      style={`--width: ${percentage};
        background-color: ${graphColor}; background-image: linear-gradient(180deg, rgba(${RGBColor},0.33), rgba(${RGBColor},1)), url('/v/noise.svg');`}
    >
      <dl class="skill-graph__item__details">
        <dt class="skill-graph__item__details__term">
          <SkillIcon
            {slug}
            {iconColor}
            classes="skill-graph__item__details__icon"
          />
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
