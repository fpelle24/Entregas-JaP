//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let productsarray;

document.addEventListener("DOMContentLoaded", function (e) {

    let autoid = window.localStorage.getItem('auto-id');

    getJSONData( PRODUCT_INFO_URL + `/` + autoid + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;


            listadoDeAutos(productsarray);

        }
    });

    function listadoDeAutos(auto) {

        document.getElementById("lista2").innerHTML = "";

        let listado = [];
        let foto = "foto/" + auto.name + "/1.jpg" + `</br>` + "2.jpg" + `</br>` + "3.jpg"


        listado = `<div style="border: 2px solid grey;
                border-radius: 12px;"> Nombre:` + " " + auto.name + `<br/>` +
            `Descripción:` + " " + auto.description + ` <br/> ` +
            `Precio: ` + " " + auto.cost + " " + auto.currency + `<br/> ` +
            `Relevancia: ` + " " + auto.soldCount + " " + ` </br> ` +
            `<img height="200px" src=   "` + foto + `" ` + ` <br/></br>
                   
                       </div> </br> `

        document.getElementById("lista2").innerHTML += listado;
    }



});
