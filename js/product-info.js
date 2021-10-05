//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let comentarioarray;
let productsarray;

document.addEventListener("DOMContentLoaded", function (e) {

    let autoid = window.localStorage.getItem('auto-id');

    getJSONData(PRODUCT_INFO_URL + `/` + autoid + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;

            listadoDeAutos(productsarray);


            getJSONData(PRODUCTS_URL).then(function (resultObj) {

                if (resultObj.status === "ok") {
                    autosprod = resultObj.data;


                    mostrarRelacionados(productsarray, autosprod)
                }
            });
        }
    });
});



function listadoDeAutos(auto) {

    document.getElementById("lista2").innerHTML = "";

    let listado = [];

    let foto1 = "foto/" + auto.name + "/1.jpg"
    let foto2 = "foto/" + auto.name + "/2.jpg"
    let foto3 = "foto/" + auto.name + "/3.jpg"

    listado = `<div style="border: 2px solid grey; text-align: center;
                border-radius: 12px;"> Nombre:` + " " + auto.name + `<br/>` +
        `Descripción:` + " " + auto.description + ` <br/> ` +
        `Precio: ` + " " + auto.cost + " " + auto.currency + `<br/> ` +
        `Relevancia: ` + " " + auto.soldCount + " " + ` </br> ` +
        `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src=" ` + foto1 + `" class="d-block w-100" ">
                </div>
                <div class="carousel-item">
                    <img src="` + foto2 + `" class="d-block w-100" ">
                </div>
                <div class="carousel-item">
                    <img src="`+ foto3 + `" class="d-block w-100" >
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        </div> </br> `

    document.getElementById("lista2").innerHTML += listado;

}


function mostrarRelacionados(array, array2) {

    let relacionados = array.relatedProducts;

    let mostrarAuto = "";

    

    for (let i = 0; i < relacionados.length; i++) {

        autosRel = autosprod[relacionados[i]];

        mostrarAuto = `
            <div>
                <div>
                <h2>${autosRel.name}</h2>
                <p>${autosRel.description}</p>
                <button id="Ver mas" onclick="infoauto(` + autosRel.id + `);" type="button">Más Info</button>
                </div>
                </div>
            </div>
    `;
        document.getElementById("productosRela").innerHTML += mostrarAuto;
    }
}

function infoauto(autoid) {
    window.localStorage.setItem('auto-id', autoid);
    window.location = 'product-info.html';
}

function mostrarComentarios(comentario) {

    document.getElementById("comentarios").innerHTML = "";

    let listado;
    for (let i = 0; i < comentario.length; i++) {

        listado = `<div class="card">
        <div class="card-body">
        <p class="card-text"> Puntuación:` + " " + comentario[i].score + `<br/>` +
            `Descripción:` + " " + comentario[i].description + ` <br/> ` +
            `Usuario: ` + " " + comentario[i].user + " " + comentario[i].dateTime + `</p> 
    
            </div> </br> `

        document.getElementById("comentarios").innerHTML += listado;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarioarray = resultObj.data;


            mostrarComentarios(comentarioarray);

        }
    });

});