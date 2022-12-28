const select_chat = document.querySelector('.selected-chat')

select_chat.addEventListener('click', () => {
    console.log('clicked')
})

const chat = document.querySelector('.chat-messages')

chat.scrollTop = chat.scrollHeight
