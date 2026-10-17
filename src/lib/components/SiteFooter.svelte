<script lang="ts">
  import {
    AUDIFRAME_URL,
    MIDIWEB_HUB_URL,
    NOODLR_URL,
    REPO_URL,
  } from '../links';
</script>

<footer class="footer">
  <div class="wrap">
    <h2 class="heading">How the pieces fit</h2>
    <div class="ecosystem">
      <section>
        <h3>WebAudio Hub</h3>
        <p>
          You are here. A community-curated list of playable Web Audio apps.
          Listing an app does not require audiframe.
        </p>
      </section>
      <section>
        <h3><a href={AUDIFRAME_URL}>audiframe</a></h3>
        <p>
          An open protocol that lets web music apps talk to the hosts that embed
          them: MIDI, saved state, clock and parameters. Not tied to any one
          host.
        </p>
      </section>
      <section>
        <h3><a href={NOODLR_URL}>Noodlr Board</a></h3>
        <p>
          A collaborative canvas for playing web instruments together. It can
          load any app here, and gives audiframe apps extra powers.
        </p>
      </section>
    </div>

    <div class="small">
      <p>
        Code is MIT licensed and the directory data is CC BY 4.0. Listed apps
        belong to their makers and are not affiliated with noodlr studio unless
        stated. Looking for WebMIDI tools? Try
        <a href={MIDIWEB_HUB_URL}>MIDIWeb Hub</a>.
      </p>
      <p>
        <a href={REPO_URL}>Source on GitHub</a>. © noodlr studio ltd.
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    margin-top: 64px;
    padding: 40px 0 48px;
    border-top: 1px solid var(--seam);
    background: var(--panel);
  }

  .heading {
    margin: 0 0 20px;
    font-size: var(--step-2);
    font-weight: 700;
    font-variation-settings: 'wdth' 118;
  }

  .ecosystem {
    display: grid;
    gap: 1px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-panel);
    overflow: hidden;
    background: var(--seam);
  }

  @media (min-width: 760px) {
    .ecosystem {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  section {
    padding: 18px 20px 20px;
    background: var(--panel-sunk);
  }

  h3 {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 650;
    font-variation-settings: 'wdth' 112;
  }

  h3 a {
    text-decoration-color: var(--signal);
    text-underline-offset: 3px;
  }

  section p {
    max-width: 38em;
    margin: 6px 0 0;
    color: var(--slate);
  }

  .small {
    display: grid;
    gap: 4px;
    margin-top: 28px;
    font-size: var(--step--1);
    color: var(--slate);
  }

  .small p {
    max-width: 70em;
    margin: 0;
  }
</style>
