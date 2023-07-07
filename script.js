const todos = []

window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('data'))
    displayTodos()
})

const form = document.querySelector('.new-item-form');
const input = document.querySelector('.new-item-form input')
const deleteAllBtn = document.querySelector('#delete-all')

form.addEventListener('submit', e => {
    e.preventDefault()

    if (input.value === '') {
        alert("Please insert a task!")
        list.innerHTML = ''
    }

    const todo = {
        text: input.value,
        category: e.target.elements.category.value,
        complete: false,
        low: false,
        med: false,
        high: false,
    }

    todos.push(todo)
    saveData()
    input.value = ''
    displayTodos()
})

function displayTodos() {
    const list = document.querySelector('.todo-list')

    list.innerHTML = ''

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        const label = document.createElement('label')
        const checkbox = document.createElement('input')
        const span = document.createElement('span')
        const text = document.createElement('div')
        const editBtn = document.createElement('button')
        const delBtn = document.createElement('button')

        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.complete
        span.classList.add('circle')

        if (todo.category == 'low') {
            span.classList.add('low')
        } else if (todo.category == 'med') {
            span.classList.add('med')
        } else if (todo.category == 'high') {
            span.classList.add('high')
        }

        text.classList.add('todo-content')
        editBtn.classList.add('edit-icon')
        delBtn.classList.add('delete-icon')

        text.innerHTML = `<input type="text" value="${todo.text}" disabled/>`

        editBtn.innerHTML = `<svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#023e8a}</style><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`

        delBtn.innerHTML = `<svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#023e8a}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>`

        label.appendChild(checkbox)
        label.appendChild(span)

        todoItem.appendChild(label)
        todoItem.appendChild(text)
        todoItem.appendChild(editBtn)
        todoItem.appendChild(delBtn)

        list.appendChild(todoItem)

        if (todo.complete) {
            todoItem.classList.add('complete')
        }

        checkbox.addEventListener('click', e => {
            todo.complete = e.target.checked
            saveData()

            if (todo.complete) {
                todoItem.classList.add('complete')
            } else {
                todoItem.classList.remove('complete')
            }

            displayTodos()
        })

        editBtn.addEventListener('click', e => {
            const input = text.querySelector('input')
            input.removeAttribute('disabled')
            input.focus()
            editBtn.innerHTML = '<svg class="save-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>'
            input.addEventListener('blur', e => {
                input.setAttribute('disabled', true)
                todo.text = e.target.value
                saveData()
                displayTodos()
            })
        })

        delBtn.addEventListener('click', () => {
            todos = todos.filter(abc => abc !== todo)
            saveData()
            displayTodos()
        })
    });
}

deleteAllBtn.addEventListener('click', () => {
    todos = []
    saveData()
    displayTodos()
})

function saveData() {
    localStorage.setItem('data', JSON.stringify(todos))
}
