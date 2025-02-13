document.addEventListener("DOMContentLoaded", () => {
  const coffeeDetailContainer = document.getElementById('coffee-detail-container');
  const otherCoffeesList = document.getElementById('other-coffees-list');
  const coffeeTitle = document.getElementById('coffee-title'); // Target the h1 element
  const params = new URLSearchParams(window.location.search);
  const coffeeType = params.get('type');  // 'hot' or 'iced'
  const coffeeId = params.get('id');  // Coffee ID to fetch details
  
  // Fetch coffee data based on type (hot or iced)
  fetch(`https://api.sampleapis.com/coffee/${coffeeType}`)
    .then(response => response.json())
    .then(data => {
      const coffee = data.find(item => item.id == coffeeId);
      if (coffee) {
        // Update the page title with the coffee name
        coffeeTitle.textContent = `${coffee.title} Details`;
        
        // Display coffee details
        coffeeDetailContainer.innerHTML = `
          <div class="coffee-detail-item">
            <img src="${coffee.image}" alt="${coffee.title}">
            <p><strong>Description:</strong> ${coffee.description}</p>
            <p><strong>Ingredients:</strong> ${coffee.ingredients}</p>
          </div>
        `;
        
        // List other coffees in sidebar
        otherCoffeesList.innerHTML = data
          .filter(item => item.id != coffeeId)
          .map(item => `
            <li><a href="coffee-detail.html?type=${coffeeType}&id=${item.id}">${item.title}</a></li>
          `)
          .join('');
      } else {
        coffeeDetailContainer.innerHTML = "<p>Coffee not found.</p>";
      }
    })
    .catch(error => console.error("Error fetching coffee details:", error));
});
