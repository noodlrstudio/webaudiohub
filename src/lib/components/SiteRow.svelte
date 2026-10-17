<script lang="ts">
  import { categoryById } from '../categories';
  import type { Site, SiteStatus } from '../types';
  import { hostOf } from '../utils';
  import AudiframeMark from './AudiframeMark.svelte';
  import Led from './Led.svelte';

  let { site, status }: { site: Site; status: SiteStatus | undefined } =
    $props();
</script>

<li class="row" class:dim={status === 'down'}>
  <Led {status} />
  <div class="main">
    <a class="name" href={site.url} target="_blank" rel="noopener noreferrer"
      >{site.name}<span class="visually-hidden"> (opens in a new tab)</span></a
    >
    <span class="description">{site.description}</span>
  </div>
  <span class="host">{hostOf(site.url)}</span>
  <span class="category">{categoryById[site.category].label}</span>
  <span class="flag">
    {#if site.audiframe}<AudiframeMark status={site.audiframe} />{/if}
  </span>
</li>

<style>
  .row {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 6px 14px;
    padding: 14px 16px;
    background: var(--panel);
  }

  @media (min-width: 820px) {
    .row {
      grid-template-columns: auto minmax(0, 1fr) 180px 110px 120px;
    }
  }

  .row:hover,
  .row:focus-within {
    background: color-mix(in srgb, var(--panel) 96%, var(--ink));
  }

  .row.dim {
    opacity: 0.6;
  }

  .main {
    display: grid;
    min-width: 0;
  }

  .name {
    font-weight: 650;
    font-variation-settings: 'wdth' 112;
    text-decoration: none;
  }

  .name::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .name:focus-visible {
    outline: none;
  }

  .name:focus-visible::after {
    outline: 2px solid var(--focus);
    outline-offset: -2px;
  }

  .description {
    overflow: hidden;
    color: var(--slate);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .host,
  .category {
    font-size: var(--step--1);
    color: var(--slate);
  }

  .host {
    display: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .category {
    display: none;
  }

  .flag {
    justify-self: end;
  }

  @media (min-width: 820px) {
    .host,
    .category {
      display: block;
    }
  }
</style>
