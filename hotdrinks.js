document.addEventListener("DOMContentLoaded", () => {
  const hotCoffeeList = document.getElementById('coffee-list');  // Use the correct ID: 'coffee-list'
  const modal = document.getElementById('coffee-modal');
  const closeModal = document.getElementById('close-modal');

  // Fetch hot coffee data
  fetch("https://api.sampleapis.com/coffee/hot")
    .then(response => response.json())
    .then(data => {
      data.forEach(coffee => {
        hotCoffeeList.innerHTML += createCoffeeItem(coffee, 'hot');
      });
    })
    .catch(error => console.error("Error fetching hot coffee:", error));

  // Create HTML for a coffee item with image and title clickable
  function createCoffeeItem(coffee, type) {
    return `
      <div class="coffee-item">
        <img src="${coffee.image}" alt="${coffee.title}" class="coffee-image" data-type="${type}" data-id="${coffee.id}">
        <h3 class="coffee-title" data-type="${type}" data-id="${coffee.id}">${coffee.title}</h3>
      </div>
    `;
  }

  // Open the modal when a coffee image or title is clicked
  document.addEventListener('click', (e) => {
    const coffeeElement = e.target.closest('.coffee-item');
    if (!coffeeElement) return; // If the click is outside a coffee item, do nothing

    const coffeeId = coffeeElement.querySelector('[data-id]').dataset.id;
    const coffeeType = coffeeElement.querySelector('[data-type]').dataset.type;

    // Open the modal with the coffee details
    showModal(coffeeId, coffeeType);
  });

  // Fetch and show coffee details in the modal
  function showModal(coffeeId, coffeeType) {
    fetch(`https://api.sampleapis.com/coffee/${coffeeType}`)
      .then(response => response.json())
      .then(data => {
        const coffee = data.find(item => item.id == coffeeId);
        if (coffee) {
          // Update modal content with coffee details
          document.getElementById('modal-coffee-image').src = coffee.image;
          document.getElementById('modal-coffee-title').textContent = coffee.title;
          document.getElementById('modal-coffee-description').textContent = coffee.description;
          document.getElementById('modal-coffee-ingredients').textContent = coffee.ingredients.join(', '); // assuming ingredients is an array
          modal.style.display = 'block'; // Show the modal
        }
      })
      .catch(error => console.error("Error fetching coffee details:", error));
  }

  // Close the modal when the close button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
  });

  // Close the modal if clicked outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none'; // Hide the modal if clicked outside
    }
  });
});
