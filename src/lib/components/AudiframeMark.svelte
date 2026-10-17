<script lang="ts">
  import type { AudiframeStatus } from '../types';

  let { status }: { status: AudiframeStatus } = $props();

  const title = $derived(
    status === 'supported'
      ? 'Supports audiframe: richer integration in compatible hosts such as Noodlr Board'
      : 'audiframe support in development',
  );
</script>

<span class="mark" data-status={status} {title}>
  audiframe{status === 'in-development' ? ' soon' : ''}
</span>

<style>
  .mark {
    position: relative;
    z-index: 1;
    flex: none;
    padding: 1px 7px;
    border: 1px solid var(--signal-text);
    border-radius: 999px;
    color: var(--signal-text);
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .mark[data-status='supported'] {
    border-color: var(--signal);
    background: var(--signal);
    color: var(--signal-ink);
  }
</style>
