const tareas = [
    { descripcion: 'Perder en lol', completada: false, },
    { descripcion: 'Montar bici', completada: false, },
    { descripcion: 'Flamear al jungla', completada: false, },
];


function mostrarTareas() {
    const tareasContainer = document.getElementById('tareas-container');

    tareasContainer.innerHTML = tareas.filter((tarea) => tarea.completada === false).map((tarea) => `<li class="tarea">${tarea.descripcion}</li>`).join('')

    const tareasElements = document.getElementsByClassName('tarea');

    for (let i = 0; i < tareasElements.length; i++) {
        const tareaElement = tareasElements[i];
        tareaElement.addEventListener('click', () => {
            tareas[i].completada = true;
            mostrarTareas();
        })
    }
}

mostrarTareas();

