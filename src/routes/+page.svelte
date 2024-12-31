<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
</script>

<div class="home">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>CoffeeCloud</h1>
      <p class="subtitle">{t('home.hero.subtitle', $language)}</p>
      <div class="hero-buttons">
        <a href="/products" class="primary-btn">{t('home.hero.getStarted', $language)}</a>
        <a href="#about" class="secondary-btn">{t('home.hero.learnMore', $language)}</a>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="stats">
    <div class="container">
      <div class="stat-item">
        <div class="stat-number">100+</div>
        <div class="stat-label">{t('home.stats.nodes', $language)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">10 PiB+</div>
        <div class="stat-label">{t('home.stats.storage', $language)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">99.9%</div>
        <div class="stat-label">{t('home.stats.uptime', $language)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">1000+</div>
        <div class="stat-label">{t('home.stats.users', $language)}</div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features" id="about">
    <div class="container">
      <h2>{t('home.features.title', $language)}</h2>
      <div class="features-grid">
        <div class="feature-card">
          <i class="fas fa-server"></i>
          <h3>{t('home.features.hardware.title', $language)}</h3>
          <p>{t('home.features.hardware.desc', $language)}</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-shield-alt"></i>
          <h3>{t('home.features.security.title', $language)}</h3>
          <p>{t('home.features.security.desc', $language)}</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-chart-line"></i>
          <h3>{t('home.features.earnings.title', $language)}</h3>
          <p>{t('home.features.earnings.desc', $language)}</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-headset"></i>
          <h3>{t('home.features.support.title', $language)}</h3>
          <p>{t('home.features.support.desc', $language)}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us Section -->
  <section class="why-us">
    <div class="container">
      <h2>{t('home.whyUs.title', $language)}</h2>
      <div class="why-us-grid">
        <div class="why-us-content">
          <div class="why-us-item">
            <i class="fas fa-check-circle"></i>
            <div>
              <h3>{t('home.whyUs.experience.title', $language)}</h3>
              <p>{t('home.whyUs.experience.desc', $language)}</p>
            </div>
          </div>
          <div class="why-us-item">
            <i class="fas fa-check-circle"></i>
            <div>
              <h3>{t('home.whyUs.technology.title', $language)}</h3>
              <p>{t('home.whyUs.technology.desc', $language)}</p>
            </div>
          </div>
          <div class="why-us-item">
            <i class="fas fa-check-circle"></i>
            <div>
              <h3>{t('home.whyUs.service.title', $language)}</h3>
              <p>{t('home.whyUs.service.desc', $language)}</p>
            </div>
          </div>
        </div>
        <div class="why-us-image">
          <div class="image-carousel">
            <img src="/images/datacenter.svg" alt="Data Center" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta">
    <div class="container">
      <h2>{t('home.cta.title', $language)}</h2>
      <p>{t('home.cta.desc', $language)}</p>
      <a href="/register" class="cta-btn">{t('home.cta.button', $language)}</a>
    </div>
  </section>
</div>

<style>
  .home {
    overflow-x: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 6rem 1rem;
    text-align: center;
  }

  .hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .primary-btn, .secondary-btn {
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .primary-btn {
    background: var(--accent-color);
    color: var(--primary-color);
  }

  .secondary-btn {
    border: 2px solid white;
    color: white;
  }

  /* Stats Section */
  .stats {
    background: white;
    padding: 4rem 0;
    margin-top: -4rem;
    border-radius: 16px 16px 0 0;
  }

  .stats .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--text-light);
  }

  /* Features Section */
  .features {
    padding: 6rem 0;
    background: var(--bg-light);
  }

  .features h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-card i {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-bottom: 1.5rem;
  }

  /* Why Choose Us Section */
  .why-us {
    padding: 6rem 0;
    background: white;
  }

  .why-us h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  .why-us-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .why-us-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .why-us-item i {
    font-size: 1.5rem;
    color: var(--accent-color);
  }

  .why-us-image img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* CTA Section */
  .cta {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 6rem 0;
    text-align: center;
  }

  .cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .cta p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-btn {
    display: inline-block;
    background: var(--accent-color);
    color: var(--primary-color);
    padding: 1rem 2.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .stats .container {
      grid-template-columns: repeat(2, 1fr);
    }

    .why-us-grid {
      grid-template-columns: 1fr;
    }

    .why-us-image {
      order: -1;
    }
  }

  .image-carousel {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 12px;
  }

  .image-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s;
  }
</style> 