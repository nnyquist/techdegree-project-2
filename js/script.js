/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// create function to handle element creation, class, type, text
function creation() {
    // want to refactor and make a function that holds other functions
}

// add search component
const searchBox = document.createElement('div');
searchBox.className = 'student-search';

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search for students ...';

const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

searchBox.appendChild(searchInput);
searchBox.appendChild(searchButton);

document.querySelector('.page-header').appendChild(searchBox);

// Create global variables to house list items and pagination number
const students = document.querySelector('.student-list')
    .children;
const paginationNum = 10;


// create showPage function to limit to students by paginationNum
function showPage(list, page) {
    // start index of the list items to be displayed
    const startIndex = (page * paginationNum) - paginationNum;

    // end index of the list items to be displayed
    const endIndex = (page * paginationNum);

    // loop through the list and display any item that is within the index range above
    for (i = 0; i < list.length; i += 1) {
        selectedLi = list[i];

        if (i >= startIndex && i < endIndex) {
            selectedLi.style.display = 'list-item';
        } else {
            selectedLi.style.display = 'none';
        }
    }
}


// create appendPageLinks function to make links for each 10 student page
function appendPageLinks(list) {
    // div element with class page
    const divPage = document.querySelector('.page');
    
    // create DOM elements
    const div = document.createElement('div');
    div.className = 'pagination';

    const ul = document.createElement('ul');

    // page limit based on number of students in list
    const pageLimit = Math.ceil(list.length/paginationNum);
    
    // for every page have one li element in the ul element
    for (i = 0; i < pageLimit; i += 1){
        // create the li and a elements
        const li = document.createElement('li');
        
        const aLink = document.createElement('a');
        aLink.href = '#';
        aLink.textContent = i + 1;

        // add active class name to first pagination link
        if (i === 0) {
            aLink.className = 'active';
        }

        // append them to the ul element
        li.appendChild(aLink);
        ul.appendChild(li);
    }

    // append the ul to the div, the div to the divPage
    div.appendChild(ul);
    divPage.appendChild(div);
}

// search function, returns array of records in list that match searchText
function searchNames(list, searchText){
    // initialize the matched array
    let matchArray = [];

    // loop over list and append to array if a match exists
    for (i = 0; i < list.length; i ++){
        if (searchText.length !== 0 &&
            list[i].textContent.toLowerCase().includes(searchText
                .toLowerCase())){
                matchArray.push(list[i]);
            }
    }

    // return the array
    return matchArray;
}

// initial execution of the functions above
showPage(students,1);
appendPageLinks(students);

// create a div paragraph if no results show up
const noResultsDiv = document.createElement('div');
noResultsDiv.className = 'no-results';
noResultsDiv.style.display = 'none' // initialize to not display

const noResultsP = document.createElement('p');
noResultsP.textContent = "I'm sorry, there is no student that matches your search result.";

noResultsDiv.appendChild(noResultsP);
const ulPage = document.querySelector('.pagination');
document.querySelector('.page').insertBefore(noResultsDiv, ulPage);

// add a "click" event listener to each A element
pageLinks = document.querySelectorAll('.pagination a')

for (i = 0; i < pageLinks.length; i += 1){
    let a = pageLinks[i];

    a.addEventListener('click', (e) => {
        for (j = 0; j < pageLinks.length; j ++){
            pageLinks[j].className = '';
        }
        e.target.className = 'active';
        showPage(students, e.target.textContent)
    })
}


// click event for search box if button clicked
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchText = searchInput.value;

    let matched = searchNames(students, searchText);

    if (searchText === ''){
        matched = students;
    }

    // drop the pagination class div
    document.querySelector('.page').removeChild(
        document.querySelector('.pagination')
    );
    // hide all students
    for (i = 0; i < students.length; i++){
        students[i].style.display = 'none';
    }
    showPage(matched, 1);
    appendPageLinks(matched);
});

// keyup event for search box as text entered
searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    noResultsDiv.style.display = 'none';
    searchText = searchInput.value;

    let matched = searchNames(students, searchText);

    if (searchText === ''){
        matched = students;
    } else if (matched.length === 0){
        noResultsDiv.style.display = 'block';
    }

    // drop the pagination class div
    document.querySelector('.page').removeChild(
        document.querySelector('.pagination')
    );
    // hide all students
    for (i = 0; i < students.length; i++){
        students[i].style.display = 'none';
    }
    showPage(matched, 1);
    appendPageLinks(matched);
});