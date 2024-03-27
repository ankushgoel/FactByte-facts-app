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
