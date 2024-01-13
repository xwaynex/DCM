const notifications = document.querySelector(".notifications");
const clientName = document.getElementById("name");
const clientEmail = document.getElementById("email");
const clientCountry = document.getElementById("country");
const clientPhoneNo = document.getElementById("tel");
const clientMessage = document.getElementById("comments");


const toastDetails = {
  timer: 5000,
  1: {
    icon: "fa-circle-check",
    text: "Success: Contact sent Succesfully.",
  },
  2: {
    icon: "fa-circle-xmark",
    text: "Error: Contact not Sent.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    text: "Warning: Something Unusal happend, try later.",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info: Please read our terms.",
  }
}

const removeToast = (toast) => {
  toast.classList.add("hide");
  if(toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
}

const createToast = (id, toastClass) => {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id} ${toastClass}`;
  toast.innerHTML = `
    <div class="toast_column">
     <i class="fa-solid ${icon}"></i>
     <span>${text}</span>
  </div>
  <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>
`;
  notifications.appendChild(toast);

 toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

function sendContact(event) {
  let ebody = `
  <b>Name: </b> ${clientName.value}
  <br />
  <b>Email: </b> ${clientEmail.value}
  <br />
  <b>Phone No: </b> ${clientPhoneNo.value}
  <br />
  <b>Country: </b> ${clientCountry.value}
  <br />
  <b>Query: </b> ${clientMessage.value}
  <br />
  
  `;

  Email.send({
    SecureToken: "4bf53602-bc9d-44ee-b742-37c850f5a2a1",
    To: "georgefarewell89@gmail.com",
    From: "georgefarewell89@gmail.com",
    Subject: "Client Enquiry from " + clientEmail.value,
    Body: ebody,
  }).then((message) => {
    if (message === "OK") {
      // Email sent successfully
      createToast("1", "success");
    } else {
      // Email failed to send
      createToast("2", "error");
    }
  });

  event.preventDefault();
  return false;
}

