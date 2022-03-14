import { Character } from "../js/character.js";

const charOneDropdown = document.getElementById("char1-dropdown");
const charTwoDropdown = document.getElementById("char2-dropdown");

const selectedCharacterContainer = document.getElementById("selected-character-container");

let char1;
let char2;

const apiURL = "https://swapi.dev/api/people";

const characterList = [
    "Luke Skywalker",
    "C-3PO",
    "R2-D2",
    "Darth Vader",
    "Leia Organa",
    "Owen Lars",
    "Beru Whitesun lars",
    "R5-D4",
    "Biggs Darklighter",
    "Obi-Wan Kenobi"
];
function populateDropdown(dropdown, item){
    const option = document.createElement("option");
    option.value = option.textContent = item;
    dropdown.add(option);
}

(function(){
    characterList.forEach(char =>{
        populateDropdown(charOneDropdown, char);
        populateDropdown(charTwoDropdown, char);
    })
})();

async function fetchData(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function getCharacterNames(){
    const starWarsList = await fetchData(apiURL);
    starWarsList.results.forEach(char =>{
        populateDropdown(charOneDropdown, char);
        populateDropdown(charTwoDropdown, char);
    })
}

// getCharacterNames();

document.getElementById("fetch-characters").addEventListener("click", async ()=>{
    const urlPicture1 = toSnakeCase(charOneDropdown.options[charOneDropdown.selectedIndex].value) + ".png";
    const urlPicture2 = toSnakeCase(charTwoDropdown.options[charTwoDropdown.selectedIndex].value) + ".png";
    const char1Data = await fetchData(`${apiURL}/${(charOneDropdown.selectedIndex + 1)}`);
    const char2Data = await fetchData(`${apiURL}/${(charTwoDropdown.selectedIndex + 1)}`);

    char1 = new Character(char1Data.name, char1Data.gender, char1Data.height, char1Data.mass, char1Data.hair_color, urlPicture1);
    char2 = new Character(char2Data.name, char2Data.gender, char2Data.height, char2Data.mass, char2Data.hair_color, urlPicture2);

    selectedCharacterContainer.innerHTML = "";

    const charactersRow = document.createElement("div");
    charactersRow.className = "flex-row";

    const characterContainer = (character, otherChar) =>{
        const characterContainer = document.createElement("div");
        characterContainer.className = "character-box";
        characterContainer.innerHTML += `
            <div>
                <img src="../img/${character.pictureUrl}">
                <h2>${character.name}</h2>
            </div>
        `;

        //  Textbox
        const textBox = document.createElement("div");
        textBox.className = "text-box";

        const messageText = document.createElement("span");
        textBox.appendChild(messageText);

        characterContainer.appendChild(textBox);

        //  Questions group
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "flex-column";

        const questionsHeader = document.createElement("h2");
        questionsHeader.textContent = `Ask about ${otherChar.name}`

        const buttonAskWeight = document.createElement("input");
        buttonAskWeight.setAttribute("type", "button");
        buttonAskWeight.setAttribute("value", "Weight");
        buttonAskWeight.addEventListener("click", ()=>{
            const weightDiff = character.weightCompare(otherChar);
            messageText.textContent = character.weightsMore(otherChar) ?
                `I weight ${weightDiff} kg more than ${otherChar.name}.` :
                `I weight ${weightDiff} kg less than ${otherChar.name}.`
        });

        const buttonAskHeight = document.createElement("input");
        buttonAskHeight.setAttribute("type", "button");
        buttonAskHeight.setAttribute("value", "Height");
        buttonAskHeight.addEventListener("click", ()=>{
            const heightDiff = character.heightCompare(otherChar);
            messageText.textContent = character.tallerThan(otherChar) ?
                `I am ${heightDiff} cm taller than ${otherChar.name}.` :
                `I am ${heightDiff} cm shorter than ${otherChar.name}.`;
        });

        const buttonAskHairColor = document.createElement("input");
        buttonAskHairColor.setAttribute("type", "button");
        buttonAskHairColor.setAttribute("value", "Hair Color");
        buttonAskHairColor.addEventListener("click", ()=>{
            messageText.textContent = character.isSameHairColor(otherChar) ?
                `I share the same hair color as ${otherChar.name}.` :
                `we do not have the same hair color.`;
        })
        
        const buttonAskGender = document.createElement("input");
        buttonAskGender.setAttribute("type", "button");
        buttonAskGender.setAttribute("value", "Gender");
        buttonAskGender.addEventListener("click", ()=>{
            messageText.textContent = character.isSameGender(otherChar) ?
                `We are both ${character.gender}.` :
                `We do not share gender.`
        })

        buttonGroup.appendChild(questionsHeader);
        buttonGroup.appendChild(buttonAskWeight);
        buttonGroup.appendChild(buttonAskHeight);
        buttonGroup.appendChild(buttonAskHairColor);
        buttonGroup.appendChild(buttonAskGender);
        characterContainer.appendChild(buttonGroup);
        return characterContainer;
    }

    charactersRow.appendChild(characterContainer(char1, char2));
    charactersRow.appendChild(characterContainer(char2, char1));
    selectedCharacterContainer.appendChild(charactersRow);
})

function toSnakeCase(name){
    return name.toLowerCase().split(" ").join("_");
}