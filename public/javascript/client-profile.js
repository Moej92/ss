// const menus = document.querySelectorAll('.header-menu')
// const menuIcons = document.querySelectorAll('.menu-icon')

// const { ConnectionClosedEvent } = require("mongodb");

// function showMenu() {
//     const icon = this.firstChild
//     const menu = this.lastChild

//     if (menu.classList.contains('show-menu')) {
//         menu.classList.remove('show-menu')
//         icon.classList.remove('on')
//     } else {
//         menu.classList.add('show-menu')
//         icon.classList.add('on')
//     }
// }

// function hideMenu() {
//     this.lastChild.classList.remove('show-menu')
//     this.firstChild.classList.remove('on')
// }


// menuIcons.forEach(icon => icon.addEventListener('click', showMenu))
// menuIcons.forEach(icon => icon.addEventListener('focusout', hideMenu))

// const { pathname } = window.location
// const path = pathname.split('/')

// if (path[1] === 'settings') {
//     if (path[2] === 'account-settings') document.querySelector('.account-settings-tab').style.color = 'rgb(37, 128, 131)'
//     if (path[2] === 'profile-settings') document.querySelector('.profile-settings-tab').style.color = 'rgb(37, 128, 131)'
// }

// Add friend request

// open popup menu 

document.querySelectorAll('.popup-btn').forEach(btn => {
    btn.addEventListener('click', () => {
       return btn.classList.contains('share-profile-icon') 
        ? document.querySelector('.share-profile-menu').classList.add('open')
        : btn.classList.contains('friend-icon')
        ? document.querySelector('.unfriend-menu').classList.add('open')
        : btn.classList.contains('edit-profile-icon') 
        ? document.querySelector('.edit-profile-menu').classList.add('open')
        : null
    })
})

document.querySelectorAll('.close-menu').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.popup-menu').forEach(menu => {
            menu.classList.remove('open')
        })
    })
})

// const popup_btns = document.querySelectorAll('.popup-btn')
// popup_btns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const popup = btn.firstElementChild;
//         if (popup.classList.contains('open-popup')) {
//             popup.classList.remove('open-popup')
//         } else {
//             popup.classList.add('open-popup')
//         }
//     })
// })

// friend requests

const requestActions = document.querySelectorAll('.action')
const requestForm = document.querySelector('.request-form')
requestActions.forEach(action => {
    action.addEventListener('click', () => {
        const formAction = action.classList[action.classList.length - 1]
        requestForm.action = '/request/' + formAction
        requestForm.submit()
        action.style.pointerEvents = 'none'
    })
})

document.querySelectorAll('.n').forEach(el => console.log(el))
