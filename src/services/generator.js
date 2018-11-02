import Data from '../data/index.js'
import Random from 'random-js'

class Generator {
    constructor(seed = null, lang = 'en') {
        let rng = Random.engines.mt19937()
        null === seed ? rng.autoSeed() : rng.seed(seed)
        this.rng = rng
        this.lang = lang
    }

    name(gender) {
        return Data[this.lang].names[gender][this.d6()][this.d6()]
    }

    surname(origins) {
        return Data[this.lang].surnames[origins][this.d6()][this.d6()]
    }

    fullname(gender, origin) {
        return [this.name(gender), this.surname(origin)].join(" ")
    }

    diceRoll(faces) {
        return Random.die(faces)(this.rng)
    }

    d6() {
        return this.diceRoll(6)
    }

    gender() {
        return {
            "1": "male",
            "2": "female"
        }[this.diceRoll(2)]
    }

    abilitySet() {
        return Data[this.lang].abilities[this.d6()]
    }

    feature() {
        return Data[this.lang].features[this.d6()]
    }

    item() {
        return Data[this.lang].items[this.d6()][this.d6()]
    }
    class
    items(n = 6) {
        return Array(n).fill().reduce((inventory, _) => {

            let newItem
            do {
                newItem = this.item()
            } while (inventory.includes(newItem))

            inventory.push(newItem)
            return inventory
        }, [])
    }

    weapon() {
        return Data[this.lang].weapons[this.diceRoll(13)]
    }

    weapons(n = 2) {
        return Array(n).fill().map(() => this.weapon())
    }

    appearance() {
        return Data[this.lang].appearance[this.d6()][this.d6()]
    }

    physicalDetail() {
        return Data[this.lang].physicalDetail[this.d6()][this.d6()]
    }

    background() {
        return Data[this.lang].background[this.d6()][this.d6()]
    }

    clothing() {
        return Data[this.lang].clothing[this.d6()][this.d6()]
    }

    personality() {
        return Data[this.lang].personality[this.d6()][this.d6()]
    }

    mannerism() {
        return Data[this.lang].mannerism[this.d6()][this.d6()]
    }

    spell() {
        return Data[this.lang].spellFormula[this.d6()][this.diceRoll(2)]
            .map((component) => Data[this.lang].spellComponent[component][this.d6()][this.d6()])
            .join(" ")
    }

    character() {
        const origins = {
            1: "highborn",
            2: "lowborn"
        }[this.diceRoll(2)]

        const gender = this.gender()
        let char = {
            name: this.fullname(gender, origins),
            gender: gender,
            abilities: this.abilitySet(),
            feature: this.feature(),
            items: this.items(),
            weapons: this.weapons(),
            appearance: this.appearance(),
            physicalDetail: this.physicalDetail(),
            background: this.background(),
            clothing: this.clothing(),
            personality: this.personality(),
            mannerism: this.mannerism()
        }

        if ("1 spell slot" === char.feature) {
            char.spells = [this.spell()]
        }

        return char
    }
}

export default Generator