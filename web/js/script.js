const nameData = document.getElementById('name')
const emailData = document.getElementById('email')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('tarea')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('toDoOptions')[0]
const userForm = document.getElementById('user-form');


let users = []
let tareas = []

mostrar()


if(localStorage.getItem('user')) {
    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block' 
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!nameData.value || !emailData.value) {
        return
    }

    const userData = {
        nombre: nameData.value,
        email: emailData.value,
        tareas: dataInput.value
    }

    await sendUserData(userData);
    await receiveUser()

    localStorage.setItem('user',JSON.stringify(userData))

    mostrar()
    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block' 
})



function eliminarTarea(index) {
    let deleteTarea = tareas
    deleteTarea.splice(index, 1)
    mostrar()
}

function mostrar() {
    showTareas.innerHTML = tareas.map((tarea) => {
        return ` <div class="tarea">
                  <div class="position_container">
                      <button class="delete_btn">X</button>
                      <h2>`+ tarea + `</h2>
                  </div>
              </div>`
    }).join('')

    const deleteBtn = document.getElementsByClassName('delete_btn')
    for (let i = 0; i < deleteBtn.length; i++) {
        const element = deleteBtn[i];
        element.addEventListener('click', function () {
            eliminarTarea(i)
            mostrar()
        })
    }
}

document.getElementById('newTareaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    anadirTareaDesdeInput();
})

function showPages() {
    if(users.length === 1) {
        hideForm.style.display = 'none'
        showSecondPage.style.display = 'block' 
    }
    console.log('execute')
}

async function anadirTareaDesdeInput() {
    if (dataInput.value === "") {
        return
    }

    await sendTareas()
    await receiveTareas()

    mostrar()
    dataInput.value = ''
}

async function sendUserData(userToSend) {
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    });
}

async function receiveUser() {
    const response = await fetch(`http://localhost:5000/users`)
     users = await response.json()
}

async function sendTareas() {
    const user = users.find(u => u.id === u.id)
    const response = await fetch(`http://localhost:5000/users/${user.id}/tareas`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({tarea:dataInput.value})
    })
}

async function receiveTareas() {
    const user = users.find(u => u.id === u.id)
    response = await fetch(`http://localhost:5000/users/${user.id}/tareas`)
    tareas = await response.json()
}

