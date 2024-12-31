<script lang="ts">
  interface Coffee {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }

  const coffees: Coffee[] = [
    {
      id: 1,
      name: '美式咖啡',
      price: 25,
      description: '清淡醇厚，回味悠长',
      image: '/images/americano.jpg'
    },
    {
      id: 2,
      name: '拿铁咖啡',
      price: 32,
      description: '丝滑浓郁，奶香四溢',
      image: '/images/latte.jpg'
    },
    {
      id: 3,
      name: '卡布奇诺',
      price: 32,
      description: '完美比例，层次分明',
      image: '/images/cappuccino.jpg'
    }
  ];
</script>

<div class="menu-container">
  <h1>咖啡菜单</h1>
  <div class="coffee-grid">
    {#each coffees as coffee}
      <div class="coffee-card">
        <div class="coffee-image">
          <img src={coffee.image} alt={coffee.name} />
        </div>
        <div class="coffee-info">
          <h2>{coffee.name}</h2>
          <p>{coffee.description}</p>
          <div class="coffee-price">
            ¥{coffee.price}
          </div>
          <button class="add-to-cart">加入购物车</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .menu-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .coffee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .coffee-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .coffee-card:hover {
    transform: translateY(-4px);
  }

  .coffee-image {
    height: 200px;
    overflow: hidden;
  }

  .coffee-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .coffee-info {
    padding: 1.5rem;
  }

  .coffee-info h2 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .coffee-info p {
    color: #666;
    margin-bottom: 1rem;
  }

  .coffee-price {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--secondary-color);
    margin-bottom: 1rem;
  }

  .add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .add-to-cart:hover {
    background-color: var(--secondary-color);
  }
</style> 