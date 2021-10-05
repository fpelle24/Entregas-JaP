//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function logear() {
    let usuario = document.getElementById("usuario").value
    let contrasenia = document.getElementById("contraseña").value

    if (usuario === "" || contrasenia === "") {
        alert("Debe ingresar campos")
    }

    if (usuario !== "" || contrasenia !== "") {
        localStorage.setItem("datosUser", usuario)
        
        window.location = "index.html"
    }

}