console.log('before')


const printAsync = (user) => {
    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            try {
                 const userName = user.name
                 resolve(userName);
            }catch(error) {
              reject(error)
            }
       },2000);
    })
    return promise;
}

const getUser = async () => {
    const user1 = await printAsync({name: "temo"});
    console.log(user1);
    const user2 = await printAsync({name: "irakli"});
    console.log(user2);
}

getUser();

    // .then((value) => {
    //     console.log("succes1",value);
    //     return "hello";
    // })
    // .then((value2) => {
    //     console.log("succes2",value);
    //     return "hello2";
    // })
    // .then((value3) => {
    //     console.log("succes3",value);
    //     return "hello3"
    // })
    // .catch((error) => {
    //     console.log('error',error.message)
    // })
    // .finally(() => {
    //     console.log("fynaly")
    // })

    // const promise1 = printAsync({name: "temo"});
    // promise1
    // .then((value) => {
    //     console.log("succes",value);
    //     printAsync({name: "irakli"});
    //     .then((value) => {
    //         console.log("succes",value);
    //     })
    //     .catch((error) => {
    //         console.log("error",error.message)
    //     })
    
    // })
    // .catch((error) => {
    //     console.log('error',error.message)
    // })


console.log('after')