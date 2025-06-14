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

document.getElementById("contactForm").addEventListener("submit", (e) => {
   e.preventDefault();
   
  const ebody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://i.postimg.cc/XY5jRHBZ/logo-dark.png" alt="Company Logo" style="max-height: 50px;" />
    </div>

    <h2 style="color: #2c3e50;">New Client Enquiry</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #555;">Name:</td>
        <td style="padding: 8px;">${clientName.value}</td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
        <td style="padding: 8px;">${clientEmail.value}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #555;">Phone Number:</td>
        <td style="padding: 8px;">${clientPhoneNo.value}</td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 8px; font-weight: bold; color: #555;">Country:</td>
        <td style="padding: 8px;">${clientCountry.value}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #555;">Message:</td>
        <td style="padding: 8px;">${clientMessage.value}</td>
      </tr>
    </table>

    <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
      <p>&copy; ${new Date().getFullYear()} DCM. All rights reserved.</p>
    </div>
  </div>
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

  return false;
})

