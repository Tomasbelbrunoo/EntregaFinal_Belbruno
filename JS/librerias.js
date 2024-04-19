function toastifyBtnComprar (){
    Toastify({
      text: "Se agrego a tu Carrito",
      className: "alerta",
      duration: 3000,      gravity: "bottom",
      position: "right", 
      style: {
        background: "linear-gradient(to right, #000000, #000000)",
        
      },
      onClick: function(){
      } 
    }).showToast();
  
}

function ToastifyErrCatch (){
  Toastify({
    text: "❌ Error 404 ❌ ",
    className: "alerta",
    duration: 5000,
    gravity: "top",
    position: "center", 
    style: {
      background: "linear-gradient(to right, #ff0000, #000000)",
    },
    onClick: function(){

    } 
  }).showToast();
}

