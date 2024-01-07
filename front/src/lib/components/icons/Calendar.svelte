<script>
  const datetime = new Date();
  const date = datetime.getDate();
  let showDates = true;
</script>

<input
  id="date-toggle-checkbox"
  type="checkbox"
  bind:checked={showDates}
  aria-label={`${showDates ? 'Hide' : 'Show'} Dates`}
/>
<label
  for="date-toggle-checkbox"
  class="date-toggle"
  title={`${showDates ? 'Hide' : 'Show'} Dates`}
>
  <svg
    width="64px"
    height="64px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    ><g id="bgCarrier" stroke-width="0"></g><g
      id="tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#CCCCCC"
      stroke-width="2.4"
    >
      <defs>
        <style>
          .c {
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        </style>
      </defs>
      <g id="b">
        <path
          class="c"
          d="m8.0988,7.8588c-1.0601,0-1.9194.8593-1.9194,1.9194v31.8025c0,1.06.8593,1.9193,1.9193,1.9193h31.8025c1.06,0,1.9193-.8592,1.9194-1.9192h0V9.7782c0-1.0601-.8593-1.9194-1.9194-1.9194H8.0988Z"
        ></path>
        <line class="c" x1="12.8166" y1="10.258" x2="12.8166" y2="4.5"></line>
        <line class="c" x1="35.1834" y1="10.258" x2="35.1834" y2="4.5"></line>
      </g>
    </g><g id="paper">
      <defs>
        <style>
          .calback {
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        </style>
      </defs>
      <g id="b">
        <path
          class="calback"
          d="m8.0988,7.8588c-1.0601,0-1.9194.8593-1.9194,1.9194v31.8025c0,1.06.8593,1.9193,1.9193,1.9193h31.8025c1.06,0,1.9193-.8592,1.9194-1.9192h0V9.7782c0-1.0601-.8593-1.9194-1.9194-1.9194H8.0988Z"
        ></path>
        <line class="c" x1="12.8166" y1="10.258" x2="12.8166" y2="4.5"></line>
        <line class="c" x1="35.1834" y1="10.258" x2="35.1834" y2="4.5"></line>
      </g>
    </g></svg
  >
  <time {datetime}>{date}</time>
</label>
