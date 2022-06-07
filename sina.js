//factory
function sayHello() {
    return `Hello ${this.name}`;
}
function sayGoodBye() {
    return `say good Bye ${this.name}`;
}

function createEmplyee(name) {
    return ({
        name,
        sayHello,
        sayGoodBye
    })
}
const Sina = createEmplyee('Sina'); // Hello Sina
const Hojat = createEmplyee('Hojat'); // Hello Hojat
console.log("hojat", Hojat.sayHello());
console.log("Sina", Sina.sayHello());
// static method
const human = {
    sayHelo() {
        return "Hello";
    }
}
// contructor
function Employee(name) {
    this.name = name;
}
Employee.prototype.sayHello = function () {
    return `Hello ${this.name}`;
}
const sina = new Employee('Sina');
console.log("sina", sina.sayHello());


const methods = {
    sayHello() {
        return `Hello ${this.name}`;
    }
    ,
    sayGoodBye() {
        return `Good Bye ${this.name}`;
    }
}
function createEmplyee2(name) {
    Object.create(methods)
    return
}