const btn = document.querySelector('.btn');

let screenWidth = window.screen.width;
let screenHeight = window.screen.height;


btn.addEventListener('click', () => {
    alert(`Ширина вашего экрана: ${screenWidth}
Высота вашего экрана: ${screenHeight}`)

})

