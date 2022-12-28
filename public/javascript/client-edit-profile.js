const file_input = document.getElementById('upload-avatar')
const upload_status = document.querySelector('.upload-status')
file_input.addEventListener('input', () => {
    if (file_input.value) {
        console.log(file_input.value)
        const file_name = file_input.value.split('\\')
        console.log(file_name)
        upload_status.textContent = file_name[file_name.length - 1]
    } 
})