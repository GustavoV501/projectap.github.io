/*-- muestrar el menu--*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validar que existan las variables
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*-- Remover menú mobile */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*-- Enlaces de link dentro de la página --*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*--funcion muestra scrolltop --*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)


/*--reducir el tamaño e imprimir en hoja a4--*/
function scaleCv(){
    document.body.classList.add('scale-cv')
}
/*--eliminar el tamaño e imprimir en hoja a4--*/
function removeScale(){
    document.body.classList.remove('scale-cv')
}
/*--Generar pdf--*/
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

/*--Opciones para html2pdf--*/
let opt = {
    margin:       0,
    filename:     'CV-Finix.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
    }

/*--Función para areaCv--*/
function generateResume(){
    html2pdf(areaCv, opt)
}

/*Cuando el botón se aprieta ejecuta 3 funciones*/
resumeButton.addEventListener('click', ()=>{
    //1.- Se agrega la clase .scale-cv al body, donde reduce el tamaño de los elementos
    scaleCv()

    //2.- El pdf se genera
    generateResume()

    //3.- La clase .scale-cv se elimina del body después de 5 segundos para volver al tamaño normal.
    setTimeout(removeScale, 5000)
})
