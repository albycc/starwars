import { Character } from "../js/character.js";

const charOneDropdown = document.getElementById("char1-dropdown");
const charTwoDropdown = document.getElementById("char2-dropdown");

const selectedCharacterContainer = document.getElementById("selected-character-container");

let char1;
let char2;

const apiURL = "https://swapi.dev/api/people";

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

function populateDropdown(dropdown, item){
    const option = document.createElement("option");
    option.value = option.textContent = item.name;
    dropdown.add(option);
}

getCharacterNames();

document.getElementById("fetch-characters").addEventListener("click", async ()=>{
    const urlPicture1 = toSnakeCase(charOneDropdown.options[charOneDropdown.selectedIndex].value) + ".jpg";
    const urlPicture2 = toSnakeCase(charTwoDropdown.options[charTwoDropdown.selectedIndex].value) + ".jpg";
    const char1Data = await fetchData(`${apiURL}/${(charOneDropdown.selectedIndex + 1)}`);
    const char2Data = await fetchData(`${apiURL}/${(charTwoDropdown.selectedIndex + 1)}`);

    char1 = new Character(char1Data.name, char1Data.gender, char1Data.height, char1Data.mass, char1Data.hair_color, urlPicture1);
    char2 = new Character(char2Data.name, char2Data.gender, char2Data.height, char2Data.mass, char2Data.hair_color, urlPicture2);

    selectedCharacterContainer.innerHTML = "";

    selectedCharacterContainer.innerHTML += `
        <div class="flex-row">
            <div class="character-box">
                <img src="../img/${char1.pictureUrl}">
                <h2>${char1.name}</h2>
                <div class="text-box" id="text-box">

                </div>

            </div>

        </div>
        <div class="flex-row">
            <input type="button" id="tell-me-btn" value="Tell me what you know about ${char2.name}"> 
        </div>
    `;

    document.getElementById("tell-me-btn").addEventListener("click", ()=>{
        const name1 = char1.name;
        const name2 = char2.name;

        const weightDiff = char2.mass - char1.mass
        const weightMsg = weightDiff > 0 ? 
            `${name2} weights ${weightDiff} more than ${name1}` :
            `${name2} weights ${weightDiff} less than ${name1}`;

        const heightDiff = char2.height - char1.height;
        const heightMsg = heightDiff > 0 ?
            `${name2} is ${heightDiff} taller than ${name1}` :
            `${name2} is ${heightDiff} shorter than ${name1}`;


        const hairMsg = char2.hairColor === char1.hairColor ? 
            `${name2} has the same hair color` :
            "";
        const genderMsg = char2.gender === char1.gender ?
            `${name2} has the same gender` :
            "";
        document.getElementById("text-box").innerHTML += `
            <p>${name2}'s weight: ${char2.mass}</p>
            <p>${weightMsg}</p>
            <p>${name2}'s height: ${char2.height}</p>
            <p>${heightMsg}</p>
            <p>${genderMsg}</p>
            <p>${hairMsg}</p>
        `;
    })
})

function toSnakeCase(name){
    return name.toLowerCase().split(" ").join("_");
}