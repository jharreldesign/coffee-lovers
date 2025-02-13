document.addEventListener("DOMContentLoaded", () => {
    const coffeeDetailContainer = document.getElementById('coffee-detail-container');
    const params = new URLSearchParams(window.location.search);
    const coffeeType = params.get('type');  // 'hot' or 'iced'
    const coffeeId = params.get('id');  // Coffee ID to fetch details
    
    // Fetch coffee data based on type (hot or iced)
    fetch(`https://api.sampleapis.com/coffee/${coffeeType}`)
      .then(response => response.json())
      .then(data => {
        const coffee = data.find(item => item.id == coffeeId);
        if (coffee) {
          coffeeDetailContainer.innerHTML = `
            <div class="coffee-detail-item">
              <img src="${coffee.image}" alt="${coffee.title}">
              <h1>${coffee.title}</h1>
              <p><strong>Description:</strong> ${coffee.description}</p>
              <p><strong>Ingredients:</strong> ${coffee.ingredients}</p>
            </div>
          `;
        } else {
          coffeeDetailContainer.innerHTML = "<p>Coffee not found.</p>";
        }
      })
      .catch(error => console.error("Error fetching coffee details:", error));
});
