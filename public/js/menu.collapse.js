//document.addEventListener("DOMContentLoaded", function () {
let checkbox = document.getElementById("menu");
checkbox.addEventListener("change", () => {
    let menuContent = document.getElementsByClassName("menu-content")[0];
    let menuCollapse = document.getElementsByClassName("menu-collapse")[0];
    let icon = document.getElementById("icon");

    if (checkbox.checked === true) {
        menuContent.style.display = "block";
        menuCollapse.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        icon.style.background = "url(/css/cancel.svg) no-repeat";
        menuCollapse.style.height = "auto";
    } else {
        menuContent.style.display = "none";
        menuCollapse.style.backgroundColor = "rgba(0, 0, 0, 0)";
        icon.style.background = "url(/css/menu.svg) no-repeat";
    }
});
//});
