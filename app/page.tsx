import styles from "./page.module.css";

const features = [
  {
    title: "Instant Launch",
    description:
      "Starts Xbox Cloud Gaming without the usual browser clutter, keeping the path from tap to play fast and direct.",
  },
  {
    title: "AMD FidelityFX CAS",
    description:
      "Applies Contrast Adaptive Sharpening through a WebGL2 fragment shader for crisper text, UI, and stream detail without adding latency.",
  },
  {
    title: "Discord Overlay",
    description:
      "Optional Discord mode stays completely dormant until enabled, then uses a four-tap gesture to open, hide, or fully close Discord mid-session.",
  },
  {
    title: "Tiny Android Footprint",
    description:
      "Built in Kotlin with minimal dependencies for a native feel, fast startup, and a package size under 800 KB.",
  },
] as const;

const specs = [
  ["Platform", "Android 8.0+"],
  ["Language", "Kotlin"],
  ["Build", "Gradle Kotlin DSL"],
  ["UI", "Native Android Views"],
] as const;

const installSteps = [
  "Clone the repository.",
  "Open the project in Android Studio and let Gradle sync.",
  "Build a signed APK from Android Studio.",
] as const;

const highlights = [
  "Discord Enabled",
  "AMD Resolution Boost",
  "Android Native",
  "Battery Optimzed",
] as const;

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Section navigation">
        <p className={styles.navBrand}>CloudPlayPlus</p>
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#install">Install</a>
        </div>
        <details className={styles.mobileNav}>
          <summary className={styles.mobileNavToggle} aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <div className={styles.mobileNavMenu}>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#install">Install</a>
          </div>
        </details>
      </nav>

      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>A minimal Android launcher for Xbox Cloud Gaming_</h1>
          <p className={styles.lead}>
            Built for handhelds, tablets, and phones that need a cleaner path
            into streaming. Fast launch, sharper visuals, and optional Discord
            control without excess UI.
          </p>
          <div className={styles.actions} aria-label="Primary actions">
            <a
              className={styles.primaryAction}
              href="https://github.com/AlexManzi/CloudPlayPlus"
              target="_blank"
              rel="noopener noreferrer"
            >
              [ View Repository ]
            </a>
            <span className={styles.actionDivider} aria-hidden="true">
              /
            </span>
            <a className={styles.secondaryAction} href="#install">
              [ Build From Source ]
            </a>
          </div>
        </div>

        <div className={styles.heroHighlights} aria-label="Product highlights">
          {highlights.map((highlight) => (
            <p key={highlight} className={styles.highlightItem}>
              {highlight}
            </p>
          ))}
        </div>
      </section>

      <section id="features" className={styles.gridSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Why it works</p>
          <h2>Focused features, no throwaway surface area_</h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article key={feature.title} className={styles.featureRow}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={styles.splitSection}>
        <article className={styles.storyBlock}>
          <p className={styles.kicker}>Designed for devices like G Cloud</p>
          <h2>Built for a focused handheld cloud gaming experience_</h2>
          <p>
            CloudPlayPlus is intentionally narrow in scope. It removes friction,
            keeps the app size small, and improves stream legibility without
            bloating the launcher into a second operating system.
          </p>
        </article>

        <article className={styles.specBlock}>
          <p className={styles.kicker}>Tech stack</p>
          <dl className={styles.specList}>
            {specs.map(([label, value]) => (
              <div key={label} className={styles.specRow}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      <section id="install" className={styles.installSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Installation</p>
          <h2>Build from source_</h2>
          <p>
            The current supported path is building locally in Android Studio or
            through Gradle.
          </p>
        </div>

        <div className={styles.installLayout}>
          <ol className={styles.installSteps}>
            {installSteps.map((step, index) => (
              <li key={step}>
                <span className={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
                {index === 0 ? (
                  <code className={styles.inlineCommand}>
                    git clone https://github.com/AlexManzi/CloudPlayPlus.git
                  </code>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
