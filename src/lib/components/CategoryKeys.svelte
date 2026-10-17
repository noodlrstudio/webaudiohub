<script lang="ts">
  import { categories } from '../categories';
  import type { Category } from '../types';

  let {
    selected,
    counts,
    total,
    onselect,
  }: {
    selected: Category | null;
    counts: Record<string, number>;
    total: number;
    onselect: (category: Category | null) => void;
  } = $props();

  const keys = $derived([
    { id: null, label: 'Everything', count: total },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: counts[c.id] ?? 0,
    })),
  ]);
</script>

<div class="keys" role="group" aria-label="Filter by category">
  {#each keys as key (key.id ?? 'all')}
    <button
      type="button"
      class="key"
      aria-pressed={selected === key.id}
      onclick={() => onselect(key.id)}
    >
      <span class="lamp" aria-hidden="true"></span>
      <span class="label">{key.label}</span>
      <span class="count">{key.count}</span>
    </button>
  {/each}
</div>

<style>
  .keys {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-panel);
    overflow: hidden;
    background: var(--seam);
  }

  @media (min-width: 560px) {
    .keys {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 1000px) {
    .keys {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
  }

  .key {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    min-height: 52px;
    padding: 10px 12px;
    border: 0;
    background: var(--panel);
    text-align: left;
    cursor: pointer;
    transition: background-color 120ms ease;
  }

  .key:hover {
    background: color-mix(in srgb, var(--panel) 92%, var(--ink));
  }

  .key:focus-visible {
    position: relative;
    z-index: 1;
    outline-offset: -2px;
  }

  .key[aria-pressed='true'] {
    background: var(--panel-sunk);
    box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.08);
  }

  .lamp {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--led-off);
  }

  .key[aria-pressed='true'] .lamp {
    background: var(--signal);
    box-shadow: 0 0 6px color-mix(in srgb, var(--signal) 60%, transparent);
  }

  .label {
    overflow: hidden;
    font-weight: 560;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .count {
    font-size: var(--step--1);
    font-variant-numeric: tabular-nums;
    color: var(--slate);
  }
</style>
