const products = [
    { id: 1, name: 'Redmi', price: 10, image: 'assets/1.webp' },
    { id: 2, name: 'POCO', price: 20, image: 'assets/2.jpg' },
    { id: 3, name: 'Samsung', price: 30, image: 'assets/3.jpg' },
    { id: 4, name: 'Student - laptop', price: 40, image: 'assets/4.jpg' },
    { id: 5, name: 'Gaming Laptop', price: 50, image: 'assets/5.jpg' },
    { id: 6, name: 'Professional-laptop', price: 60, image: 'assets/6.jpg' },
    { id: 7, name: 'Ipad ', price: 70, image: 'assets/7.jfif' },
    { id: 8, name: 'Ipad', price: 80, image: 'assets/8.jfif' },
    { id: 9, name: 'Ipad', price: 90, image: 'assets/9.jfif' },
    { id: 10, name: 'Ipad', price: 100, image: 'assets/10.jfif' }
  ];
  
  const productContainer = document.querySelector('.product-container');
  const searchInput = document.querySelector('input[type="text"]');
  const searchButton = document.querySelector('button[type="submit"]');
  const loadingMsg = document.querySelector('.loading-msg');
  
  let page = 1;
  let isFetching = false;
  
  function renderProducts(products) {
    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      `;
      productContainer.appendChild(productCard);
    });
  }
  
  function searchProducts(query) {
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
}

// Search functionality
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const query = searchInput.value;
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
    productContainer.innerHTML = '';
    renderProducts(filteredProducts);
  });
  
  // Infinite scroll functionality
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
      isFetching = true;
      loadingMsg.style.display = 'block';
      setTimeout(() => {
        page++;
        const nextPage = products.slice((page - 1) * 6, page * 6);
        renderProducts(nextPage);
        isFetching = false;
        loadingMsg.style.display = 'none';
      }, 1000);
    }
  });
  
  // Initial render
  renderProducts(products.slice(0, 6));
  