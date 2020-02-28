/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

// Create global variables to house list items and pagination number
const students = document.querySelector('.student-list')
    .children;
const paginationNum = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
    // start index of the list items to be displayed
    const startIndex = (page * paginationNum) - paginationNum;

    // end index of the list items to be displayed
    const endIndex = (page * paginationNum);

    // loop through the list and display any item that is within the index range above
    for (i = 0; i <= list.length; i += 1) {
        if (i >= startIndex && i < endIndex) {
            return list[i];
        }   
    }
}




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
    // create DOM elements
    const div = document.createElement('div');
    div.className = 'pagination';

    const ul = document.createElement('ul');
    const li = document.createElement('li');

    const aLink = document.createElement('a');
    aLink.href = '#';

    // for every page add up to 10 students to ul element
    const pageLimit = Math.ceil(list.length/paginationNum);
    for (i = 0; i <= pageLimit; i += 1){
        aLink.textContent = i;
        ul.appendChild(
            li.appendChild(aLink)
        );
    }
    console.log(ul);
}




// Remember to delete the comments that came with this file, and replace them with your own code comments.