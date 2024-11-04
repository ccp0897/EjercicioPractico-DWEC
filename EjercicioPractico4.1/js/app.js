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
const anadirReceta = document.querySelector('#form-receta > button');
const pacientes = document.querySelector('#lista-pacientes');
let pacienteSeleccionado = null;

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
        'nombre': nombre.value,
        'edad': edad.value,
        'recetas': undefined
    }
    lista_pacientes = [...lista_pacientes, paciente];
    console.log(paciente.id);
    limpiarHTMLPacientes();
    agregarHTMLPacientes();
    const formularioPaciente = document.querySelector('#formulario-paciente');
    formularioPaciente.classList.add('oculto');
    alert('Paciente añadido a la lista');

})

anadirReceta.addEventListener('click', (e) => {
    e.preventDefault();
    const descripcion = document.querySelector('#descripcion-receta');
    const fecha = document.querySelector('#fecha-receta');
    const receta = {
        'id': lista_recetas.length + 1,
        'descripcion': descripcion.value,
        'fecha': fecha.value
    }
    lista_recetas = [...lista_recetas, receta];
    limpiarHTMLRecetas();
    agregarHTMLRecetas();
    const formularioReceta = document.querySelector('#formulario-receta');
    formularioReceta.classList.add('oculto');
    alert('Receta añadida correctamente');
})
/*
    Pinchar en el usuario y que muestre todas sus recetas, junto con nombre y edad
*/
pacientes.addEventListener('click', (e) => {
    console.log();
    pacienteSeleccionado = lista_pacientes.filter(paciente =>paciente.nombre == e.target.textContent.trim().split(',')[0] && paciente.id == e.target.getAttribute("data-id"));
    seleccionarRecetas(pacienteSeleccionado[0]);

})

function  seleccionarRecetas(p){
    limpiarHTMLRecetasPaciente();
    p.recetas.forEach(elemento =>{
        let html = "";
        let recetaSeleccionada = lista_recetas.find(receta => receta.id == elemento);
        
        console.log(recetaSeleccionada);
        const liSeleccionado = document.createElement('li');
        const titulo = document.querySelector('#nombre-paciente-seleccionado');
        titulo.textContent = `Paciente ${p.nombre} - ${p.edad} años`;
        html = `${recetaSeleccionada.descripcion} - ${recetaSeleccionada.fecha}`;
        liSeleccionado.innerHTML = html;
        const listaRecetasPaciente = document.querySelector('#lista-recetas');
        listaRecetasPaciente.appendChild(liSeleccionado);
    })
}
//------------------------------- FUNCIONES ASINCRONAS -------------------------------------------------------------------

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
            ${paciente.nombre}, ${paciente.edad}
        `;
        const li = document.createElement('li');
        li.innerHTML = html_code;
        li.setAttribute("data-id", paciente.id);
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
            ${receta.descripcion} - ${receta.fecha}
        `;
        const li = document.createElement('li');
        li.innerHTML = html_code;
        li.setAttribute('draggable', "true");
        li.setAttribute('ondragstart', "drag(event)")
        li.setAttribute("data-id", receta.id);
        contenido.appendChild(li);
    })
}



/*
    Funcion para limpiar el HTML
*/

function limpiarHTMLPacientes(){
    const contenedorPacientes = document.querySelector('#lista-pacientes');
    while(contenedorPacientes.firstChild){
        contenedorPacientes.removeChild(contenedorPacientes.firstChild);
    }
}
function limpiarHTMLRecetas(){
    const contenedorRecetas = document.querySelector('#recetas-disponibles');
    while(contenedorRecetas.firstChild){
        contenedorRecetas.removeChild(contenedorRecetas.firstChild);
    }
}
function limpiarHTMLRecetasPaciente(){
    const contenedorRecetasPaciente = document.querySelector('#lista-recetas');
    while(contenedorRecetasPaciente.firstChild){
        contenedorRecetasPaciente.removeChild(contenedorRecetasPaciente.firstChild);
    }
}

/*
 *  DRAG AND DROP 
 */

function allowDrop(e) {
    e.preventDefault();
}
//Coger el elemento por el atributo de data-id que se le da cuendo se crea cada li
function drag(e) {
    e.dataTransfer.setData("text", e.target.getAttribute('data-id'));
    
}
//Para manejar el drop me quedo con el id leido, encuentro la receta, hago un pushh a la lista y lo pinto
function handleDrop(e) {
    e.preventDefault();
    console.log(pacienteSeleccionado[0]);
    const IdReceta = parseInt(e.dataTransfer.getData("text"));
    const recetaObj = lista_recetas.find(r => r.id === IdReceta);
    console.log(IdReceta);

    if (recetaObj && pacienteSeleccionado[0] && !pacienteSeleccionado[0].recetas.includes(IdReceta)){
        pacienteSeleccionado[0].recetas.push(IdReceta);
        console.log(pacienteSeleccionado[0]);
        seleccionarRecetas(pacienteSeleccionado[0]);
    }

}