// plus = document.getElementById('heading-span');
// category = document.getElementById('authors');
 
// plus.addEventListener('click', ()=>{
//     category.classList.toggle('authors');
//     if(!category.classList.contains('authors')){
//          plus.innerHTML = '+';
//     }
//     else{
//         plus.innerHTML = '-';
//     }
// })


// --------------------------------------- Navbar ------------------------------->
           let burger = document.querySelector('.burger');
           let navbar = document.querySelector('.navbar');
           let heading = document.querySelector('.heading');
           let navbar_elements = document.querySelector('.navbar_elements');
           let logo = document.getElementById('logo');
           console.log(logo)

           burger.addEventListener('click', ()=>{
                   navbar.classList.toggle('h-nav-resp')
                   heading.classList.toggle('v-class-resp')
                   navbar_elements.classList.toggle('v-class-resp')
                   logo.classList.toggle('logo-display');
                   logo.classList.toggle('logo');
           })
           


// ---------------------------------------------------------------------------------

plus = document.getElementById('heading-span');
category = document.getElementById('authors');
leftWeek = document.getElementById('left-week')

plus.addEventListener('click',()=>{
    leftWeek.classList.toggle('resp-h');
    category.classList.toggle('opacity-none');

    if(leftWeek.classList.contains('resp-h')){
                  plus.innerHTML = '+';
             }
             else{
                 plus.innerHTML = '-';
             }
})

bookYear = document.getElementById('book-year');
plusYear = document.getElementById('span-year');
opacityYear = document.getElementById('book-format');

plusYear.addEventListener('click',()=>{
    console.log("function Enter")
       bookYear.classList.toggle('resp-h-year');
       opacityYear.classList.toggle('opacity-year');

       if(bookYear.classList.contains('resp-h-year')){
        plusYear.innerHTML = '+';
   }
   else{
       plusYear.innerHTML = '-';
   }
})