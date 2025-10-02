const input = document.querySelector('.form-control.my-3')
const button = document.querySelector('.btn.btn-primary')
    .addEventListener('click', (event) => {
        const value = input.value.trim()
        if(value === '' || value.length < 3){
            event.preventDefault()
            const error =  alertMessage('Veillez entrer votre prénom')
            const container = document.querySelector('.form-group')
            container.append(error)
            
        }
        else{
            localStorage.setItem('prenom', input.value)
            window.location.href = "./tasks.html"
            event.preventDefault()
        }
    })
/**
 * cette function renvoie un message error
 * @param {string} alertMessage 
 * @returns {HTMLElement}
 */
function alertMessage(alertvalue){
    const element = document.createElement('div')
    element.textContent = alertvalue
    element.style.backgroundColor = 'rgba(236, 184, 184, 1)'
    element.style.borderRadius = '5px'
    element.style.margin = '10px 0'
    element.style.height = '40px'
    element.style.padding = '9px'
    element.style.color = 'rgba(209, 36, 36, 1)'
    element.style.fontSize = '14px'
    return element
}
