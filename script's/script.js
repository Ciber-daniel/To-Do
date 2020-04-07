const registerBtn = document.getElementById('Register')
const showSecondPage = document.getElementById('show')
const dataInput = document.getElementById('formGroupExampleInput')
const addData = document.getElementById('btn')
const hideForm = document.getElementsByClassName('container')[0]
const showTareas = document.getElementsByClassName('to_do_options')[0]
const tareas = ['Tomar mucha agua','Hacer ejercicio','Perder en lolsito']

registerBtn.addEventListener('click', function() {
    hideForm.style.display = 'none'
    showSecondPage.style.display = 'block'
})

 let deleteBtn = []

 function eliminarTarea(index) {
     tareas.splice(index,1)
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
      deleteBtn = document.getElementsByClassName('delete_btn')
     for (let i = 0; i < deleteBtn.length; i++) {
         const element = deleteBtn[i];
         element.addEventListener('click',function () {
         eliminarTarea(i)
         mostrar()
         })
     }
 }

 mostrar()

 addData.addEventListener('click', function() {
     tareas.push(dataInput.value)
     console.log(dataInput.value)
     console.log(tareas)
     dataInput.value = ''
     mostrar()
 })


