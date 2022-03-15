export class Character{
<<<<<<< HEAD
    constructor(name, gender, height, mass, hairColor, pictureUrl=""){
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.pictureUrl = pictureUrl;
=======
    constructor(_name, _gender, _height, _mass, _hairColor, _pictureUrl=""){
        this.name = _name;
        this.gender = _gender;
        this.height = +(_height);   //convert string to int
        this.mass = +(_mass);   //convert string to int
        this.hairColor = _hairColor;
        this.pictureUrl = _pictureUrl;
>>>>>>> a3422f1c3e979f5aca1d0910d968af6ac2a78b94
        this.textMessage;
    }

    weightsMore(otherChar){
        return this.mass > otherChar.mass;
    }

    weightCompare(otherChar){
        return Math.abs(this.mass - otherChar.mass);
    }

    tallerThan(otherChar){
        return this.height > otherChar.height;
    }

    heightCompare(otherChar){
        return Math.abs(this.height - otherChar.height);
    }

    isSameHairColor(otherChar){
        return this.hairColor === otherChar.hairColor;
    }

    isSameGender(otherChar){
        return this.gender === otherChar.gender;
    }

<<<<<<< HEAD
    setTextMessage(_textMessage){
        this.textMessage = _textMessage;
=======
    setTextMessage(element){
        this.textMessage = element;
>>>>>>> a3422f1c3e979f5aca1d0910d968af6ac2a78b94
    }

    message(text){
        if(this.textMessage.parentElement.classList.contains("hidden")){
            this.textMessage.parentElement.classList.remove("hidden");
        }
        this.textMessage.textContent = text;
    }
}