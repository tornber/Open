// const age = 5;
// let name = "Temo";
// var city = "Tbilisi";

// function sum1(a, b) {
//     return a + b;
// }

// const sum2 = function(a, b) {
//     return a + b;
// }

// const sum3 = (a, b) => {
//     return a + b;
// }

// const sum3 = (a, b) => a + b;


// const sum = sum3(3, 5);
// console.log(sum);

// const user = {
//     name: "Temo",
//     age: 27,
//     address: {
//         city: "Tbilisi",
//         country: "Georgia"
//     }
// }

// const user2 = user;

// user.address.city = "Batumi";

// const arr = [2,3,4, "Tbilisi", user];
// arr.push("Hello");

// const arr2  = arr;
// arr[0] = "Kutaisi";

const user = {
    name: "Temo",
    age: 27,
    address: {
        city: "Tbilisi",
        country: "Georgia"
    }
}

// const user2 = {
//     name: user.name, 
//     age: user.age, 
//     address: user.address
// }

// const user2 = {
//     ...user
// }

// user.name = "Lasha";
// user.age = 50;
// user.address.city = "Batumi";

// const arr = [2,3,4, user];
// const arr2 = [...arr];

// arr[0] = 100;
// arr[3].name = "Sandro";

// const func = (...args) => {
//     return args;
// }

// const name = user.name;
// const age = user.age;
// const address = user.address;

const {name, age, address: {city, country}, something} = user;
const arr = [2,3,4];

// const age1 = arr[0];
// const age2 = arr[1];
// const age3 = arr[2];

const [age1, age2, age3] = arr;

const printName = ({name}) => {
    return name;
}

console.log(printName(user));