

let clickboard = document.getElementById("copyme");
clickboard.addEventListener("click",()=>{
        
navigator.clipboard.writeText("npm i @rabia_youcef/vanilla-json").then(() => {
    let oldText = clickboard.textContent   // save the STRING
    clickboard.textContent = "Copied!"      // consistent name
    setTimeout(() => { clickboard.textContent = oldText }, 1000)
})
})


