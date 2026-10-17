<script lang="ts">
  import type { SiteStatus } from '../types';

  let { status }: { status: SiteStatus | undefined } = $props();

  const label = $derived(
    status === 'up'
      ? 'Reachable'
      : status === 'down'
        ? 'Not reachable right now'
        : 'Checking',
  );
</script>

<span class="led" data-status={status ?? 'checking'} title={label}>
  <span class="visually-hidden">{label}</span>
</span>

<style>
  .led {
    display: inline-block;
    flex: none;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--led-off);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.25);
    transition: background-color 400ms ease;
  }

  .led[data-status='up'] {
    background: var(--signal);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--signal) 18%, transparent),
      0 0 6px color-mix(in srgb, var(--signal) 55%, transparent);
  }

  .led[data-status='down'] {
    background: transparent;
    box-shadow: inset 0 0 0 1.5px var(--led-down);
  }
</style>
