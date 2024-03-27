const btn = document.querySelector(".share-fact-btn");
const form = document.querySelector("form");

btn.addEventListener("click", function() {
    if(form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "close"
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share a fact"
    }
})

const factsList = document.querySelector(".facts-list");

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// console.log(CATEGORIES.find((cat) => cat.name == "society"));

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    up_votes: 24,
    mindblowing_votes: 9,
    down_votes: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    up_votes: 11,
    mindblowing_votes: 2,
    down_votes: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    up_votes: 8,
    mindblowing_votes: 3,
    down_votes: 1,
    createdIn: 2015,
  },
];

factsList.innerHTML = "";
createFactsList(initialFacts)

function createFactsList(dataArray) {
    const htmlArr = dataArray.map((fact) => 
    `<li class="fact">
        <p>${fact.text}
            <a class="source" href="${fact.source}" target="_blank">(Source)</a>

        </p>
        <span class="tag ${fact.category}">#${fact.category}</span>
        <div class="vote-buttons">
            <button>👍 ${fact.up_votes}</button>
            <button>🤯 ${fact.mindblowing_votes}</button>
            <button>⛔️ ${fact.down_votes}</button>
        </div>
    </li>`
    )
    factsList.insertAdjacentHTML("afterbegin", htmlArr.join(" "))
}
