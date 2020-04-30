const nameData = document.getElementById('name')
const emailData = document.getElementById('email')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('tarea')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('toDoOptions')[0]
const userForm = document.getElementById('user-form');
const exitBtn = document.getElementById('icon_back')

let user = {}
let tareas = []

userForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    if (!nameData.value || !emailData.value) {
        return
    }

    const userData = {
        nombre: nameData.value,
        email: emailData.value,
        tareas: []
    }

    user = await sendUserData(userData);
    localStorage.setItem('user', JSON.stringify(user));

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
                      <h2>` + tarea + `</h2>
                  </div>
              </div>`
    }).join('')

    const deleteBtn = document.getElementsByClassName('delete_btn')
    for (let i = 0; i < deleteBtn.length; i++) {
        const element = deleteBtn[i];
        element.addEventListener('click', function() {
            eliminarTarea(i)
            mostrar()
        })
    }
}

document.getElementById('newTareaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    anadirTareaDesdeInput();
})

function showPages() {
    if (user) {
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
    return response.json()
}

async function sendTareas() {
    const response = await fetch(`http://localhost:5000/users/${user.id}/tareas`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ tarea: dataInput.value })
    })
    tareas = await response.json()
}

async function receiveTareas() {
    response = await fetch(`http://localhost:5000/users/${user.id}/tareas`)
    tareas = await response.json()
}

exitBtn.addEventListener('click', () => {
    localStorage.removeItem('user')
    location.reload(true)
})

async function setup() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        hideForm.style.display = 'none'
        showSecondPage.style.display = 'block'
        user = JSON.parse(userStr);
        await receiveTareas();
        mostrar();
    }
}

setup();