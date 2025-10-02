/**
 * Recupère les données d'une API
 * @returns {Array}
 */
async function fetchList(){
    const response = await fetch('http://localhost:3000/todos')
    if(response.ok){
        return response.json()
    }
    throw new Error('Impossible de récuperer les liste de tâches')
}
/**
 * 
 * @param {string} tagName 
 * @param {string} content 
 * @returns {HTMLElement}
 */
function createElement(tagName, attributes = {}){
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)){
        element.setAttribute(attribute, value)
    }
    return element
}

let count = 9
const container = createElement('div', {id: 'contentBox', class: 'form-group'})
document.getElementById('app').append(container)

class TodoList{

    todos

    /**
     * Récuper la liste des todos
     * @param {Array} todos 
     */
    constructor(todos){
        this.todos = todos
    }

    onClick(objetId){
        window.location.href = `./item.html?id=${objetId}`
        
    }

    /**
     * ajout un élement au DOM
     * @param {*} elements 
     */
    appendTo(elements){

        for (const todo of this.todos){
            const content = createElement('div')
            const element = createElement('li', {id: todo.id})
            element.style.textAlign = 'left'
            element.style.margin = '0'
            const showDetail = createElement('button', {class: 'btn btn-primary'})
            showDetail.addEventListener('click', e => {
                e.preventDefault()
                this.onClick(todo.id)
            })
            showDetail.innerText = 'Afficher les détail'
            element.innerText = todo.text
            showDetail.style.fontSize = '.9rem'

            content.append(element, showDetail)
            content.style.flexWrap = 'wrap'
            
            elements.append(content)  
            this.styleElement(content)
   
        }    
        
       
    }
    /**
    * ajoute un nouveau todo a l'API
    */
    onSubmit(){
        fetch('http://localhost:3000/todos', {
            method: "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({
                id: count,
                text: input.value,
                created_at: new Date(),
                is_complete: false
            })
            })
        window.location.reload()    
    }


    
    styleElement(element){
        element.style.display = 'flex'
        element.style.justifyContent = 'space-between'
        element.style.alignItems = 'center'
        element.style.padding = '5px'
        element.style.textAlign = 'center'
        
        element.style.backgroundColor = '#fcfcfcff'
        element.style.margin = '5px'
        element.style.padding = '5px'
    }
}
async function main() {
    try{
        await fetchList()
        .then(response => response[0].todolist)
        .then(data => {
            const todos = new TodoList(data)
            todos.appendTo(document.getElementById('contentBox'))
            button.addEventListener('click', () => todos.onSubmit())
        })      
    }catch(e) {
        const errorMsg = createElement('p')
        errorMsg.innerText = e.message
        errorMsg.style.color = 'rgb(255,0,0)'
        document.getElementById('app').append(errorMsg)
        
    }
    
}
main()


const addElement = createElement('div', {class: 'addBar form-group'})
const label = createElement('label')
label.innerText = 'Entrer le nom de la tâche'

const input = createElement('input', {class: 'input form-control my-3'})

const button = createElement('button', {class: 'btn btn-primary'})
button.innerText = 'Ajouter une nouvelle tâche'

addElement.append(label, input, button)
document.querySelector('#app').prepend(addElement)

addElement.style.marginBottom = '40px'

const stat = createElement('button', {class: 'btn btn-primary'})
stat.innerText = 'Affichier les statistics'
stat.style.marginTop = '10px'

stat.addEventListener('click', () => window.location.href = './stat.html')

document.getElementById('app').append(stat)

