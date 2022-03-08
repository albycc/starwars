import { Character } from "../js/character.js";

const charOneDropdown = document.getElementById("char1-dropdown");
const charTwoDropdown = document.getElementById("char2-dropdown");

async function fetchData(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function getCharacterNames(){
    const starWarsList = await fetchData("https://swapi.dev/api/people");
    starWarsList.results.forEach(char =>{
        populateDropdown(charOneDropdown, char)
        populateDropdown(charTwoDropdown, char)
    })
}

function populateDropdown(dropdown, item){
    const option = document.createElement("option");
    option.value = option.textContent = item.name;
    dropdown.add(option);
}

getCharacterNames();

document.getElementById("fetch-characters").addEventListener("click", ()=>{

})