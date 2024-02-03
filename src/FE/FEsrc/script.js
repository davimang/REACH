// Get the card container
var cardContainer = document.getElementById('cardContainer');

fetch('/your-api-endpoint/patient-info/')
  .then(response => response.json())  
  .then(data => {
    var names = data.map(patient => `${patient.user_data.first_name} ${patient.user_data.last_name}`);

    // Create a card for each name
    names.forEach(function (name) {
      var card = document.createElement('div');
      card.className = 'card';

      // Create a circle element for the first and last letters
      var circle = document.createElement('div');
      circle.className = 'circle';
      circle.innerHTML = '<span>' + name.charAt(0) + ' ' + name.split(" ").pop().charAt(0) + '</span>'; // Display first and last letters
      card.appendChild(circle);

      // Create a content element for the name and a link
      var content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = '<h1 class="name">' + name + '</h1>' + '<a href="saved-trials.html" class="saved-trials-link">See saved trials</a>';
      card.appendChild(content);

      // Append the card to the card container
      cardContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
