export class Character{
    constructor(_name, _gender, _height, _mass, _hairColor, _pictureUrl=""){
        this.name = _name;
        this.gender = _gender;
        this.height = +(_height);   //convert string to int
        this.mass = +(_mass);   //convert string to int
        this.hairColor = _hairColor;
        this.pictureUrl = _pictureUrl;
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
}