const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdowns){
    for(currCode in countryList){
        let newOpt = document.createElement("option")
        newOpt.innerHTML = currCode
        newOpt.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOpt.selected = "selected"
        } else if (select.name === "to" && currCode === "PKR"){
            newOpt.selected = "selected"
        }
        select.append(newOpt)
    }

    select.addEventListener("change", (evt) => {
        updateFlage(evt.target)
    })
    
}

updateFlage = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let src = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = src
}
const updateExchangeRate = async () => {
    let amount = document.querySelector("form input")
    let amtVal = amount.value
    if(amtVal === "" || amtVal < 1){
        amount.value = "1"
        amtVal = 1
    }

    const URL = `${base_URL}/${fromcurr.value.toLowerCase()}.json`
    try {
    const resposne = await fetch(URL)
    const data = await resposne.json()
    console.log(data)
    const rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    let finalAmount = (amtVal * rate).toFixed(2)
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
    } catch{
        console.error("Error fetching exchange rate:", error);
        alert("Failed to fetch exchange rate. Try again later.");
    }
}    

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate()
});

window.onload("load", () => {
    updateExchangeRate();
})