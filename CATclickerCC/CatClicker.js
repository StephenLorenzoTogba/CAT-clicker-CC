// ===== ELEMENTS =====
let Cats = document.querySelector('.Cats-cost')
let cpsDisplay = document.querySelector('.cps-display')

// ===== BASE VALUES =====
let parsedCats = 0
let gpc = 1
let cps = 0

// ===== CRIT SYSTEM =====
let critChance = 0.1
let critMultiplier = 2

// ===== WORKER CAT =====
let workercatCost = document.querySelector('.clicker-cost')
let clickerlevel = document.querySelector('.clicker-level')
let clickerIncrease = document.querySelector('.clicker-increase')

let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML)

// ===== PASSIVE CAT =====
let passiveCatCost = document.querySelector('.cat-cost')
let passiveLevel = document.querySelector('.cat-level')
let passiveIncrease = document.querySelector('.cat-increase')

let parsedPassiveIncrease = parseFloat(passiveIncrease.innerHTML)

// ===== MOUSE HUNTER =====
let mouseCostEl = document.querySelector(".mouse-cost")
let mouseLevelEl = document.querySelector(".mouse-level")

let mouseCost = parseFloat(mouseCostEl.innerHTML)
let mouseLevel = 0
let mouseChance = 0

// ===== KING CAT =====
let kingCostEl = document.querySelector(".king-cost")
let kingLevelEl = document.querySelector(".king-level")

let kingCost = 500
let kingLevel = 0

// ===== GALAXY CAT =====
let galaxyCostEl = document.querySelector(".galaxy-cost")
let galaxyLevelEl = document.querySelector(".galaxy-level")

let galaxyCost = 2000
let galaxyLevel = 0

// ===== CLICK SOUND =====
let clickSound = new Audio("pop_7e9Is8L.mp3")

// ===== CLICK =====
function incrementCats(el) {
    let isCrit = Math.random() < critChance

    let mouseBonus = 0
    if (Math.random() < mouseChance) {
        mouseBonus = gpc * 3
    }

    let gain = gpc + mouseBonus

    if (isCrit) gain *= critMultiplier

    parsedCats += gain
    updateDisplay()

    // animation
    el.classList.remove("click-pop")
    void el.offsetWidth
    el.classList.add("click-pop")

    // sound
    clickSound.currentTime = 0
    clickSound.play()

    createFloatingNumber(gain, el, isCrit)

    if (isCrit) screenShake()
}

// ===== UPDATE DISPLAY =====
function updateDisplay() {
    Cats.innerHTML = Math.round(parsedCats)
    cpsDisplay.innerHTML = cps.toFixed(2)
}

// ===== FLOATING TEXT =====
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

// ===== SCREEN SHAKE =====
function screenShake() {
    const body = document.body

    body.classList.remove("screen-shake")
    void body.offsetWidth
    body.classList.add("screen-shake")

    setTimeout(() => {
        body.classList.remove("screen-shake")
    }, 250)
}

// ===== WORKER CAT =====
function buyWorkerCat() {
    let cost = parseFloat(workercatCost.innerHTML)

    if (parsedCats >= cost) {
        parsedCats -= cost

        let level = parseFloat(clickerlevel.innerHTML) + 1
        clickerlevel.innerHTML = level

        parsedClickerIncrease *= 1.03
        clickerIncrease.innerHTML = parsedClickerIncrease.toFixed(2)

        gpc += parsedClickerIncrease

        workercatCost.innerHTML = Math.floor(cost * 1.15)

        updateDisplay()
    }
}

// ===== PASSIVE CAT =====
function buyPassiveCat() {
    let cost = parseFloat(passiveCatCost.innerHTML)

    if (parsedCats >= cost) {
        parsedCats -= cost

        let level = parseFloat(passiveLevel.innerHTML) + 1
        passiveLevel.innerHTML = level

        parsedPassiveIncrease *= 1.05
        passiveIncrease.innerHTML = parsedPassiveIncrease.toFixed(2)

        cps += parsedPassiveIncrease

        passiveCatCost.innerHTML = Math.floor(cost * 1.2)

        updateDisplay()
    }
}

// ===== MOUSE HUNTER =====
function buyMouseHunter() {
    if (parsedCats >= mouseCost) {
        parsedCats -= mouseCost

        mouseLevel++
        mouseLevelEl.innerHTML = mouseLevel

        mouseChance += 0.1

        mouseCost *= 1.4
        mouseCostEl.innerHTML = Math.round(mouseCost)

        updateDisplay()
    }
}

// ===== KING CAT =====
function buyKingCat() {
    if (parsedCats >= kingCost) {
        parsedCats -= kingCost

        kingLevel++
        kingLevelEl.innerHTML = kingLevel

        cps += 10

        kingCost *= 1.5
        kingCostEl.innerHTML = Math.round(kingCost)

        updateDisplay()
    }
}

// ===== GALAXY CAT =====
function buyGalaxyCat() {
    if (parsedCats >= galaxyCost) {
        parsedCats -= galaxyCost

        galaxyLevel++
        galaxyLevelEl.innerHTML = galaxyLevel

        cps += 50

        galaxyCost *= 1.6
        galaxyCostEl.innerHTML = Math.round(galaxyCost)

        updateDisplay()
    }
}

// ===== PASSIVE LOOP =====
setInterval(() => {
    parsedCats += cps
    updateDisplay()
}, 1000)

const music = document.getElementById("bg-music")

const playlist = [
    "Wii Shop Channel Main Theme (HQ) - Rhythm Root.mp3",
    "Big Brain Academy - Registration - LILjohno.mp3"
]

let currentTrack = -1

function playRandomMusic() {
    let newTrack

    do {
        newTrack = Math.floor(Math.random() * playlist.length)
    } while (newTrack === currentTrack && playlist.length > 1)

    currentTrack = newTrack

    music.src = playlist[currentTrack]
    music.play()
}

// when song ends → next random song
music.addEventListener("ended", () => {
    playRandomMusic()
})

// start on first click
document.body.addEventListener("click", () => {
    playRandomMusic()
}, { once: true })

music.volume = 0.3


// ===== GOLDEN CAT SPAWN =====
function spawnGoldenCat() {
    const cat = document.createElement("img")

    cat.src = "Tabby cat with angelic wings.png" // make sure file exists
    cat.classList.add("golden-cat")

    document.body.appendChild(cat)

    // random height
    cat.style.position = "absolute"
    cat.style.top = Math.random() * (window.innerHeight - 100) + "px"

    let position = -150
    cat.style.left = position + "px"

    let speed = 6 + Math.random() * 5

    let move = setInterval(() => {
        position += speed
        cat.style.left = position + "px"

        if (position > window.innerWidth) {
            cat.remove()
            clearInterval(move)
        }
    }, 16)

    // CLICK REWARD
    cat.onclick = () => {
        parsedCats += 500
        updateDisplay()

        cat.remove()
        clearInterval(move)

        console.log("Golden Cat clicked!")
    }

    console.log("Golden Cat spawned!")
}


startGoldenCatEvent()