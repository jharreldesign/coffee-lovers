document.addEventListener("DOMContentLoaded", () => {
  const hotCoffeeList = document.getElementById('hot-coffee-list');
  const icedCoffeeList = document.getElementById('iced-coffee-list');

  // Fetch hot coffee data
  fetch("https://api.sampleapis.com/coffee/hot")
    .then(response => response.json())
    .then(data => {
      data.forEach(coffee => {
        hotCoffeeList.innerHTML += createCoffeeItem(coffee, 'hot');
      });
    })
    .catch(error => console.error("Error fetching hot coffee:", error));

  // Fetch iced coffee data
  fetch("https://api.sampleapis.com/coffee/iced")
    .then(response => response.json())
    .then(data => {
      data.forEach(coffee => {
        icedCoffeeList.innerHTML += createCoffeeItem(coffee, 'iced');
      });
    })
    .catch(error => console.error("Error fetching iced coffee:", error));

  // Create HTML for a coffee item
  function createCoffeeItem(coffee, type) {
    return `
      <div class="coffee-item">
        <a href="coffee-detail.html?type=${type}&id=${coffee.id}">
          <img src="${coffee.image}" alt="${coffee.title}">
          <h3>${coffee.title}</h3>
        </a>
      </div>
    `;
  }
});
