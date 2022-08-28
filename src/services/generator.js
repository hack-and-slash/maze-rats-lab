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

    nd6(numRolls) {
        const rolls = []
        for (let index = 0; index < numRolls; index++) {
            rolls.push(this.d6())
        }
        return (numRolls>0 ? rolls.reduce((partialSum, a) => partialSum + a, 0) :0)
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

    background(status) {
        return Data[this.lang].background[status][this.d6()][this.d6()]
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

    assets() {
        return Data[this.lang].assets[this.d6()][this.d6()]
    }

    liabilities() {
        return Data[this.lang].liabilities[this.d6()][this.d6()]
    }

    goals(){
        let goals = {}
        goals.value = Data[this.lang].goals[this.d6()][this.d6()]
        if(goals.value.includes("faction") ) {
            goals.faction = this.factions()
        } else if(goals.value.includes("item")){
            goals.item = this.item()
        } else if(goals.value.includes("NPC")){
            goals.npc = this.npc()
        }

        return goals
    }

    misfortunes() {
        return Data[this.lang].misfortunes[this.d6()][this.d6()]
    }

    missions() {
        return Data[this.lang].misfortunes[this.d6()][this.d6()]
    }

    secrets() {
        let secret = {}
        secret.name = Data[this.lang].secrets[this.d6()][this.d6()] 
        if(secret.name.includes('NPC')){
            secret.npc = this.npc()
        } else if(secret.name.includes('Misfortune')){
            secret.misfortune = this.misfortunes()
        }
        return secret
    }

    reputations() {
        return Data[this.lang].reputations[this.d6()][this.d6()]
    }

    hobbies() {
        return Data[this.lang].hobbies[this.d6()][this.d6()]
    }

    factions() {
        let faction = {};
        faction.type = Data[this.lang].factions[this.d6()][this.d6()]
        faction.trait = Data[this.lang].factions.traits[this.d6()][this.d6()]
        faction.goal = Data[this.lang].factions.goals[this.d6()][this.d6()]
        if(faction.goal.includes("faction")){ //:TODO check for language
            faction.goal.faction = this.factions()
        }
        if(faction.goal.includes("monster")){
            faction.goal.faction = this.monsters()
        }
        return faction
    }

    armorDescription(value){
        return Data[this.lang].monsters.armor[value]
    }

    attackBonus(){
        const roll  = this.diceRoll(5)
        const desc = Data[this.lang].monsters.attack[roll]
        return {bonus: roll, description: desc}
    }

    methods(){
        return Data[this.lang].methods[this.d6()][this.d6()]
    }

    insanities(){
        return Data[this.lang].insanities[this.d6()][this.d6()]
    }

    valMaterials(){
        return Data[this.lang].treasure.valMaterials[this.d6()][this.d6()]
    }

    monsterStat(type){
        const roll = this.diceRoll(5)
        return {value:roll, description: Data[this.lang].monsters.statDesc[type.toUpperCase()][roll]}
    }
    
    monsterType(base){
        return Data[this.lang].monsters.types[base][this.d6()][this.d6()]
    }

    monsterFeature(){
        return Data[this.lang].monsters.feature[this.d6()][this.d6()]
    }

    monsterTrait(){
        let trait = Data[this.lang].monsters.traits[this.d6()][this.d6()]
        trait = (trait.includes("EtherealElements"))? this.monsterElement("etherealElement")+"-like":trait
        trait = (trait.includes("PhysicalElement"))? this.monsterElement("physicalElement")+"-like":trait

        return trait
    }

    monsterAbility(){
        let ability = Data[this.lang].monsters.abilities[this.d6()][this.d6()]
        ability = (ability.includes("EtherealEffect"))? this.monsterElement("etherealEffect"):ability
        ability = (ability.includes("PhysicalEffect"))? this.monsterElement("physicalEffect"):ability
        
        return ability
    }

    monsterTactics(){
        return Data[this.lang].monsters.tactics[this.d6()][this.d6()]
    }

    monsterPersonality(){
        return Data[this.lang].monsters.personality[this.d6()][this.d6()]
    }

    monsterWeakness(){
        let weakness = Data[this.lang].monsters.weakness[this.d6()][this.d6()]
        weakness = (weakness.includes("PhysicalElement"))? this.monsterElement("physicalElement"):weakness
        weakness = (weakness.includes("Weapon Items"))? this.weapons():weakness
        weakness = (weakness.includes("Methods"))? this.methods():weakness
        weakness = (weakness.includes("Insanities"))? this.insanities():weakness
        weakness = (weakness.includes("Val. Materials"))? this.valMaterials():weakness
        
        return weakness
    }

    monsterElement(component){
        return Data[this.lang].spellComponent[component][this.d6()][this.d6()]
    }

    formatLists(){
        const fruits  =[
            "Alchemy","Blackmail","Bluster","Bribery","Bullying","Bureaucracy",
            "Charm","Commerce","Cronies","Debate","Deceit","Deduction",
            "Eloquence","Espionage","Fast-talking","FAvors","Hard work","Humor",
            "Investigation","Legal maneuvers","Manipulation","Misdirection","Money","Nagging",
            "Negotiations","Persistence","Piety","Preparation","Quick wit","Research",
            "Rumors","Sabotage","Teamwork","Theft","Threats","Violence"
        ]
        
        const values = fruits.sort()
        let outerIdx = 1;
        let idx = 0;
        let jsonVal = '{'
            values.forEach(v => {
                idx++;
                if(idx===1) jsonVal = jsonVal.concat("\n").concat('"' + outerIdx).concat('": {')
                console.log('"' +idx+'":"' + v + '"')
                jsonVal = jsonVal.concat('"' +idx+'":"' + v + '"')
                if(idx===6) {
                    idx = 0;
                    if(outerIdx===6)
                        jsonVal = jsonVal.concat("}")
                    else
                        jsonVal = jsonVal.concat("},") 

                    outerIdx++;
                }else{
                    jsonVal = jsonVal.concat(",")
                };
                
            });
        console.log(jsonVal  + "}")
    }

    monsters() {
        this.formatLists()
        const hitDie = this.d6()
        const armorDie = this.diceRoll(5)+5
        const monsterBase = {1: "Aerial", 2:"Terrestrial", 3:"Aquatic"}[this.diceRoll(3)]
        let monster = {
            hitdie : hitDie,
            health : this.nd6(hitDie),
            base : monsterBase,
            type: this.monsterType(monsterBase),
            feature: this.monsterFeature(),
            trait: this.monsterTrait(),
            ability: this.monsterAbility(),
            tactics: this.monsterTactics(),
            personality: this.monsterPersonality(),
            weakness: this.monsterWeakness(),
            armor : {
                    armor:  armorDie, 
                    description : this.armorDescription(armorDie)
            },
            attackBonus: this.attackBonus(),
            STR: this.monsterStat("STR"),
            DEX: this.monsterStat("DEX"),
            WIL: this.monsterStat("WIL"),

        }
        
        return monster
    }

    character() {
        const social = {
            1: "Civilized",
            2: "Underworld",
            3: "Wilderness"
        }[this.diceRoll(3)]

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
            background: this.background(social),
            clothing: this.clothing(),
            personality: this.personality(),
            mannerism: this.mannerism()
        }

        if ("1 spell slot" === char.feature || "Uma magia diária" === char.feature) {
            char.spells = [this.spell()]
        }

        return char
    }

    npc() {
        const area = {
            1: "Civilized",
            2: "Underworld",
            3: "Wilderness"
        }[this.diceRoll(3)]

        const origins = {
            1: "highborn",
            2: "lowborn"
        }[this.diceRoll(2)]

        const gender = this.gender()
        let npc = {
            name: this.fullname(gender, origins),
            gender: gender,
            area : area,
            background : this.background(area),
            assets : this.assets(),
            liabilities : this.liabilities(),
            goals  : this.goals(),
            misfortunes : this.misfortunes(),
            methods: this.methods(),
            appearance: this.appearance(),
            physicalDetail: this.physicalDetail(),
            clothing: this.clothing(),
            personality: this.personality(),
            mannerism: this.mannerism(),
            secret: this.secrets(),
            reputation: this.reputations(),
            hobbies: this.hobbies(),
            
        } 

        return npc
    }
}

export default Generator