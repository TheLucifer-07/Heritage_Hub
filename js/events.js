
const festivalSearchInput = document.getElementById("festival-search-input");
const festivalSearchBtn = document.getElementById("festival-search-btn");

festivalSearchBtn.addEventListener("click", () => {
  const query = festivalSearchInput.value.trim().toLowerCase();
  const festivalContent = document.getElementById("festival-content");
  festivalContent.innerHTML = "";

  if (query === "") {
    festivalContent.innerHTML = "<p>Please enter a festival name to search.</p>";
    return;
  }
  const festivals = [
    { name: "Diwali", country: "India", date: "Oct-Nov" },
    { name: "Holi", country: "India", date: "March" },
    { name: "Cherry Blossom", country: "Japan", date: "April" },
    { name: "Chinese New Year", country: "China", date: "Jan-Feb" },
    { name: "Eid-al-Fitr", country: "Global", date: "Varies" },
    { name: "Onam", country: "India", date: "Aug-Sep" },
    { name: "Jeju Fire Festival", country: "South Korea", date: "March" },
    { name: "Banjara Folk Tradition", country: "India", date: "Varies" }
  ];

  const results = festivals.filter(f => f.name.toLowerCase().includes(query));

  if (results.length === 0) {
    festivalContent.innerHTML = "<p>No festival found.</p>";
  } else {
    results.forEach(f => {
      const div = document.createElement("div");
      div.classList.add("festival-item");
      div.innerHTML = `<h4>${f.name}</h4><p>Country: ${f.country}</p><p>Date: ${f.date}</p>`;
      festivalContent.appendChild(div);
    });
  }
});

const festivals = {
  "India": [
    { name: "Diwali", month: "November", desc: "Festival of Lights celebrated with diyas, sweets, and fireworks." },
    { name: "Holi", month: "March", desc: "Festival of Colors marking the arrival of spring." },
    { name: "Pongal", month: "January", desc: "Harvest festival celebrated in South India." }
  ],
  "Japan": [
    { name: "Cherry Blossom Festival", month: "April", desc: "Celebrates the beauty of cherry blossoms." },
    { name: "Gion Matsuri", month: "July", desc: "One of the most famous festivals with parades and floats." }
  ],
  "USA": [
    { name: "Thanksgiving", month: "November", desc: "Celebration of gratitude with family feasts." },
    { name: "Independence Day", month: "July", desc: "Fireworks and parades on July 4th." }
  ],
  "Brazil": [
    { name: "Carnival", month: "February", desc: "Colorful samba parades and street celebrations." }
  ],
  "France": [
    { name: "Bastille Day", month: "July", desc: "French National Day with parades and fireworks." }
  ],
  "China": [
    { name: "Chinese New Year", month: "February", desc: "Lunar New Year with dragon dances and lanterns." }
  ],
  "Australia": [
    { name: "Australia Day", month: "January", desc: "National celebration with fireworks and concerts." }
  ],
  "Germany": [
    { name: "Oktoberfest", month: "October", desc: "Beer festival in Munich with traditional music." }
  ]
};
function showFestivals(country) {
  const display = document.getElementById("festival-content");
  display.innerHTML = `<h3>${country}</h3>`;
  
  festivals[country].forEach(festival => {
    display.innerHTML += `
      <div class="festival-item">
        <h4>${festival.name} (${festival.month})</h4>
        <p>${festival.desc}</p>
      </div>
    `;
  });
}

// Show festivals by month
function filterByMonth(month) {
  const display = document.getElementById("festival-content");
  display.innerHTML = `<h3>Festivals in ${month}</h3>`;
  
  let found = false;
  for (let country in festivals) {
    festivals[country].forEach(festival => {
      if (festival.month === month) {
        display.innerHTML += `
          <div class="festival-item">
            <h4>${festival.name} - ${country}</h4>
            <p>${festival.desc}</p>
          </div>
        `;
        found = true;
      }
    });
  }

  if (!found) {
    display.innerHTML += `<p>No festivals listed for this month yet.</p>`;
  }
}
function toggleFestivalsSection() {
  const section = document.getElementById("festivals-events");
  
  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
    section.scrollIntoView({ behavior: "smooth" }); 
  } else {
    section.classList.add("hidden");
  }
}
