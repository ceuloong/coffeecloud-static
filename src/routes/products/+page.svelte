<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import { userStore } from '$lib/stores/userStore';

  interface Product {
    id: string;
    name: string;
    power: string;
    period: string;
    price: number;
    features: string[];
    popular?: boolean;
  }

  const products: Product[] = [
    {
      id: 'basic',
      name: t('products.basic.name', $language),
      power: '1 PiB',
      period: '540',
      price: 6000,
      features: [
        t('products.basic.feature1', $language),
        t('products.basic.feature2', $language),
        t('products.basic.feature3', $language),
        t('products.basic.feature4', $language)
      ]
    },
    {
      id: 'pro',
      name: t('products.pro.name', $language),
      power: '5 PiB',
      period: '540',
      price: 29000,
      popular: true,
      features: [
        t('products.pro.feature1', $language),
        t('products.pro.feature2', $language),
        t('products.pro.feature3', $language),
        t('products.pro.feature4', $language),
        t('products.pro.feature5', $language)
      ]
    },
    {
      id: 'enterprise',
      name: t('products.enterprise.name', $language),
      power: '10 PiB',
      period: '540',
      price: 55000,
      features: [
        t('products.enterprise.feature1', $language),
        t('products.enterprise.feature2', $language),
        t('products.enterprise.feature3', $language),
        t('products.enterprise.feature4', $language),
        t('products.enterprise.feature5', $language),
        t('products.enterprise.feature6', $language)
      ]
    }
  ];

  function handlePurchase(product: Product) {
    if (!$userStore) {
      window.location.href = '/login';
      return;
    }
    // TODO: 实现购买逻辑
    console.log('Purchase:', product);
  }
</script>

<div class="products-page">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>{t('products.title', $language)}</h1>
      <p class="subtitle">{t('products.subtitle', $language)}</p>
    </div>
  </section>

  <!-- Products Grid -->
  <section class="products">
    <div class="container">
      <div class="products-grid">
        {#each products as product}
          <div class="product-card {product.popular ? 'popular' : ''}">
            {#if product.popular}
              <div class="popular-badge">{t('products.popularChoice', $language)}</div>
            {/if}
            <div class="product-header">
              <h3>{product.name}</h3>
              <div class="price">
                <span class="amount">¥{product.price.toLocaleString()}</span>
                <span class="period">/ {product.period} {t('products.days', $language)}</span>
              </div>
            </div>
            <div class="specs">
              <div class="spec-item">
                <i class="fas fa-server"></i>
                <span>{t('products.power', $language)}: {product.power}</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-clock"></i>
                <span>{t('products.period', $language)}: {product.period} {t('products.days', $language)}</span>
              </div>
            </div>
            <ul class="features">
              {#each product.features as feature}
                <li>
                  <i class="fas fa-check"></i>
                  {feature}
                </li>
              {/each}
            </ul>
            <button 
              class="purchase-btn" 
              class:primary={product.popular}
              on:click={() => handlePurchase(product)}
            >
              {t('products.purchase', $language)}
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <div class="container">
      <h2>{t('products.features.title', $language)}</h2>
      <div class="features-grid">
        <div class="feature-item">
          <i class="fas fa-shield-alt"></i>
          <h3>{t('products.features.security.title', $language)}</h3>
          <p>{t('products.features.security.desc', $language)}</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-chart-line"></i>
          <h3>{t('products.features.performance.title', $language)}</h3>
          <p>{t('products.features.performance.desc', $language)}</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-wallet"></i>
          <h3>{t('products.features.earnings.title', $language)}</h3>
          <p>{t('products.features.earnings.desc', $language)}</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-headset"></i>
          <h3>{t('products.features.support.title', $language)}</h3>
          <p>{t('products.features.support.desc', $language)}</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .products-page {
    background-color: var(--bg-light);
  }

  .hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 4rem 1rem;
    text-align: center;
  }

  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .products {
    padding: 4rem 0;
    margin-top: -4rem;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .product-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.2s;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-card.popular {
    border: 2px solid var(--accent-color);
  }

  .popular-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }

  .product-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .product-header h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2rem;
    color: var(--text-color);
  }

  .price .period {
    font-size: 1rem;
    color: var(--text-light);
  }

  .specs {
    margin-bottom: 2rem;
  }

  .spec-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-light);
  }

  .features {
    list-style: none;
    margin-bottom: 2rem;
  }

  .features li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .features i {
    color: var(--accent-color);
  }

  .purchase-btn {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    background: var(--bg-light);
    color: var(--primary-color);
    transition: all 0.2s;
  }

  .purchase-btn.primary {
    background: var(--accent-color);
    color: white;
  }

  .purchase-btn:hover {
    filter: brightness(0.9);
  }

  .features-section {
    background: white;
    padding: 6rem 0;
  }

  .features-section h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 2rem;
    color: var(--primary-color);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }

  .feature-item {
    text-align: center;
  }

  .feature-item i {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-bottom: 1.5rem;
  }

  .feature-item h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .feature-item p {
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .products {
      padding: 2rem 1rem;
    }

    .features-section {
      padding: 4rem 1rem;
    }
  }
</style> 