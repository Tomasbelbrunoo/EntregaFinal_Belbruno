const productosSeleccionadoss = document.querySelector ("#productosSeleccionadoss")
let menorP = 1000;
let mayorP = 1; 
let productosSeleccionados = [];

function SumaDeProductosSeleccionados (productosSeleccionados){
    let total = 0;
    for (let i = 0; i < productosSeleccionados.length; i++){
        total += productosSeleccionados[i].precio;
    }
    return total;
}

const totalSumado = SumaDeProductosSeleccionados (productosSeleccionados);



function mostrarProductos (producto){
    const productosContainer = document.querySelector ("#productosContainer");
    productosContainer.innerHTML = "";
    
    producto.forEach ((produc) => {
        const card = document.createElement ("div")
        card.className = "card";
        card.style.width = "18rem"
        
        card.innerHTML = `
            <div class ="card" style= "width: 18rem;">
                <div class= "card-body">
                <img src = ${produc.img} style="width: 60px;></img>
                    <h5 class ="card-title"> ${produc.nombre} </h5>
                    <p class = "card-id" ><stong>ID:</stong> ${produc.id}</p>
                    <p class = "card-precio" ><stong>Precio:</stong> ${produc.precio}</p>
                    <button href ="#" class="btn btn-primary comprar-btn">Comprar</button>
                </div>  
            </div>`
            
        productosContainer.appendChild( card);


        const comprarBtn = card.querySelector(".comprar-btn");
        comprarBtn.addEventListener("click", function() {
            productosSeleccionados.push(produc);    
            toastifyBtnComprar (comprarBtn)
            actualizarContador()
            
        });        
    });
    
    actualizarContador()
};

function actualizarContador() {
    const contador = document.getElementById("contador");
    contador.textContent = productosSeleccionados.length;
    
};

const carritoBtn = document.getElementById("abrirCarrito");
carritoBtn.addEventListener("click", function() {
    mostrarCarrito(productosSeleccionados);  
});

function mostrarCarrito(productosSeleccionados) {
    const producSelec = document.getElementById("contenidoCarrito");
        producSelec.innerHTML = "";


    const cerrarCarritoBtn = document.createElement ("span")
        cerrarCarritoBtn.className = "cerrar";
        cerrarCarritoBtn.innerHTML = "&times;";
        cerrarCarritoBtn.id = "cerrarCarrito";
        contenidoCarrito.appendChild(cerrarCarritoBtn);

    const modal = document.getElementById("miCarrito");
    const botonAbrir = document.getElementById("abrirCarrito");
    const botonCerrar = document.getElementById("cerrarCarrito");

    botonAbrir.onclick = function() {
        modal.style.display = "block";
    };

    botonCerrar.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }};  


    productosSeleccionados.forEach(produc => {
        const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem"
        
        card.innerHTML = `
        
            <div class ="card" style= "width: 18rem;">
                <span class="cerrarP" data-id="${produc.id}">&times;</span>
                    <div class= "card-body">
                        <img src = ${produc.img} style="width: 60px;></img>
                        <h5 class ="card-title"> ${produc.nombre} </h5>
                        <p class = "card-precio" ><stong>ID:</stong> ${produc.id}</p>
                        <p class = "card-precio" ><stong>Precio:</stong> ${produc.precio}</p>
                    </div>  
            </div>`
            contenidoCarrito.appendChild(card);

    });

    
    const cerrarBotones = document.querySelectorAll('.cerrarP');
    cerrarBotones.forEach(boton => {    
        boton.addEventListener('click', function(event) {
            const idProducto = event.target.dataset.id; 
            eliminarProductoDelLocalStorage(idProducto);
            const productoAEliminar = event.target.closest('.card');
            productoAEliminar.remove();
            actualizarContador(); 
        });
     });
        
  

    const totalSumado = SumaDeProductosSeleccionados(productosSeleccionados);
    const sumaProductos = document.createElement("div");
        sumaProductos.className = "suma"
        sumaProductos.innerHTML = `<p> Suma de Productos: $${totalSumado} </p>`;
        producSelec.appendChild(sumaProductos);


    sicronizarStorage ();

};



function eliminarProductoDelLocalStorage(id) {
    productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    const productoEliminado = productosSeleccionados.find(producto => producto.id === parseInt(id));

    const nuevosProductos = productosSeleccionados.filter(producto => producto.id !== parseInt(id));


    localStorage.setItem('productosSeleccionados', JSON.stringify(nuevosProductos));

    const totalSumadoDespuesDeEliminar = SumaDeProductosSeleccionados(nuevosProductos);

    const sumaProductos = document.querySelector(".suma");
    if (sumaProductos) {
        sumaProductos.innerHTML = `<p> Suma de Productos: $${totalSumadoDespuesDeEliminar} </p>`;
    }
      
}

function sicronizarStorage (){
    localStorage.setItem ('productosSeleccionados', JSON.stringify (productosSeleccionados));
    localStorage.setItem ('contador',productosSeleccionados.length)
};


function menorAMayor(){
    const menor = productos.filter (productos => productos.precio <= menorP )
    .sort ((a, b) => a.precio - b.precio);
    
    mostrarProductos (menor);
};

function mayorAMenor(){
    const mayor = productos.filter (productos =>
        productos.precio >= mayorP)
        .sort ((a,b) =>b.precio - a.precio);
        
        mostrarProductos(mayor)
    };

function mostrarTodos (){
    mostrarProductos(productos);
};


const selector = document.getElementById ("selector")
selector.addEventListener ('change', function (){
    
    const selectedOption = selector.value;
    
    switch (selectedOption) {
        case 'menorAMayor':
            menorAMayor()
            break;
        case 'mayorAMenor':
            mayorAMenor()
            break;
            case 'mostrarTodos':
            mostrarTodos();
            break;
    }
})

window.addEventListener ('DOMContentLoaded', () => {
    fetch ('data/data.json')
        .then (resultado => {
            return resultado.json ();
        })
        .then (data => {
            productos = data;
            mostrarProductos(data)
        })
        .catch ((err) => {
            ToastifyErrCatch (err)
        })
})      


document.addEventListener ('DOMContentLoaded', () => {
    productosSeleccionados = JSON.parse (localStorage.getItem ('productosSeleccionados')) || [];
    contadorValor= Number(localStorage.getItem ('contador')) || 0 ;
});