// Declarations
let artworks = [];
const indyTargets = [93409, 93422, 93424, 93416, 91610, 19204, 33301, 105207, 93831, 34149, 87045, 102610 ];

// Function to fetch artwork data
async function fetchArtworkData() {
    try {
        const promises = indyTargets.map(async (indyTarget) => {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/${indyTarget}`);
            const data = await response.json();
            return data.data; // Return the artwork data
        });
        artworks = await Promise.all(promises);
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
        artworks.forEach(artwork => {
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
        });
        artworkInfoDiv.innerHTML = html;
    }
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchArtworkData);
