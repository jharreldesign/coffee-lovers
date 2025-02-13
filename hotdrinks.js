document.addEventListener("DOMContentLoaded", () => {
  const hotCoffeeList = document.getElementById('coffee-list');  // Use the correct ID

  // Fetch hot coffee data
  fetch("https://api.sampleapis.com/coffee/hot")
    .then(response => response.json())
    .then(data => {
      data.forEach(coffee => {
        hotCoffeeList.innerHTML += createCoffeeItem(coffee);
      });
    })
    .catch(error => console.error("Error fetching hot coffee:", error));

  // Create HTML for a coffee item
  function createCoffeeItem(coffee) {
    return `
      <div class="coffee-item">
        <img src="${coffee.image}" alt="${coffee.title}">
        <h3>${coffee.title}</h3>
        <p>${coffee.description}</p>
      </div>
    `;
  }
});
