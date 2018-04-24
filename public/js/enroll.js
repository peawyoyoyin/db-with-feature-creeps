var addCourseButton = document.getElementById('add-course')
var tableBody = document.getElementById('table-body')
var tableRow = document.getElementById('course-row')
var courses = 1

function addRow(e) {
  e.preventDefault();
  courses += 1
  var newRow = tableRow.cloneNode(true)
  newRow.removeAttribute('id')
  newRow.children[0].children[0].setAttribute('name', 'courseID')
  newRow.children[1].children[0].children[0].setAttribute('name', 'courseSectNum')
  tableBody.appendChild(newRow)
}

addCourseButton.onclick = addRow
