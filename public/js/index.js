function sendData(data) {
    console.log("Sending data");

    const XHR = new XMLHttpRequest();

    function formMessage(formResponse) {
        const contactForm = document.getElementById("contact-form");
        contactForm.textContent = formResponse;
        contactForm.style.padding =
            XHR.status === 500 ? "4em 3em 3em 3em" : "4em 0 3em 0";
        contactForm.style.fontSize = "1.5rem";
        contactForm.style.textAlign = "center";
    }

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
        console.log("Connected with the server!");
        if (XHR.status === 500 || XHR.status === 422) {
            console.error("Something went wrong");
            formMessage("Ups, parece que hubo un problema, intente de nuevo");
        } else if (XHR.status === 200) {
            console.log("Email sent!");
            formMessage("¡Gracias por tu mensaje!");
        }
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

function validateForm() {
    /** Alternative and simpler regex 
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    **/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const formElements = document.getElementById("contact-form").elements;
    const formElementsArr = [...formElements];

    const email = document.getElementById("client-email").value;

    let validateEmail = emailRegex.test(email);

    formElementsArr.forEach((ele) => {
        if (ele.id !== "submit-btn" || ele.type !== "submit") {
            if (ele.id !== "client-email") {
                if (ele.value === "") {
                    ele.style.border = "2px red solid";
                } else {
                    ele.style.border = "none";
                }
            } else {
                if (!validateEmail) {
                    ele.style.border = "2px red solid";
                } else {
                    ele.style.border = "none";
                }
            }
        }
    });

    let textValidator = formElementsArr.every((item) => {
        if (item.id !== "submit-btn" || item.type !== "submit") {
            return item.style.border == "none";
        }
        return true;
    });

    return textValidator;
}

const btn = document.getElementById("submit-btn");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (validateForm()) {
        this.disabled = true;
        const name = document.getElementById("client-name").value;
        const message = document.getElementById("client-message").value;
        const subject = document.getElementById("mail-subject").value;
        const email = document.getElementById("client-email").value;
        sendData({
            name: name,
            email: email,
            subject: subject,
            message: message,
        });
    } else {
        alert("Por favor llena todas las casillas");
    }
});
