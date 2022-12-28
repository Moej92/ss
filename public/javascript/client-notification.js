const tabs = document.querySelectorAll('.tab')
const notification_tabs = document.querySelectorAll('.notifications')

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => {
            tab.style.backgroundColor = 'var(--white-color)'
            tab.style.color = 'var(--dark-gray-color)'
        })
        tab.style.backgroundColor = 'var(--dark-color)'
        tab.style.color = 'var(--white-color)'
        notification_tabs.forEach(tab => tab.style.display = 'none')
        const { id } = e.target
        document.querySelector('.' + id).style.display = 'block'
    })
})

const unread_notifications = document.querySelectorAll('.unread')
const notifications = document.querySelectorAll('.notification')

notifications.forEach(notification => {
    notification.addEventListener('click', async () => {
        notification.style.pointerEvents = 'none'
        
        const { main_username, notification_username, notification_userid } = notification.dataset
        let url = window.location.origin
        if (notification.classList.contains('unread')) {
            notification.lastElementChild.style.display = 'none'
            
            const res = await fetch(url + '/notification', { 
                method: 'PUT', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ main_username, notification_userid })  
            })
            const data = await res.json()
        }

        window.location.assign(url + '/profile/' + notification_username)
        
    })
})
