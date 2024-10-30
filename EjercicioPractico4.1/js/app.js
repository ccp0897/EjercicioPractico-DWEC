//Cargar los pacientes en el menú lateral del la pagina
//Para ello usaré el evento DOMContentLoaded en el documento

//Variables
const url_pacientes = "datos/pacientes.json";
const url_recetas = "datos/recetas.json";
let lista_pacientes = []; //Array para almacenar los pacientes
let lista_recetas = []; //Array para almacenar las recetas
const nuevoPacienteBtn = document.querySelector('#btn-nuevo-paciente');
const nuevaRecetaBtn = document.querySelector('#btn-nueva-receta');
const anadirPaciente = document.querySelector('#form-paciente > button');
const anadirReceta = document.querySelector('#formulario-receta > button');

//Crear eventos de la pagina
document.addEventListener('DOMContentLoaded', cargarPacientes);
document.addEventListener('DOMContentLoaded', cargarRecetas);

//Añadir eventos para mostrar el formulario al clickar los botones de añadir paciento o receta

//Preguntar: ¿Si se abre el formulario de pacientes y luego se abre el de recetas que se cierre el pacientes o se puede mantener?
nuevoPacienteBtn.addEventListener('click', () =>{
    const formularioPaciente = document.querySelector('#formulario-paciente');
    if(formularioPaciente.classList.contains('oculto')){
        formularioPaciente.classList.remove('oculto');
    }else{
        formularioPaciente.classList.add('oculto');
    }
    
})

nuevaRecetaBtn.addEventListener('click', () =>{
    const formularioReceta = document.querySelector('#formulario-receta');
    if(formularioReceta.classList.contains('oculto')){
        formularioReceta.classList.remove('oculto');
    }else{
        formularioReceta.classList.add('oculto');
    }
    
})
/*
    Funcionalidad para los botones de añadir paciente y receta.
    Crear eventos para cuando se pulse el boton, y ocultarlo al añadir
*/

anadirPaciente.addEventListener('click', (e) =>{
    e.preventDefault();
    const nombre = document.querySelector('#nombre-paciente');
    console.log(nombre.textContent);
    const edad = document.querySelector('#edad-paciente');
    const paciente = {
        'id': lista_pacientes.length + 1,
        'nombre': nombre.textContent,
        'edad': edad.textContent,
        'recetas': undefined
    }
    lista_pacientes = [...lista_pacientes, paciente];
    console.log(paciente.id);
    limpiarHTML();
    agregarHTMLPacientes();
    const formularioPaciente = document.querySelector('#formulario-paciente');
    formularioPaciente.classList.add('oculto');
    alert('Paciente añadido a la lista');

})

//------------------------------- FUNCIONES -------------------------------------------------------------------

/* 
    Esta funcion se encarga de hacer un fetch de pacientes
*/
async function cargarPacientes(){
    try{
        const respuesta = await fetch(url_pacientes);
        const resultado = await respuesta.json();
        mostrarHTMLPacientes(resultado);
    }catch(error){
        console.log(error);
    }

}

/*
    Esta funcion se encarga de hacer un fetch de recetas
*/

async function cargarRecetas() {
    try{
        const respuesta = await fetch(url_recetas);
        const resultado = await respuesta.json();
        mostrarHTMLRecetas(resultado);
    }catch(error){
        console.log(error);
    } 
}

/*
    Esta funcion se encarga de pasar a los pacientes a un array de objetos, para posteriormente 
    agregar el array al HTML
*/ 
function mostrarHTMLPacientes(datos){

    datos.forEach(dato => {
        const paciente = {
            "id": dato.id,
            "nombre": dato.nombre,
            "edad": dato.edad,
            "recetas": dato.recetas
        };
        lista_pacientes = [...lista_pacientes,paciente];
    });
    agregarHTMLPacientes();
    
}

/* 
    Esta funcion se encarga de pasar las recetas a un array de objetos recetas
*/
function mostrarHTMLRecetas(datos){
    datos.forEach(dato => {
        const receta = {
            "id": dato.id,
            "descripcion": dato.descripcion,
            "fecha": dato.fecha
        };
        lista_recetas = [...lista_recetas,receta];
    })
    console.log(lista_recetas);
    agregarHTMLRecetas();
}

/* 
    Esta funcion se encarga de agregar el html de los pacientes
    Para ello se crea la etiquet li, se agrega el nombre del paciente y se hace un append al
    ul con id = lista-pacientes
*/
function agregarHTMLPacientes(){
    const contenido = document.getElementById('lista-pacientes');
    let html_code = '';

    lista_pacientes.forEach(paciente => {
        html_code = `
            ${paciente.nombre}
        `;
        const li = document.createElement('li');
        li.innerHTML = html_code;
        contenido.appendChild(li);
    })
}

/* 
    Esta funcion se encarga de agregar el html de las recetas.
    Para ello se crea la etiqueta li, se agrega la descripcion de la receta y se hace un append al
    ul con id = recetas-disponibles
*/
function agregarHTMLRecetas(){
    const contenido = document.getElementById('recetas-disponibles');
    let html_code = '';

    lista_recetas.forEach(receta => {
        html_code = `
            ${receta.descripcion}
        `;
        const li = document.createElement('li');
        li.innerHTML = html_code;
        contenido.appendChild(li);
    })
}



/*
    Funcion para limpiar el HTML
*/

function limpiarHTML(){
    const contenedorPacientes = document.querySelector('#lista-pacientes');
    while(contenedorPacientes.firstChild){
        contenedorPacientes.removeChild(contenedorPacientes.firstChild);
    }
}