const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');



//header
toggleBtn.addEventListener('click',() => {
    menu.classList.toggle('active');
});