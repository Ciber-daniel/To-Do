const nameData = document.getElementById('name')
const emailData = document.getElementById('email')
const registerBtn = document.getElementById('register')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('tarea')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('toDoOptions')[0]


getData()
let tareas = []

 if (localStorage.getItem('user')) {

     tareas = JSON.parse(localStorage.getItem(`tareas`)) || []
     hideForm.style.display = `none`
     showSecondPage.style.display = `block`
     mostrar()
 }

registerBtn.addEventListener('click', async function () {

    const userData = {
        nombre: '',
        email: ''
    }
    if (!nameData.value || !emailData.value) {
        return
    }

    userData.nombre = nameData.value
    userData.email = emailData.value
    localStorage.setItem('user', JSON.stringify(userData))
    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block'
    sendUserData()
    mostrar()
})



async function eliminarTarea(index) {
    let deleteTarea = tareas
    deleteTarea.splice(index, 1)
    mostrar()
    await deleteData()
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


addData.addEventListener('click', anadirTareaDesdeInput())

async function anadirTareaDesdeInput() {
    if (dataInput.value === "") {
        return
    }
    await sendData()
    await getData()
    mostrar()
    dataInput.value = ''
}

async function sendData() {
    const response = await fetch('http://localhost:5000/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tarea: dataInput.value})
    })
    tareas = await response.json()
}

async function getData() {
    const response = await fetch('http://localhost:5000/tareas')
    tareas = await response.json()
    mostrar()
}

async function deleteData() {
    const response = await fetch('http://localhost:5000/tareas', {
        method:'DELETE',
        headers: {
            'COntent-Type' : 'application/json'
        }
    })
}

async function sendUserData() {
    const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {nombre:nameData.value,
             email:emailData.value,
             tarea:dataInput.value
            })   
    })
}
