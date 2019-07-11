// const fetch = require("node-fetch");
console.log('Client side js fils is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const mssgOne = document.querySelector('#mssg1')
mssgOne.textContent = ''
const mssgTwo = document.querySelector('#mssg2')
mssgTwo.textContent = ''



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = '/weather?address='
    const locationVar = search.value
    const fullUrl = url + locationVar

    fetch(fullUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                mssgOne.textContent = data.error
            } else {
                console.log(data.location);
                console.log(data.forecast);
                mssgOne.textContent = data.forecast.today
            }
        })
    })
    
    console.log(locationVar);
})