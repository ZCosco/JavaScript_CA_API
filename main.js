// Declarations
let artworks = [];
let fetchArtwork;

// Function to fetch artwork data
async function fetchArtworkData() {
    try {
        const response = await fetch("https://api.artic.edu/api/v1/artworks?page=3");
        const data = await response.json();
        artworks = data.data || [];
        renderArtworks();
    } catch (error) {
        console.error("Error fetching artwork data:", error);
    }
}

// Render artworks
function renderArtworks() {
  const artworkInfoDiv = document.getElementById("artwork-info");
  if (artworks.length === 0) {
      artworkInfoDiv.innerHTML = "A Thief stole the artworks!";
  } else {
      let html = "";
      for (let i = 0; i < artworks.length; i++) {
          const artwork = artworks[i];
          if (artwork.title && artwork.title !== "Untitled") {
              html += `
                  <div class="artwork-container">
                      <img class="artwork-image" src="images/${artwork.title}.png">
                      <div class="artwork-info">
                          <h2>${artwork.title}</h2>
                          <p>Artist: ${artwork.artist_display}</p>
                          <p>Description: ${artwork.thumbnail.alt_text}</p>
                      </div>
                  </div>
              `;
          }
      }
      artworkInfoDiv.innerHTML = html;
  }
}


// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchArtworkData);
