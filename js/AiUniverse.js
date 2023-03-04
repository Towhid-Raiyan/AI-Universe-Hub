const loadAiUniverse = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAiUniverse(data.data.tools, dataLimit));
}

const displayAiUniverse = (tools, dataLimit) => {
    console.log(tools);
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
        const items = tool.features;
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${tool.image}" height="300px" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    ${items.map(item => `<li>${item}</li>`).join("")}             
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
    // stop spinner 
    toogleSpinner(false);
}
const loodToolDetail = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayToolDetail(data.data))
}

const displayToolDetail = tool => {
    
    // modal left side card
    const toolDescription = document.getElementById('description');
    toolDescription.innerText = tool.description;
    const basicPrice = document.getElementById('basic-price');
    const proPrice = document.getElementById('pro-price');
    const enterprisePrice = document.getElementById('enterprise-price');
    if(tool.pricing !== null){
        basicPrice.innerText = tool.pricing[0].price == '' || tool.pricing[0].price == '0' || tool.pricing[0].price == 'No cost' ? 'Free of cost /' : tool.pricing[0].price;
        proPrice.innerText = tool.pricing[1].price == '' || tool.pricing[1].price == '0' || tool.pricing[1].price == 'No cost' ? 'Free of cost /' : tool.pricing[1].price;
        enterprisePrice.innerText = tool.pricing[2].price == '' || tool.pricing[2].price == '0' || tool.pricing[2].price == 'No cost' ? 'Free of cost /' : tool.pricing[2].price;
    }
    else{
        basicPrice.innerText = 'No data Found';
        proPrice.innerText = 'No data Found';
        enterprisePrice.innerText = 'No data Found' ;
    }
    // Modal Features
    const ModalFeaturesContainer = document.getElementById('modal-features-container');
    ModalFeaturesContainer.innerText='';
    const featureTitle = document.createElement('h5');
    featureTitle.innerText = 'Features';
    ModalFeaturesContainer.appendChild(featureTitle);
    const feature = Object.values(tool.features);
    feature.forEach(featureName =>{
        const Modalfeatures = document.createElement('div');
        Modalfeatures.classList.add('col');
        Modalfeatures.innerHTML =`
        <ul>
            <li>${featureName.feature_name}</li>
        </ul>
        `
        ModalFeaturesContainer.appendChild(Modalfeatures);
    })
   
    // Modal Integrations
    const ModalIntegrationsContainer = document.getElementById('modal-integrations-container');
    ModalIntegrationsContainer.innerText='';
    const integrationTitle = document.createElement('h5');
    integrationTitle.innerText = 'Integration';
    ModalIntegrationsContainer.appendChild(integrationTitle);
    const integrations = tool.integrations;
    
    if(integrations == null){
        const ModalIntegrations = document.createElement('div');
        ModalIntegrations.classList.add('col');
        ModalIntegrations.innerHTML = `
            <ul>
                <li>Data Not Found</li>
            </ul>
        `;
        ModalIntegrationsContainer.appendChild(ModalIntegrations);
    }
    else{
        integrations.forEach(integration =>{
            const ModalIntegrations = document.createElement('div');
            ModalIntegrations.classList.add('col');
            //console.log(integration);
            ModalIntegrations.innerHTML =`
            <ul>
                <li>${integration}</li>
            </ul>
            `
            ModalIntegrationsContainer.appendChild(ModalIntegrations);
        })
    }
    // Modal right side card
    const rightSideContainer = document.getElementById('right-side-container');
    rightSideContainer.textContent = '';
    // console.log(tool.image_link);
    const rightSideCard = document.createElement('div');
    rightSideCard.classList.add('col');
    console.log(tool.input_output_examples);
    if(tool.accuracy.score === null){
        rightSideCard.innerHTML = `
        <div class="p-3">
            <div class="position-relative">
               <img id="tool-image" src="${tool.image_link[0]}" class="card-img-top" alt="...">
            </div>
                <div >
                    
                </div>  
            <div class="card-body">
                <h5 class="card-title text-center">${tool.input_output_examples == null ? "No data Found" : tool.input_output_examples[0].input}</h5>
                <p class="card-text text-center">${tool.input_output_examples == null ? "No data Found" : tool.input_output_examples[0].output}</p>
            </div>
        </div>
    `
    rightSideContainer.appendChild(rightSideCard);
    }
    else{
        rightSideCard.innerHTML = `
        <div class="p-3">
            <div class="position-relative">
               <img id="tool-image" src="${tool.image_link[0]}" class="card-img-top" alt="...">
            </div>
                <div >
                    <h5 class="position-absolute top-0 end-0 bg-danger rounded fw-bold text-light p-1">${tool.accuracy.score * 100} % accuracy</h5>
                </div>  
            <div class="card-body">
                <h5 class="card-title text-center">${tool.input_output_examples == null ? "No data Found" : tool.input_output_examples[0].input}</h5>
                <p class="card-text text-center">${tool.input_output_examples == null ? "No data Found" : tool.input_output_examples[0].output}</p>
            </div>
        </div>
    `
    rightSideContainer.appendChild(rightSideCard);
    }
    
}

document.getElementById('btn-see-more').addEventListener('click', function () {
    //spinner start
    toogleSpinner(true);
    loadAiUniverse();
})

const toogleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none')
    }
}


loadAiUniverse(6);