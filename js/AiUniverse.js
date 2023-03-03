const loadAiUniverse = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAiUniverse(data.data.tools, dataLimit));
}

const displayAiUniverse = (tools, dataLimit) => {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = '';
    // display first 6 tools
    const seeMore = document.getElementById('see-more');
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6);
        seeMore.classList.remove('d-none');
    }
    else {
        seeMore.classList.add('d-none');
    }
    tools.forEach(tool => {
        // console.log(tool);
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
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
                        <button class="border border-none rounded-circle" onclick="loodToolDetail('${tool.id}')" href ="#" data-bs-toggle="modal" data-bs-target="#toolDetailModal">
                            <i class="fa-regular fa-circle-right fa-2x text-danger"></i>
                        </button>
                     </div>
                </div>
            </div>
        </div>
       `
        toolsContainer.appendChild(toolDiv);
    });
}
const loodToolDetail = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayToolDetail(data.data))
}

const displayToolDetail = tool => {
    console.log(tool);
    const toolDescription = document.getElementById('description');
    toolDescription.innerText = tool.description;
    const basicPrice = document.getElementById('basic-price');
    basicPrice.innerText = tool.pricing[0].price == '' || tool.pricing[0].price == '0' || tool.pricing[0].price == 'No cost' ? 'Free of cost /' : tool.pricing[0].price;
    const proPrice = document.getElementById('pro-price');
    proPrice.innerText = tool.pricing[1].price == '' || tool.pricing[1].price == '0' || tool.pricing[1].price == 'No cost' ? 'Free of cost /' : tool.pricing[1].price;
    const enterprisePrice = document.getElementById('enterprise-price');
    enterprisePrice.innerText = tool.pricing[2].price == '' || tool.pricing[2].price == '0' || tool.pricing[2].price == 'No cost' ? 'Free of cost /' : tool.pricing[2].price;;

    const rightSideContainer = document.getElementById('right-side-container');
    rightSideContainer.textContent = '';
    const rightSideCard = document.createElement('div');
    rightSideCard.classList.add('col');
    rightSideCard.innerHTML = `
        <div class="card h-100 p-3">
            <img id="tool-image" src="${tool.image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${tool.input_output_examples[0].input}</h5>
                <p class="card-text text-center">${tool.input_output_examples[0].output ? tool.input_output_examples[0].output : 'NO! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    `
    rightSideContainer.appendChild(rightSideCard);
}

document.getElementById('btn-see-more').addEventListener('click', function () {
    loadAiUniverse();
})


loadAiUniverse(6);