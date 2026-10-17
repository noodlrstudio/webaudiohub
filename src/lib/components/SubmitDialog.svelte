<script lang="ts">
  import { REPO_URL } from '../links';

  let { open = $bindable(false) }: { open: boolean } = $props();

  let dialog: HTMLDialogElement | undefined = $state();
  let copied = $state(false);

  const entry = `  {
    id: 'your-app',
    name: 'Your App',
    url: 'https://example.com/',
    category: 'synth',
    tags: ['fm', 'webmidi'],
    description: 'One plain sentence about what it does.',
  },`;

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  });

  async function copyEntry() {
    try {
      await navigator.clipboard.writeText(entry);
      copied = true;
      setTimeout(() => (copied = false), 1800);
    } catch {
      copied = false;
    }
  }
</script>

<dialog
  bind:this={dialog}
  onclose={() => (open = false)}
  onclick={(event) => {
    if (event.target === dialog) open = false;
  }}
  aria-labelledby="submit-title"
>
  <div class="sheet">
    <header>
      <h2 id="submit-title">Add an app</h2>
      <button
        type="button"
        class="close"
        onclick={() => (open = false)}
        aria-label="Close">×</button
      >
    </header>

    <p>
      The directory is a single data file on GitHub. Anyone can propose an app
      with a pull request, including your own.
    </p>

    <ol>
      <li>
        Open <a href={`${REPO_URL}/edit/main/src/lib/data.ts`}
          >src/lib/data.ts</a
        > on GitHub. It will offer to fork the repository for you.
      </li>
      <li>Add an entry like this one to the list:</li>
    </ol>

    <div class="code">
      <pre><code>{entry}</code></pre>
      <button type="button" class="copy" onclick={copyEntry}>
        {copied ? 'Copied' : 'Copy entry'}
      </button>
    </div>

    <ol start="3">
      <li>Commit the change and open a pull request.</li>
    </ol>

    <p class="small">
      Categories: drums, sequencer, synth, modular, live-coding, daw, playful.
      Apps should be free to try, working, and make sound with Web Audio. They
      don't need to support audiframe. Read the
      <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}>contribution guide</a>.
    </p>
  </div>
</dialog>

<style>
  dialog {
    width: min(560px, calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    padding: 0;
    border: 1px solid var(--seam);
    border-radius: var(--radius-panel);
    background: var(--panel);
    color: var(--ink);
    box-shadow: 0 24px 60px rgb(0 0 0 / 0.25);
  }

  dialog::backdrop {
    background: rgb(20 20 22 / 0.45);
  }

  dialog[open] {
    animation: lift 180ms ease-out;
  }

  @keyframes lift {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }

  .sheet {
    padding: 20px 22px 24px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    margin: 0;
    font-size: var(--step-2);
    font-weight: 700;
    font-variation-settings: 'wdth' 118;
  }

  .close {
    width: 36px;
    height: 36px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-key);
    background: var(--panel-sunk);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
  }

  p,
  li {
    color: var(--slate);
  }

  ol {
    margin: 12px 0;
    padding-left: 1.25em;
  }

  li + li {
    margin-top: 6px;
  }

  .code {
    position: relative;
    border-radius: var(--radius-key);
    background: var(--display);
  }

  pre {
    margin: 0;
    padding: 14px 16px;
    overflow-x: auto;
    color: #e8e8e3;
    font-size: var(--step--1);
    line-height: 1.6;
  }

  .copy {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 10px;
    border: 0;
    border-radius: 2px;
    background: var(--signal);
    color: var(--signal-ink);
    font-size: var(--step--1);
    font-weight: 600;
    cursor: pointer;
  }

  .small {
    font-size: var(--step--1);
  }
</style>
