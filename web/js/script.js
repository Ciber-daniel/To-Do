const nameData = document.getElementById('name')
const emailData= document.getElementById('email')
const registerBtn = document.getElementById('Register')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('tarea')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('to_do_options')[0]

let tareas =[]

if(localStorage.getItem('user')) {
    tareas = JSON.parse(localStorage.getItem(`tareas`)) || []
    hideForm.style.display = `none`
    showSecondPage.style.display = `block`
    mostrar()
}

registerBtn.addEventListener('click', function() {
    const userData = {
        nombre:'',
        email:''
    }    
    if(!nameData.value || !emailData.value) {
        return
    }

    userData.nombre = nameData.value
    userData.email = emailData.value
    localStorage.setItem('user',JSON.stringify(userData))
    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block'
    mostrar()
})



 function actualizarLocalStorage() {
     localStorage.setItem('tareas', JSON.stringify(tareas))
 }

 function eliminarTarea(index) {
     let deleteTarea = JSON.parse(localStorage.getItem('tareas'))
        deleteTarea.splice(index,1)
        tareas.splice(index,1)
        mostrar();
 }

 function mostrar() {
    actualizarLocalStorage();
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
         element.addEventListener('click',function () {
         eliminarTarea(i)
         mostrar()
         })
     }
 }

 document.getElementById('new-tarea-form').addEventListener('submit', function(e) {
     e.preventDefault();
     
    anadirTareaDesdeInput();
 })


 addData.addEventListener('click', anadirTareaDesdeInput)

  function anadirTareaDesdeInput() {
    if(dataInput.value === "") {
        return
    }
    tareas.unshift(dataInput.value)
    dataInput.value = ''
    mostrar()
    console.log('este')
  }


  async function getData() {
    const response = await fetch('http://localhost:3000/tareas')
    const data = await response.json()
    tareas = data
    console.log(tareas)
}

getData()
