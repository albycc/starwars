import { Character } from "../js/character.js";

const charOneDropdown = document.getElementById("char1-dropdown");
const charTwoDropdown = document.getElementById("char2-dropdown");
const fetchButton = document.getElementById("fetch-characters");

const selectedCharacterContainer = document.getElementById("selected-character-container");

//character objects
let char1;
let char2;

//text boxes for each character
let char1MessageText;
let char2MessageText;

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
    try{
        const response = await axios.get(url);
        return response.data;
    }
    catch(error){
        alert("error: " + error);
    }
}

fetchButton.addEventListener("click", async ()=>{

    const dropDownName1 = charOneDropdown.options[charOneDropdown.selectedIndex].value;
    const dropDownName2 = charTwoDropdown.options[charTwoDropdown.selectedIndex].value;

    if(dropDownName1 === dropDownName2){
        alert("Choose different characters.");
        return;
    }

    setFetchbutton(true,"WORKING...");

    selectedCharacterContainer.innerHTML = "";

    const charOneSnakeName = toSnakeCase(dropDownName1);
    const charTwoSnakeName = toSnakeCase(dropDownName2);
    const char1Data = await fetchData(`${apiURL}/${(charOneDropdown.selectedIndex + 1)}`);
    const char2Data = await fetchData(`${apiURL}/${(charTwoDropdown.selectedIndex + 1)}`);

    char1 = new Character(char1Data.name, char1Data.gender, char1Data.height, char1Data.mass, char1Data.hair_color, charOneSnakeName + ".png");
    char2 = new Character(char2Data.name, char2Data.gender, char2Data.height, char2Data.mass, char2Data.hair_color, charTwoSnakeName + ".png");

    const charactersRow = document.createElement("div");
    charactersRow.className = "flex-row";
    let flipOrder = false;

    const characterContainer = (character, otherChar) =>{
        const charNameCase = toSnakeCase(character.name);

        const characterDOMString = `
            <div class="character-container ${flipOrder ? "flex-reverse" : ""}">
                <div>
                    <div class="text-box hidden">
                        <span id="message-${charNameCase}"></span>
                    </div>
                </div>
                <div class="flex-column center">
                    <div>
                        <div class="image-container">
                            <img src="../img/${character.pictureUrl}" alt="${character.name}">
                        </div>
                        <h2>${character.name}</h2>
                    </div>
                    <div class="flex-column container-frame">
                        <h3>Ask about ${otherChar.name}'s</h3>
                        <div class="question-container">
                            <input type="button" value="Weight" id="weight-${charNameCase}" class="question-button">
                            <input type="button" value="Height" id="height-${charNameCase}" class="question-button">
                            <input type="button" value="Hair Color" id="hair-${charNameCase}" class="question-button">
                            <input type="button" value="Gender" id="gender-${charNameCase}" class="question-button">
                        </div>
                    </div>
                </div>
            </div>
        `;

        flipOrder = !flipOrder;

        return characterDOMString;
    }

    charactersRow.innerHTML += characterContainer(char1, char2);
    charactersRow.innerHTML += characterContainer(char2, char1);
    selectedCharacterContainer.appendChild(charactersRow);

    char1MessageText = document.getElementById(`message-${charOneSnakeName}`);
    char2MessageText = document.getElementById(`message-${charTwoSnakeName}`);

    function addCharacterDomEvents(char, otherChar, textMessage){
        const charNameCase = toSnakeCase(char.name);

        const weightButton = document.getElementById(`weight-${charNameCase}`);
        const heightButton = document.getElementById(`height-${charNameCase}`);
        const hairButton = document.getElementById(`hair-${charNameCase}`);
        const genderButton = document.getElementById(`gender-${charNameCase}`);

        weightButton.addEventListener("click", ()=>{
            const weightDiff = char.weightCompare(otherChar);
            let text = `I weight ${otherChar.mass} kg and is `;
            text += otherChar.weightsMore(char) ?
            `${weightDiff} kg heavier than ${char.name}.` :
            `${weightDiff} kg lighter than ${char.name}.`

            setMessage(textMessage, text);
        });

        heightButton.addEventListener("click", ()=>{
            const heightDiff = char.heightCompare(otherChar);
            let text = `I am ${otherChar.height} cm long and is `;
            text += otherChar.tallerThan(char) ?
            `${heightDiff} cm taller than ${char.name}.` :
            `${heightDiff} cm shorter than ${char.name}.`;

            setMessage(textMessage, text);
        });

        hairButton.addEventListener("click", ()=>{
            let text = otherChar.hairColor == "n/a" || otherChar.hairColor == "none" ? 
                "I have no hair" : 
                `I have ${otherChar.hairColor} hair color`;

            if(char.isSameHairColor(otherChar) && otherChar.hairColor !=="none" && otherChar.hairColor !=="n/a"){
                text += ` and have the same hair color as ${char.name}`;
            }
            text += ".";
            setMessage(textMessage, text);
        })

        genderButton.addEventListener("click", ()=>{
            let text = otherChar.gender == "n/a" ? "I have no gender" : `I am ${otherChar.gender}`;
            if(char.isSameGender(otherChar) && otherChar.gender !== "n/a"){
                text += ` and so is ${char.name}`;
            }
            text += ".";
            setMessage(textMessage, text);
        })
    }

    addCharacterDomEvents(char1, char2, char2MessageText);
    addCharacterDomEvents(char2, char1, char1MessageText);

    setFetchbutton(false,"GET DATA");
})

function toSnakeCase(name){
    return name.toLowerCase().split(" ").join("_");
}

function setFetchbutton(bool, text){
    fetchButton.disabled = bool;
    fetchButton.value = text;
}

function setMessage(element, text){
    if(element.parentElement.classList.contains("hidden")){
        element.parentElement.classList.remove("hidden");
    }
    element.innerText = text;
}
