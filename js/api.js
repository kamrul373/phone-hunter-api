// loading phone data
const loadData = async (searchPhoneName, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhoneName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPhones(data.data, limit);
    } catch (e) {
        console.log(e);
    }

}
// displaying phone data
const displayPhones = (phoneData, limit) => {
    //container
    const phoneContainer = document.getElementById("phones-container");
    // cleaning 
    phoneContainer.innerHTML = "";
    // no phone found when no data found
    if (phoneData.length == 0) {
        document.getElementById("nofound").classList.remove("d-none");
    } else {
        document.getElementById("nofound").classList.add("d-none");
    }
    // show all button logic
    if (limit && phoneData.length > 10) {
        phoneData = phoneData.slice(0, 10);
        document.getElementById("showall").classList.remove("d-none");
    } else {
        document.getElementById("showall").classList.add("d-none");
    }
    phoneData.forEach(phone => {
        // destructuring 
        const { image, phone_name, slug } = phone;
        // creating column
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
            <div class="card text-center py-4 shadow-lg" style="height:330px">
                <div class="">
                    <img src="${image}" class="card-img-top img-fluid w-50" alt="${phone_name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                </div>
                <div>
                    <button class="btn btn-primary px-5" onclick="processPhoneDetails('${slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
    document.getElementById("loader").classList.add("d-none");

}

// search process 
const searchProcess = (limit) => {
    let searchPhoneName = document.getElementById("phone-name").value;
    searchPhoneName = searchPhoneName ? searchPhoneName : "apple";
    loadData(searchPhoneName, limit);
}

// search event handler
document.getElementById("search").addEventListener("click", function () {
    document.getElementById("loader").classList.remove("d-none");
    searchProcess(10);
});

// enter keypress 
document.getElementById("phone-name").addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        document.getElementById("loader").classList.remove("d-none");
        searchProcess(10)
    }
})

// show all button event handler
document.getElementById("showall-btn").addEventListener("click", function () {
    document.getElementById("loader").classList.remove("d-none");
    searchProcess()
});

// show phone details 

const processPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showphoneDetails(data.data));
}
const showphoneDetails = phoneData => {
    console.log(phoneData);
    // destructuring 
    const { name, releaseDate, mainFeatures } = phoneData;
    const { sensors } = mainFeatures;
    const [...z] = sensors

    // modal containers
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    // showing data in modal
    modalTitle.innerText = name;
    modalBody.innerHTML = `
        <p><strong>Chipset: </strong>${mainFeatures.chipSet ? mainFeatures.chipSet : "n/a"}</p>
        <p><strong>Display Size: </strong>${mainFeatures.displaySize ? mainFeatures.displaySize : "n/a"}</p>
        <p><strong>Storage: </strong>${mainFeatures.storage ? mainFeatures.storage : "n/a"}</p>
        <p><strong>Memory: </strong>${mainFeatures.memory ? mainFeatures.memory : "n/a"}</p>
        <p><strong>Sensors:</strong>${z ? z : "n/a"} </p>
        <p><strong>Release Date : </strong>${releaseDate ? releaseDate : "n/a"}</p>
    `

}

// by default showing some phone
loadData("apple", 10);