

let min;
let max;

function listadoDeAutos(array) {

    document.getElementById("lista").innerHTML = "";

    let listado = [];

    for (let i = 0; i < array.length; i++) {
        let auto = array[i];

        if (((min == undefined) || (min != undefined && parseInt(auto.cost) >= min)) &&
            ((max == undefined) || (max != undefined && parseInt(auto.cost) <= max))) {


            listado = `<a href="#" ><div style="border: 2px solid grey;
            border-radius: 12px;"> Nombre:` + " " + auto.name + `<br/>` +
                `Descripción:` + " " + auto.description + ` <br/> ` +
                `Precio: ` + " " + auto.cost + " " + auto.currency + `<br/> ` +
                `Relevancia: ` + " " + auto.soldCount + " " + ` </br> ` +
                `<img height="200px" src=   "` + auto.imgSrc + `" ` + ` <br/></br>
                   </div> </br> </a>  `

            document.getElementById("lista").innerHTML += listado;
        }
    }

};




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productsarray = resultado.data;

            listadoDeAutos(productsarray);

        }

    });
});



function ordenDeProductosAscendente() {

    productsarray.sort(function (a, b) {
        if (a.cost < b.cost) { return -1; }
        if (a.cost > b.cost) { return 1; }
        return 0;
    });
    listadoDeAutos(productsarray)
};


function ordenDeProductosDescendente() {

    productsarray.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
    });
    listadoDeAutos(productsarray)
};


function ordenRelevancia() {

    productsarray.sort(function (a, b) {
        if (a.soldCount > b.soldCount) { return -1; }
        if (a.soldCount < b.soldCount) { return 1; }
        return 0;
    });

    listadoDeAutos(productsarray)
};



document.getElementById("precioAscendente").addEventListener("click", function () {
    ordenDeProductosAscendente(productsarray);
});

document.getElementById("precioDescendente").addEventListener("click", function () {
    ordenDeProductosDescendente(productsarray);
});

document.getElementById("relevanciaDes").addEventListener("click", function () {
    ordenRelevancia(productsarray);
});

document.getElementById("filtrar").addEventListener("click", function () {

    min = document.getElementById("min").value;
    max = document.getElementById("max").value;

    if ((min != undefined) && (min != "") && (parseInt(min)) >= 0) {
        min = parseInt(min);
    }
    else {
        min = undefined;
    }

    if ((max != undefined) && (max != "") && (parseInt(max)) >= 0) {
        max = parseInt(max);
    }
    else {
        max = undefined;
    }

    listadoDeAutos(productsarray);
});

document.getElementById("limpiar").addEventListener("click", function () {

    min = document.getElementById("min").value.innerHTML;
    max = document.getElementById("max").value.innerHTML;

    listadoDeAutos(productsarray);

});

