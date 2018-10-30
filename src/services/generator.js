import * as data from '../data/tables.json'
import Random from 'random-js'

class Generator {
    constructor(seed = null) {
        let rng = Random.engines.mt19937()
        null === seed ? rng.autoSeed() : rng.seed(seed)
        this.rng = rng
    }

    name(gender) {
        return data.names[gender][this.d6()][this.d6()]
    }

    surname(origins) {
        return data.surnames[origins][this.d6()][this.d6()]
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
        return data.abilities[this.d6()]
    }

    feature() {
        return data.features[this.d6()]
    }

    item() {
        return data.items[this.d6()][this.d6()]
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
        return data.weapons[this.diceRoll(13)]
    }

    weapons(n = 2) {
        return Array(n).fill().map(() => this.weapon())
    }

    appearance() {
        return data.appearance[this.d6()][this.d6()]
    }

    physicalDetail() {
        return data.physicalDetail[this.d6()][this.d6()]
    }

    background() {
        return data.background[this.d6()][this.d6()]
    }

    clothing() {
        return data.clothing[this.d6()][this.d6()]
    }

    personality() {
        return data.personality[this.d6()][this.d6()]
    }

    mannerism() {
        return data.mannerism[this.d6()][this.d6()]
    }

    spell() {
        return data.spellFormula[this.d6()][this.diceRoll(2)]
            .map((component) => data.spellComponent[component][this.d6()])
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