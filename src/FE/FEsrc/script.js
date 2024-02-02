
var names = ["John Doe", "Jane Smith", "Viveknandan Krishnamurthyramaswamy", "Bob Johnson", "Alice Williams", "Michael Brown", "Karen Davis", "Karen Davis", "Kevin Miller", "Helen Clark", "Tom Lee", "Sarah Hall"];

// Get the card container
var cardContainer = document.getElementById('cardContainer');

// Create a card for each name
names.forEach(function(name) {
  var card = document.createElement('div');
  card.className = 'card';

  var circle = document.createElement('div');
  circle.className = 'circle';
  circle.innerHTML = '<span>' + name.charAt(0) + ' ' + name.split(" ").pop().charAt(0) + '</span>'; // Display first and last letters
  card.appendChild(circle);

  var content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = '<h1 class="name">' + name + '</h1>' + '<a href="saved-trials.html" class="saved-trials-link">See saved trials</a>';
  card.appendChild(content);

  cardContainer.appendChild(card);
});
