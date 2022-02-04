
console.log("Hello From JavaScript File!")

const headers = {
    'Host': 'api.getsendit.com',
    'Content-Length': '354',
    'Sec-Ch-Ua': '" Not A;Brand";v="99", "Chromium";v="92"',
    'App-Id': 'c2ad997f-1bf2-4f2c-b5fd-83926e8f3c65',
    'App-Version': '1.0',
    'Sec-Ch-Ua-Mobile': '?0',
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Origin': 'https://web.getsendit.com',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://web.getsendit.com/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9',
}

document.getElementById('btn').addEventListener('click', (e) => {
    fetch('/senditid?url=' + document.getElementById('url').value + '&question=' + document.getElementById('question').value)
        .then(resp => resp.json())
        .then(json => {
            for (let i = 0; i < 100; i++) {
                fetch('https://api.getsendit.com/v1/posts', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(json)
                })
                    .then(r => {
                        document.getElementById('status').innerHTML += "<br>"+r.status+" SUCCESS"
                    })
                    .catch(err => {
                        document.getElementById('status').innerHTML += "<br>"+err+" ERROR"
                    })
            }
            
        })

})

