// College Data API call
const APIKEY = '&api_key=qkorLW8iMdlqQaEeof72qF2jfmhWdVPObp3Uqdov';
const base = 'https://api.data.gov/ed/collegescorecard/v1/';
const query = 'schools.json?school.name=';
const school = 'Oregon%20State%20University-Cascades%20Campus';
const url = base + query + school + APIKEY;

// Google Sheets API call
const jsonSchoolNames = 'https://sheets.googleapis.com/v4/spreadsheets/13RXNOiQ9FKsWcHnVS6JJl7WVCDGJAeb_E0Pf8h6cB5M/values/sheet?key=AIzaSyCi7iqiLy0C3lPWR-1ZgrMrf1It3ihRDIA'

// Gets elements on page
const searchBar = document.getElementById('search');
const results = document.getElementById('results');


// Program variables
const schoolList = getSchoolList();
let matches = [];

async function getSchoolList() {
    const response = await fetch(jsonSchoolNames);
    return response.json();
}

function makeAndAppendP(textContent) {
    let element = document.createElement('p');
    element.textContent = textContent;
    results.appendChild(element);
}

function killTheKids(div){
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    return;
}

searchBar.addEventListener("change", ()=> {
    schoolList.then(data => {
        if (results.firstChild) {
            killTheKids(results);
        }
        matches = [];
        for(let i = 0; i < data.values.length; i++) {
            for(let j= 0; j < data.values[i].length; j++) {
                let lowered = data.values[i][j].toLowerCase();
                let substring = searchBar.value.toLowerCase();
                if(lowered.includes(substring)) {
                    matches.push(data.values[i][j])
                }
            }
        }
        return matches;
    }).then(matches => {
        if(matches.length < 1) {
            makeAndAppendP('No results found')
        }
        if(matches.length > 15) {
            makeAndAppendP('Please be more specific')
        }
        else {
            for(let i = 0; i < matches.length; i++) {
                makeAndAppendP(matches[i]);
            }
        }
    }).then(() => {
        const schools = document.querySelectorAll('p');
        schools.forEach(school => {
            school.addEventListener('click', () => {
                console.log(school.textContent)
            })
        })
    })
})
