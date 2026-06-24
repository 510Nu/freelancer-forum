/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function makeRandomFreelancer() {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomOccupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const randomRate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return {
    name: randomName,
    occupation: randomOccupation,
    rate: randomRate,
  };
}

const freelancers = [];
for (let i = 0; i < NUM_FREELANCERS; i++) {
  freelancers.push(makeRandomFreelancer());
}

function getAverageRate(freelancers) {
  let totalAverage = 0;
  for (let freelancer of freelancers) {
    totalAverage += freelancer.rate;
  }
  let average = totalAverage / freelancers.length;
  return average;
}

let averageRate = getAverageRate(freelancers);

function freelancerRow(freelancer) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>$${freelancer.rate}/hr</td>
  `;
  return row;
}

function freelancerRows() {
  const tbody = document.createElement("tbody");
  for (let freelancer of freelancers) {
    const row = freelancerRow(freelancer);
    tbody.appendChild(row);
  }

  return tbody;
}

function averageRateComponent() {
  const p = document.createElement("p");
  const roundedAverage = Math.round(averageRate);

  p.innerHTML = `The average hourly rate is ${roundedAverage}.`;

  return p;
}

function render() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div id="average-container"></div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Hourly Rate</th>
        </tr>
      </thead>
      <tbody id="freelancer-container"></tbody>
    </table>
  `;
  app.querySelector("#average-container").appendChild(averageRateComponent());

  app.querySelector("#freelancer-container").replaceWith(freelancerRows());
}
render();
