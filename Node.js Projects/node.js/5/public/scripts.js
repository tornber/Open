const movetodone = (index) => {
    console.log("movetodone")
    const formdata = new FormData()
    formdata.append("index",index)
    fetch("/movetodone", {
        method: 'POST',
        body: JSON.stringify({index})
    }).then(res => {
        window.location.reload();
    }).catch(error => {

    })
}