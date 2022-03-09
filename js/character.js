export class Character{
    constructor(name, gender, height, mass, hairColor, pictureUrl=""){
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.pictureUrl = pictureUrl;
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