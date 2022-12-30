const btnIcon = document.querySelector('.btn-icon');
const btn = document.querySelector('.btn');


if (btnIcon.classList.contains('btn-icon1')) {
    btn.addEventListener('click', () => {
        btnIcon.classList.toggle('btn-icon2');
    })
} else {
    btn.addEventListener('click', () => {
        btnIcon.classList.toggle('btn-icon1');
    })
}