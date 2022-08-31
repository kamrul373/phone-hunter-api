// search phone type sensing to enable and diable search button 

document.getElementById("phone-name").addEventListener("keyup", function () {
    const phoneName = document.getElementById("phone-name").value;
    const searchButton = document.getElementById("search");
    if (phoneName.length > 0) {
        searchButton.removeAttribute("disabled");
        searchButton.classList.add("active");
    } else if (phoneName.length == 0) {
        searchButton.setAttribute("disabled", true);
        searchButton.classList.remove("active");
    }
});

