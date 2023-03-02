const loadAiUniverse = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayAiUniverse(data.data.tools , dataLimit));
}

const displayAiUniverse = (tools, dataLimit) =>{
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = '';
    // display first 6 tools
    const seeMore = document.getElementById('see-more');
    if(dataLimit && tools.length > 6){
        tools = tools.slice(0,6);
        seeMore.classList.remove('d-none');
    }
    else{
        seeMore.classList.add('d-none');
    }
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
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${tool.name}</h5>
                         <p><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</p>
                    </div>
                    <div>
                        <i class="fa-regular fa-circle-right fa-2x text-danger"></i>
                     </div>
                </div>
            </div>
        </div>
       `
       toolsContainer.appendChild(toolDiv);
    });
}

document.getElementById('btn-see-more').addEventListener('click',function(){
    loadAiUniverse();
})

loadAiUniverse(6);