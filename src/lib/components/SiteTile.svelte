<script lang="ts">
  import { categoryById } from '../categories';
  import type { Site, SiteStatus } from '../types';
  import { hostOf } from '../utils';
  import AudiframeMark from './AudiframeMark.svelte';
  import Led from './Led.svelte';

  let {
    site,
    status,
    preview,
    ontag,
  }: {
    site: Site;
    status: SiteStatus | undefined;
    preview: string | undefined;
    ontag: (tag: string) => void;
  } = $props();

  const category = $derived(categoryById[site.category]);
  let imageFailed = $state(false);
</script>

<article class="tile" class:dim={status === 'down'}>
  <div class="display">
    {#if preview && !imageFailed}
      <img
        src={preview}
        alt=""
        loading="lazy"
        decoding="async"
        onerror={() => (imageFailed = true)}
      />
    {:else}
      <span class="glyph" aria-hidden="true">{category.glyph}</span>
    {/if}
  </div>

  <div class="body">
    <h3 class="name">
      <a href={site.url} target="_blank" rel="noopener noreferrer"
        >{site.name}<span class="visually-hidden"> (opens in a new tab)</span
        ></a
      >
    </h3>
    <p class="description">{site.description}</p>

    <ul class="tags" aria-label="Tags">
      {#each site.tags.slice(0, 3) as tag (tag)}
        <li>
          <button
            type="button"
            onclick={() => ontag(tag)}
            aria-label={`Show apps tagged ${tag}`}>{tag}</button
          >
        </li>
      {/each}
    </ul>
  </div>

  <footer class="meta">
    <Led {status} />
    <span class="host">{hostOf(site.url)}</span>
    {#if site.audiframe}
      <AudiframeMark status={site.audiframe} />
    {/if}
    <span class="category">{category.label}</span>
  </footer>
</article>

<style>
  .tile {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-width: 0;
    background: var(--panel);
    outline: 1px solid var(--seam);
    transition: background-color 150ms ease;
  }

  .tile:hover,
  .tile:focus-within {
    background: color-mix(in srgb, var(--panel) 96%, var(--ink));
  }

  .tile.dim {
    opacity: 0.6;
  }

  .display {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 16 / 10;
    margin: 12px 12px 0;
    overflow: hidden;
    border-radius: var(--radius-key);
    background: var(--display);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.3);
  }

  .display img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: grayscale(1) contrast(1.05) brightness(0.92);
    opacity: 0.85;
    transition:
      filter 300ms ease,
      opacity 300ms ease;
  }

  .tile:hover .display img,
  .tile:focus-within .display img {
    filter: none;
    opacity: 1;
  }

  .glyph {
    font-size: 3rem;
    font-weight: 300;
    font-variation-settings: 'wdth' 125;
    color: var(--signal);
    letter-spacing: 0.02em;
  }

  .body {
    padding: 14px 16px 4px;
  }

  .name {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 650;
    font-variation-settings: 'wdth' 112;
    line-height: 1.25;
  }

  .name a {
    text-decoration: none;
  }

  /* Stretch the title link over the whole tile. */
  .name a::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .name a:focus-visible {
    outline: none;
  }

  .name a:focus-visible::after {
    outline: 2px solid var(--focus);
    outline-offset: -2px;
  }

  .description {
    margin: 6px 0 0;
    color: var(--slate);
    line-height: 1.45;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
  }

  .tags button {
    position: relative;
    z-index: 1;
    padding: 2px 8px;
    border: 1px solid var(--seam);
    border-radius: 999px;
    background: transparent;
    color: var(--slate);
    font-size: var(--step--1);
    cursor: pointer;
  }

  .tags button:hover {
    border-color: var(--ink);
    color: var(--ink);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    margin-top: 12px;
    padding: 10px 16px 12px;
    border-top: 1px solid var(--seam);
    font-size: var(--step--1);
    color: var(--slate);
  }

  .host {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .category {
    flex: none;
  }
</style>
