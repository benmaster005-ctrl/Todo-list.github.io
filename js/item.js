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

async function main(){  
    const params = new URLSearchParams(window.location.search)
    const id = parseInt(params.get('id'), 10)

    await fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(data => data[0].todolist)
        .then(tasks => {
            const task = tasks.filter(objet => objet.id === id)
            task.forEach(item => {
                const container = createElement('div', {class : "col-lg-6 mx-auto bg-light p-3"})
        
                const containerBtn = createElement('div')
                containerBtn.style.display = 'flex'
                containerBtn.style.justifyContent = 'flex-end'

                const taskName = createElement('p')
                taskName.textContent = `Nom de la tâche: ${item.text}`

                const taskDate = createElement('p')
                taskDate.textContent = `Date de création: ${item.created_at}`

                const taskTag = createElement('p')
                if(!item.Tags){
                    taskTag.textContent = 'Tags: -'
                }else
                {taskTag.textContent = `Tags: ${item.Tags[0]}, ${item.Tags[1]}`}
                
                const status =createElement('p')
                
                let state = undefined

                if(item.is_complete){
                    state = 'Terminée'
                    status.innerText = `Status: ${state} \u2705`
                }else{
                    state = 'Non-Terminée'
                    status.innerText = `Status: ${state}`
                }

                

            
                const trueBtn = createElement('button', {class: 'btn btn-primary'})
                trueBtn.innerText = '\u2714 Terminer la tâche'
                trueBtn.addEventListener('click', endTask)
                trueBtn.style.border = 'none'
                trueBtn.style.marginRight = '10px'
                
                const deleteBtn = createElement('button', {class: 'btn btn-primary'})
                deleteBtn.innerText = '\u274c Supprimer'
                deleteBtn.style.border = 'none'
                deleteBtn.style.background = '#ff0000'
                deleteBtn.addEventListener('click', deleteTask)

                const restoreBtn = createElement('button', {class: 'btn btn-primary'})
                restoreBtn.innerText = '\u21bb Re-ouvrir'
                restoreBtn.style.marginRight = '10px'
                restoreBtn.style.border = 'none'
                restoreBtn.style.backgroundColor = '#ffa500'
                restoreBtn.addEventListener('click', reopenTask)

                async function deleteTask(){
                    await fetch(`http://localhost:3000/todos/${item.id}`, {
                        method : "DELETE"
                    })
                    window.location.href = "./tasks.html" 
                }
                async function reopenTask(){
                    await fetch(`http://localhost:3000/todos/${item.id}`, {
                        method : "PUT",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                            is_complete : false
                        })
                    })
                    window.location.reload()
                    
                }
                async function endTask(){
                    await fetch(`http://localhost:3000/todos/${item.id}`, {
                        method : "PUT",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                            is_complete : true
                        })
                    })
                    state = 'Terminée'
                    window.location.reload()
                }    
                if(item.is_complete === true){
                    containerBtn.append(restoreBtn, deleteBtn)
                }else{
                    containerBtn.append(trueBtn, deleteBtn)
                }
                container.append(taskName, taskDate, taskTag, status, containerBtn)
                document.getElementById('app').append(container)
            })


        })
}





main()