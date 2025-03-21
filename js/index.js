const monsterContainer = document.getElementById("monster-container");
const monsterForm = document.getElementById("monster-form");
const loadMoreButton = document.getElementById("load-more");

let page = 1;
const limit = 50;

// Fetch and display monsters
function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster));
    });
}

function renderMonster(monster) {
    const monsterDiv = document.createElement("div");
    monsterDiv.innerHTML = `
        <h3>${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>${monster.description}</p>
        <hr>
    `;
    monsterContainer.appendChild(monsterDiv);
}

// Load first 50 monsters on page load
fetchMonsters(page);

// Handle monster creation
monsterForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const description = document.getElementById("description").value;
    
    const newMonster = { name, age: parseFloat(age), description };

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(monster => {
        renderMonster(monster);
        monsterForm.reset();
    });
});

// Load more monsters
loadMoreButton.addEventListener("click", function() {
    page++;
    fetchMonsters(page);
});
