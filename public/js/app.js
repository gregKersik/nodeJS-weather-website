// const fetch = require("node-fetch");
console.log('Client side js fils is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const mssgOne = document.querySelector('#mssg1')
const mssgTwo = document.querySelector('#mssg2')



weatherForm.addEventListener('submit', (e) => {
    mssgOne.textContent = 'Loading...'
    mssgTwo.textContent = ''
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
                mssgTwo.textContent = data.location
            }
        })
    })
    
    console.log(locationVar);
})