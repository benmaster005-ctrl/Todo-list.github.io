const canvas =  document.createElement('canvas', {id : 'stats'})
canvas.width = 400
const container = document.getElementById('app')
container.style.display = 'flex'
container.style.justifyContent = 'center'


async function statistic(){
    let count = 0
    await fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(r => r[0].todolist)
        .then(lists => {
            const completedTsk = lists.filter(list => list.is_complete === true).length
            const onGoingTsk = lists.filter(list => list.is_complete === false).length
            const total = lists.length

            new Chart (canvas, {
                type: 'doughnut',
                data: {
                    labels: ['Terminées', 'En cours', 'Total'],
                    datasets: [{
                        label: 'Statistiques des tâches',
                        data: [completedTsk, onGoingTsk, total],
                        backgroundColor: [
                            'rgba(75,192,192, .7)',
                            'rgba(255,206,87, .7)',
                            'rgba(54,162,235, .7)'
                        ],
                        borderColor: ["white", "white", "white"],
                        borderWidth: 2
                    }]
                },
                options : {
                    responsive: false,
                    plugins: {
                        legend: {
                            position:"bottom"
                        }
                    }
                }
            })
            container.append(canvas)


            
        })

}
statistic()
