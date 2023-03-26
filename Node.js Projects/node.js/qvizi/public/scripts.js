const movetodone = (index) => {
    const formdata = new FormData()
    formdata.append("index",index)
    fetch("/movetodone",  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({index})
    }).then(res => {
        if(res.body === "ok")
        window.location.reaload();
    })
}