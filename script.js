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


import { CATEGORIES, initialFacts } from './data.js';

const factsList = document.querySelector(".facts-list");
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

//Load data from Supabase
import { apiKey, authorizationToken } from './keys.js';
async function fetchFacts() {
    const res = await fetch('https://rjaldysjftmvsvkmipaz.supabase.co/rest/v1/facts', {
        headers: {
            apikey: apiKey ,
            authorization: authorizationToken
        }       
    })
    const data = await res.json()
    createFactsList(data)
}

fetchFacts();