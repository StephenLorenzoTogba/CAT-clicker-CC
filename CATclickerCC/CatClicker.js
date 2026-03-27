let Cats = document.querySelector('.Cats-cost')
let workercatCost = document.querySelector('.clicker-cost')
let cpsDisplay = document.querySelector('.cps-display')
let critChance = 0.1; // 10%
let critMultiplier = 2;
let mouseCostEl = document.querySelector(".mouse-cost")
let mouseLevelEl = document.querySelector(".mouse-level")

let mouseCost = parseFloat(mouseCostEl.innerHTML)
let mouseLevel = 0

let mouseChance = 0 // start 0%

// PASSIVE CAT (NY)
let passiveCatCost = document.querySelector('.cat-cost')
let passiveLevel = document.querySelector('.cat-level')
let passiveIncrease = document.querySelector('.cat-increase')

let parsedCats = parseFloat(Cats.innerHTML)

let clickerlevel = document.querySelector('.clicker-level')
let clickerIncrease = document.querySelector('.clicker-increase')

let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML)

// PASSIVE VALUES
let parsedPassiveIncrease = parseFloat(passiveIncrease.innerHTML)

let gpc = 1
let cps = 0   // 👈 passive income per second


// ===== CLICK =====
function incrementCats() {
    Cats.innerHTML = Math.round(parsedCats += gpc)
}


// ===== WORKER CAT =====
function buyWorkerCat() {
    let parsedWorkerCatCost = parseFloat(workercatCost.innerHTML)

    if (parsedCats >= parsedWorkerCatCost) {
        parsedCats -= parsedWorkerCatCost
        Cats.innerHTML = Math.round(parsedCats)

        // level
        let currentLevel = parseFloat(clickerlevel.innerHTML)
        currentLevel += 1
        clickerlevel.innerHTML = currentLevel

        // increase
        parsedClickerIncrease *= 1.03
        clickerIncrease.innerHTML = parsedClickerIncrease.toFixed(2)

        // gpc
        gpc += parsedClickerIncrease

        // cost increase
        workercatCost.innerHTML = Math.floor(parsedWorkerCatCost * 1.15)
    }
}


// ===== PASSIVE CAT (NY) =====
function buyPassiveCat() {
    let cost = parseFloat(passiveCatCost.innerHTML)

    if (parsedCats >= cost) {
        parsedCats -= cost
        Cats.innerHTML = Math.round(parsedCats)

        // level
        let level = parseFloat(passiveLevel.innerHTML)
        level += 1
        passiveLevel.innerHTML = level

        // increase
        parsedPassiveIncrease *= 1.05
        passiveIncrease.innerHTML = parsedPassiveIncrease.toFixed(2)

        // cps (cats per second)
        cps += parsedPassiveIncrease

        // cost increase
        passiveCatCost.innerHTML = Math.floor(cost * 1.2)
    }
}


// ===== PASSIVE LOOP =====
setInterval(() => {
    parsedCats += cps
    Cats.innerHTML = Math.round(parsedCats)
}, 1000)


// =====  cps =====
cpsDisplay.innerHTML = cps.toFixed(2)
setInterval(() => {
    parsedCats += cps
    Cats.innerHTML = Math.round(parsedCats)

    cpsDisplay.innerHTML = cps.toFixed(2)
}, 1000)



let clickSound = new Audio("pop_7e9Is8L.mp3")

function incrementCats(el) {
    let isCrit = Math.random() < critChance

    let mouseBonus = 0
    if (Math.random() < mouseChance) {
        mouseBonus = gpc * 3
    }

    let gain = gpc + mouseBonus

    if (isCrit) gain = gain * critMultiplier

    parsedCats += gain
    Cats.innerHTML = Math.round(parsedCats)

    el.classList.remove("click-pop")
    void el.offsetWidth
    el.classList.add("click-pop")

    clickSound.currentTime = 0
    clickSound.play()

    createFloatingNumber(gain, el, isCrit)

    if (isCrit) screenShake()
}
function createFloatingNumber(amount, el, isCrit) {
    const float = document.createElement("div")
    float.className = "floating-number"

    float.innerText = isCrit
        ? "CRIT +" + Math.round(amount)
        : "+" + Math.round(amount)

    if (isCrit) {
        float.style.color = "orange"
        float.style.fontSize = "26px"
        float.style.textShadow = "0 0 10px yellow"
    }

    document.body.appendChild(float)

    const rect = el.getBoundingClientRect()

    float.style.left = (rect.left + rect.width / 2) + "px"
    float.style.top = (rect.top + rect.height / 2) + "px"
    float.style.transform = "translate(-50%, -50%)"

    setTimeout(() => float.remove(), 800)
}
console.log("floating spawned")
float.style.background = "red"


function screenShake() {
    const body = document.body

    body.classList.remove("screen-shake")
    void body.offsetWidth // reset animation
    body.classList.add("screen-shake")

    setTimeout(() => {
        body.classList.remove("screen-shake")
    }, 250)
}

function buyMouseHunter() {
    if (parsedCats >= mouseCost) {

        parsedCats -= mouseCost
        Cats.innerHTML = Math.round(parsedCats)

        mouseLevel++
        mouseLevelEl.innerHTML = mouseLevel

        mouseChance += 0.1 // +10% per level

        mouseCost *= 1.4
        mouseCostEl.innerHTML = Math.round(mouseCost)
    }
}

function spawnFlyingCat() {
    const cat = document.createElement("img")

    cat.src = "motion-cat-transparent.gif"
    cat.className = "flying-cat"

    document.body.appendChild(cat)

    let clicked = false

    cat.addEventListener("click", () => {
        if (clicked) return
        clicked = true

        let reward = gpc * 10

        parsedCats += reward
        Cats.innerHTML = Math.round(parsedCats)

        createFloatingNumber(reward, cat, false)

        cat.remove()
    })

    setTimeout(() => {
        cat.remove()
    }, 2000)
}

setInterval(() => {
    if (eventActive) {
        spawnFlyingCat()
    }
}, 1500)