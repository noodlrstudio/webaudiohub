<script lang="ts">
  import { onMount } from 'svelte';
  import { categories } from './lib/categories';
  import CategoryKeys from './lib/components/CategoryKeys.svelte';
  import Faceplate from './lib/components/Faceplate.svelte';
  import SiteFooter from './lib/components/SiteFooter.svelte';
  import SiteRow from './lib/components/SiteRow.svelte';
  import SiteTile from './lib/components/SiteTile.svelte';
  import SubmitDialog from './lib/components/SubmitDialog.svelte';
  import Toolbar from './lib/components/Toolbar.svelte';
  import { sites } from './lib/data';
  import type {
    Category,
    Site,
    SiteStatus,
    SortMode,
    ViewMode,
  } from './lib/types';
  import { checkSites, loadPreviews, pickRandom, shuffle } from './lib/utils';

  const isCategory = (value: string | null): value is Category =>
    categories.some((c) => c.id === value);

  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category');

  let query = $state(params.get('q') ?? '');
  let category = $state<Category | null>(
    isCategory(initialCategory) ? initialCategory : null,
  );
  let sort = $state<SortMode>('shuffle');
  let view = $state<ViewMode>('grid');
  let audiframeOnly = $state(false);
  let hideUnreachable = $state(false);
  let submitOpen = $state(false);
  let statuses = $state<Record<string, SiteStatus>>({});
  let previews = $state<Record<string, string>>({});

  const shuffled = shuffle(sites);

  const counts = $derived(
    sites.reduce<Record<string, number>>((acc, site) => {
      acc[site.category] = (acc[site.category] ?? 0) + 1;
      return acc;
    }, {}),
  );

  function matches(site: Site, needle: string): boolean {
    if (!needle) return true;
    return [site.name, site.description, site.url, ...site.tags].some((v) =>
      v.toLowerCase().includes(needle),
    );
  }

  const visible = $derived.by(() => {
    const needle = query.trim().toLowerCase();
    const list = shuffled.filter(
      (site) =>
        (!category || site.category === category) &&
        (!audiframeOnly || Boolean(site.audiframe)) &&
        (!hideUnreachable || statuses[site.id] !== 'down') &&
        matches(site, needle),
    );
    return sort === 'alphabetical'
      ? [...list].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
        )
      : list;
  });

  let next = $state<Site | undefined>(pickRandom(sites));

  function roll() {
    const pool = visible.length > 0 ? visible : sites;
    const others = pool.length > 1 ? pool.filter((s) => s !== next) : pool;
    next = pickRandom(others);
  }

  $effect(() => {
    // Keep the random pick inside the current filter.
    if (visible.length > 0 && next && !visible.includes(next)) roll();
  });

  $effect(() => {
    const url = new URL(location.href);
    const q = query.trim();
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    if (category) url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    history.replaceState(null, '', url);
  });

  function clearFilters() {
    query = '';
    category = null;
    audiframeOnly = false;
    hideUnreachable = false;
  }

  onMount(() => {
    checkSites(sites, (id, status) => (statuses[id] = status));
    loadPreviews().then((found) => (previews = found));
  });
</script>

<a class="skip" href="#apps">Skip to the apps</a>

<Faceplate {next} count={visible.length || sites.length} onroll={roll} />

<main id="apps" class="wrap">
  <div class="controls">
    <CategoryKeys
      selected={category}
      {counts}
      total={sites.length}
      onselect={(c) => (category = c)}
    />
    <Toolbar
      bind:query
      bind:sort
      bind:view
      bind:audiframeOnly
      bind:hideUnreachable
      onsubmit={() => (submitOpen = true)}
    />
  </div>

  <h2 class="tally" aria-live="polite">
    {visible.length === sites.length
      ? `${sites.length} apps`
      : `${visible.length} of ${sites.length} apps`}
  </h2>

  {#if visible.length === 0}
    <div class="empty">
      <p>No apps match these filters.</p>
      <button type="button" onclick={clearFilters}>Clear filters</button>
    </div>
  {:else if view === 'grid'}
    <div class="grid">
      {#each visible as site (site.id)}
        <SiteTile
          {site}
          status={statuses[site.id]}
          preview={previews[site.id]}
          ontag={(tag) => {
            query = tag;
            category = null;
          }}
        />
      {/each}
    </div>
  {:else}
    <ul class="list">
      {#each visible as site (site.id)}
        <SiteRow {site} status={statuses[site.id]} />
      {/each}
    </ul>
  {/if}
</main>

<SiteFooter />
<SubmitDialog bind:open={submitOpen} />

<style>
  .skip {
    position: absolute;
    left: 12px;
    top: -60px;
    z-index: 10;
    padding: 8px 12px;
    border-radius: var(--radius-key);
    background: var(--ink);
    color: var(--base);
  }

  .skip:focus {
    top: 12px;
  }

  .controls {
    display: grid;
    gap: 16px;
    padding-top: 28px;
  }

  .tally {
    margin: 28px 0 12px;
    font-size: var(--step-0);
    font-weight: 560;
    font-variant-numeric: tabular-nums;
    color: var(--slate);
  }

  .grid,
  .list {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    border: 1px solid var(--seam);
    border-radius: var(--radius-panel);
    overflow: hidden;
    background: var(--seam);
    list-style: none;
  }

  /* Tiles draw their own seams, so an unfilled last row shows the base. */
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    padding: 1px;
    border: 0;
    border-radius: 0;
    overflow: visible;
    background: transparent;
  }

  .empty {
    display: grid;
    justify-items: start;
    gap: 12px;
    padding: 32px 24px;
    border: 1px dashed var(--seam);
    border-radius: var(--radius-panel);
  }

  .empty p {
    margin: 0;
    font-size: var(--step-1);
  }

  .empty button {
    padding: 8px 14px;
    border: 1px solid var(--ink);
    border-radius: var(--radius-key);
    background: transparent;
    cursor: pointer;
  }
</style>
