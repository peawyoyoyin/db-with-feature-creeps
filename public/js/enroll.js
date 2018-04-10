var addCourseButton = document.getElementById('add-course')
var tableBody = document.getElementById('table-body')
var tableRow = document.getElementById('course-row')
var courses = 1

function addRow() {
  courses += 1
  var newRow = tableRow.cloneNode(true)
  newRow.removeAttribute('id')
  newRow.children[0].children[0].setAttribute('name', 'course'+courses+'-ID')
  newRow.children[1].children[0].children[0].setAttribute('name', 'course'+courses+'-field1')
  newRow.children[1].children[0].children[1].setAttribute('name', 'course'+courses+'-field1')
  newRow.children[1].children[0].children[2].setAttribute('name', 'course'+courses+'-field2')
  tableBody.appendChild(newRow)
}

addCourseButton.onclick = addRow
