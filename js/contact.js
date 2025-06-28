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
  },
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

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
  <div style="background-color: #1c1c1c; color: #f5f5f5; font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.4);">

    <div style="padding: 20px; text-align: center; background-color: #2c2c2c;">
      <img src="https://i.postimg.cc/XY5jRHBZ/logo-dark.png" alt="DCM Logo" style="max-height: 60px; display: block; margin: auto;" />
    </div>

    <div style="padding: 20px;">
      <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 10px; text-align: center;">New Client Enquiry</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #ccc; text-align: center;">You've received a new enquiry. Here are the details:</p>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Name:</td>
          <td style="padding: 10px; color: #fff;">${clientName.value}</td>
        </tr>
        <tr style="background-color: #2a2a2a;">
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Email:</td>
          <td style="padding: 10px; color: #fff;">${clientEmail.value}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Phone Number:</td>
          <td style="padding: 10px; color: #fff;">${clientPhoneNo.value}</td>
        </tr>
        <tr style="background-color: #2a2a2a;">
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Country:</td>
          <td style="padding: 10px; color: #fff;">${clientCountry.value}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #aaa; font-weight: bold;">Message:</td>
          <td style="padding: 10px; color: #fff;">${clientMessage.value}</td>
        </tr>
      </table>

      <p style="margin-top: 30px; font-size: 14px; color: #bbb; line-height: 1.6;">
        Thank you for choosing DCM. We'll get back to you as soon as possible.
      </p>

      <p style="margin-bottom: -10px;"><strong>Best regards,</strong></p>
      <p style="font-weight: bold; color: #f5f5f5;">DCM Team</p>
    </div>

    <div style="text-align: center; padding: 10px 20px 20px; font-size: 12px; color: #777;">
      &copy; ${new Date().getFullYear()} DCM. All rights reserved.
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
});
