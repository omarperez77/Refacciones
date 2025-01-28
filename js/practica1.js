class Person {
    constructor(firstname, lastname, age, gender, interests) {
        this.name = {
            first: firstname,
            last: lastname
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.getName = function () {
            return this.name.first +'' + this.name.last;
        };
        this.bio = function () {
            return 'I am'+ this.age +'years old, '
                + this.gender + ', and I enjoy'+ this.interests[1]+'.';
        };
        this.greeting = function () {
            alert('Hi! ' + this.name + '!');
        };
    }
}

var person1 = new Person('John', 'Doe', 32, 'male',['skate','musician']);	
console.log(person1.name);
person1.greeting();

var person2 = Object.create(person1);

class Professor extends Person {
    teaches;

    constructor(first, last, teaches){
        super(first, last, 45, 'female', ['math', 'physics']);
        this.teaches = teaches;
    }

    teachingBio() {
        return 'I am a professor, teaching'+ this.teaches[0] + '.';
    }
};

var person4 = new Professor('Adrian', 'Newey', ['math', 'physics']);