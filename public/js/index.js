function sendData(data) {
    console.log("Sending data");

    const XHR = new XMLHttpRequest();
    const contactForm = document.getElementById("contact-form");

    let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for (name in data) {
        urlEncodedDataPairs.push(
            encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
        );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
        contactForm.textContent = "¡Gracias por tu mensaje!";
        contactForm.style.padding = "4em 0 3em 0";
        contactForm.style.fontSize = "1.5rem";
        contactForm.style.textAlign = "center";
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
        alert("Oops! Something went wrong.");
    });

    // Set up our request
    XHR.open("POST", "/contact");

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Finally, send our data.
    XHR.send(urlEncodedData);
}

const btn = document.getElementById("submit-btn");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    let message = document.getElementById("client-message").value;
    let subject = document.getElementById("mail-subject").value;
    let email = document.getElementById("client-email").value;
    sendData({
        email: email,
        subject: subject,
        message: message,
    });
});
