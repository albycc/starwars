import { Character } from "../js/character.js";

const charOneDropdown = document.getElementById("char1-dropdown");
const charTwoDropdown = document.getElementById("char2-dropdown");
const fetchButton = document.getElementById("fetch-characters");

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

fetchButton.addEventListener("click", async ()=>{

    fetchButton.disabled = true;
    fetchButton.value = "WORKING..."

    selectedCharacterContainer.innerHTML = "";

    const urlPicture1 = toSnakeCase(charOneDropdown.options[charOneDropdown.selectedIndex].value) + ".png";
    const urlPicture2 = toSnakeCase(charTwoDropdown.options[charTwoDropdown.selectedIndex].value) + ".png";
    const char1Data = await fetchData(`${apiURL}/${(charOneDropdown.selectedIndex + 1)}`);
    const char2Data = await fetchData(`${apiURL}/${(charTwoDropdown.selectedIndex + 1)}`);

    char1 = new Character(char1Data.name, char1Data.gender, char1Data.height, char1Data.mass, char1Data.hair_color, urlPicture1);
    char2 = new Character(char2Data.name, char2Data.gender, char2Data.height, char2Data.mass, char2Data.hair_color, urlPicture2);


    // div with character containers
    const charactersRow = document.createElement("div");
    charactersRow.className = "flex-row";
    let flipOrder = false;

    const characterContainer = (character, otherChar) =>{
        const characterContainer = document.createElement("div");
        characterContainer.className = "character-container";

        if(flipOrder){
            characterContainer.classList.add("flex-reverse");
        }

        //textbox
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.classList.add("hidden");
        const messageText = document.createElement("span");

        // charDataColumn
        const charDataColumn = document.createElement("div");
        charDataColumn.classList.add("flex-column");
        charDataColumn.classList.add("center")

        // characterProfileGrp
        const characterProfileGrp = document.createElement("div");
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container")
        const img = document.createElement("img");
        img.setAttribute("src", `../img/${character.pictureUrl}`);
        const charHeader = document.createElement("h2");
        charHeader.textContent = character.name;

        flipOrder = !flipOrder;
        //  Questions group
        const questionGrp = document.createElement("div");
        questionGrp.classList.add("flex-column");
        questionGrp.classList.add("container-frame");

        const questionsHeader = document.createElement("h3");
        questionsHeader.innerText = `Ask about\n ${otherChar.name}`;

        //buttonGroup
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("question-container");

        const buttonAskWeight = document.createElement("input");
        buttonAskWeight.setAttribute("type", "button");
        buttonAskWeight.setAttribute("value", "Weight");
        buttonAskWeight.classList.add("question-button");
        buttonAskWeight.addEventListener("click", ()=>{
            textBox.classList.remove("hidden");
            const weightDiff = character.weightCompare(otherChar);
            messageText.textContent = character.weightsMore(otherChar) ?
            `I weight ${weightDiff} kg more than ${otherChar.name}.` :
            `I weight ${weightDiff} kg less than ${otherChar.name}.`
        });
        
        const buttonAskHeight = document.createElement("input");
        buttonAskHeight.setAttribute("type", "button");
        buttonAskHeight.setAttribute("value", "Height");
        buttonAskHeight.classList.add("question-button");
        buttonAskHeight.addEventListener("click", ()=>{
            textBox.classList.remove("hidden");
            const heightDiff = character.heightCompare(otherChar);
            messageText.textContent = character.tallerThan(otherChar) ?
            `I am ${heightDiff} cm taller than ${otherChar.name}.` :
            `I am ${heightDiff} cm shorter than ${otherChar.name}.`;
        });
        
        const buttonAskHairColor = document.createElement("input");
        buttonAskHairColor.setAttribute("type", "button");
        buttonAskHairColor.setAttribute("value", "Hair Color");
        buttonAskHairColor.classList.add("question-button");
        buttonAskHairColor.addEventListener("click", ()=>{
            textBox.classList.remove("hidden");
            messageText.textContent = character.isSameHairColor(otherChar) ?
            `I share the same hair color as ${otherChar.name}.` :
            `We do not have the same hair color.`;
        })
        
        const buttonAskGender = document.createElement("input");
        buttonAskGender.setAttribute("type", "button");
        buttonAskGender.setAttribute("value", "Gender");
        buttonAskGender.classList.add("question-button");
        buttonAskGender.addEventListener("click", ()=>{
            textBox.classList.remove("hidden");
            messageText.textContent = character.isSameGender(otherChar) ?
                `We are both ${character.gender}.` :
                `We do not share the same gender.`
        })

        /*
        <div selectedCharacterContainer
            div charactersRow
                characterContainer
                    div textBox
                        span messageText
                    div charDataColumn
                        div characterProfileGrp
                            div imgContainer
                                img
                            h2
                        div questionGrp
                            h2 questionsHeader
                            div buttonGroup
                                input buttonAskWeight
                                input buttonAskHeight
                                input buttonAskHairColor
                                input buttonAskGender
        */

       characterContainer.appendChild(textBox);
            textBox.appendChild(messageText);

       characterContainer.appendChild(charDataColumn);
            charDataColumn.appendChild(characterProfileGrp);
                characterProfileGrp.appendChild(imageContainer);
                    imageContainer.appendChild(img);
                characterProfileGrp.appendChild(charHeader)

            charDataColumn.appendChild(questionGrp)
                questionGrp.appendChild(questionsHeader);
                questionGrp.appendChild(buttonGroup);
                    buttonGroup.appendChild(buttonAskWeight);
                    buttonGroup.appendChild(buttonAskHeight);
                    buttonGroup.appendChild(buttonAskHairColor);
                    buttonGroup.appendChild(buttonAskGender);

       return characterContainer;
    }

    charactersRow.appendChild(characterContainer(char1, char2));
    charactersRow.appendChild(characterContainer(char2, char1));
    selectedCharacterContainer.appendChild(charactersRow);

    fetchButton.disabled = false;
    fetchButton.value = "GET DATA"
})

function toSnakeCase(name){
    return name.toLowerCase().split(" ").join("_");
}

