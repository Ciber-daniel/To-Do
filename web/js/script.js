const nameData = document.getElementById('name')
const emailData = document.getElementById('email')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('tarea')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('toDoOptions')[0]
const userForm = document.getElementById('user-form');

let tareas = []

if (localStorage.getItem('user')) {

    tareas = JSON.parse(localStorage.getItem(`tareas`)) || []
    hideForm.style.display = `none`
    showSecondPage.style.display = `block`
    mostrar()
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

    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block'
    mostrar()
})

const signoutButtonElement = document.getElementById('signout-button');
    signoutButtonElement.addEventListener('click', () => {
    localStorage.clear();
    window.location = '/web'
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



async function anadirTareaDesdeInput() {
    if (dataInput.value === "") {
        return
    }

    await sendTareas()

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

async function sendTareas() {
    const response = await fetch(`http://localhost:5000/users/1/tareas`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body:JSON.stringify(dataInput.value)
    })
}