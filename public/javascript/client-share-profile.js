const username = document.querySelector('.profile-username').textContent
const url = window.location.origin + '/profile/' + username

const copyText = document.querySelector('.page-url')
copyText.value = url

document.querySelector('.copy-url').addEventListener('click', () => {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
})