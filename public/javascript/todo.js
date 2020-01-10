function get_list() {
  if (window.event.keyCode == 13 && document.getElementById('new_todo').value.length > 0) {
    let inputData = document.getElementById('new_todo').value
    let addList = document.createElement('li')
    addList.innerHTML = inputData
    addList.onclick = () => {
      addList.style.cssText = 'text-decoration-line : line-through;'
    }
    document.getElementById('todo-list').appendChild(addList)
    document.getElementById('new_todo').value = ''
  }
}

function remove_list() {
  let list = document.getElementById('todo-list')
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)
  }
}