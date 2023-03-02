const loadAiUniverse = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayAiUniverse(data.data.tools));
}

const displayAiUniverse = tools =>{
    const toolsContainer = document.getElementById('tools-container');
    tools.forEach(tool => {
        console.log(tool);
       const toolDiv= document.createElement('div');
       toolDiv.classList.add('col');
       toolDiv.innerHTML =`
        <div class="card h-100 p-3">
            <img src="${tool.image}" height="300px" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                </ol>
            </div>
            
            <div class="card-footer">
                
            </div>
        </div>
       `
       toolsContainer.appendChild(toolDiv);
    });
}

loadAiUniverse()