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

    const urlPicture1 = toSnakeCase("./" + dropDownName1) + ".png";
    const urlPicture2 = toSnakeCase("./" + dropDownName2) + ".png";
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
        const textBoxPos = document.createElement("div");
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.classList.add("hidden");
        const messageText = document.createElement("span");
        character.setTextMessage(messageText);

        character.setTextMessage(messageText);

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
        questionsHeader.innerText = `Ask about\n ${otherChar.name}'s`;

        //buttonGroup
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("question-container");

        const buttonAskWeight = document.createElement("input");
        buttonAskWeight.setAttribute("type", "button");
        buttonAskWeight.setAttribute("value", "Weight");
        buttonAskWeight.classList.add("question-button");
        buttonAskWeight.addEventListener("click", ()=>{
            const weightDiff = character.weightCompare(otherChar);
            let text = `I weight ${otherChar.mass} kg and is `;
            text += otherChar.weightsMore(character) ?
            `${weightDiff} kg heavier than ${character.name}.` :
            `${weightDiff} kg lighter than ${character.name}.`
            otherChar.message(text);
        });
        
        const buttonAskHeight = document.createElement("input");
        buttonAskHeight.setAttribute("type", "button");
        buttonAskHeight.setAttribute("value", "Height");
        buttonAskHeight.classList.add("question-button");
        buttonAskHeight.addEventListener("click", ()=>{
            const heightDiff = character.heightCompare(otherChar);
            let text = `I am ${otherChar.height} cm long and is `;
            text += otherChar.tallerThan(character) ?
            `${heightDiff} cm taller than ${character.name}.` :
            `${heightDiff} cm shorter than ${character.name}.`;
            otherChar.message(text);
        });
        
        const buttonAskHairColor = document.createElement("input");
        buttonAskHairColor.setAttribute("type", "button");
        buttonAskHairColor.setAttribute("value", "Hair Color");
        buttonAskHairColor.classList.add("question-button");
        buttonAskHairColor.addEventListener("click", ()=>{
            let text = otherChar.hairColor == "n/a" || otherChar.hairColor == "none" ? "I have no hair" : `I have ${otherChar.hairColor} hair color`;
            if(character.isSameHairColor(otherChar) && otherChar.hairColor !=="none" && otherChar.hairColor !=="n/a"){
                text += ` and have the same hair color as ${character.name}`;
            }
            text += ".";
            otherChar.message(text);
        })
        
        const buttonAskGender = document.createElement("input");
        buttonAskGender.setAttribute("type", "button");
        buttonAskGender.setAttribute("value", "Gender");
        buttonAskGender.classList.add("question-button");
        buttonAskGender.addEventListener("click", ()=>{
            let text = otherChar.gender == "n/a" ? "I have no gender" : `I am ${otherChar.gender}`;
            if(character.isSameGender(otherChar) && otherChar.gender !== "n/a"){
                text += ` and so is ${character.name}`;
            }
            text += ".";
            otherChar.message(text);
        })

        /*
        <div selectedCharacterContainer
            div charactersRow
                characterContainer
                    div textBoxPos
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

        characterContainer.appendChild(textBoxPos);
            textBoxPos.appendChild(textBox);
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

    setFetchbutton(false,"GET DATA");
})

function toSnakeCase(name){
    return name.toLowerCase().split(" ").join("_");
}

function setFetchbutton(bool, text){
    fetchButton.disabled = bool;
    fetchButton.value = text;
}
