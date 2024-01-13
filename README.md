# Landing Page with Contact Section

This is a simple landing page with a functional contact section that uses smtp.js to send emails. The landing page is built using Bootstrap, CSS, JS, and HTML.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Features

- Responsive landing page design using Bootstrap.
- Functional contact section with smtp.js integration for sending emails.
- Easily customizable styles with CSS.
- Simple and clean HTML structure.

## Prerequisites

No external dependencies or build tools are required for this project. You can directly open the `index.html` file in a web browser.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/xwaynex/DCM.git

  Open the index.html file in your code editor.

  Customize the content of the landing page as needed.

  Configure the SMTP settings in smtp-config.js to match your email server credentials.

  Save your changes.

  Open the index.html file in a web browser to view your landing page.``

## Configuration

Edit the smtp-config.js file to configure the SMTP settings. Replace the placeholder values with your actual email server credentials.

// smtp-config.js

const smtpConfig = {
  host: 'your-smtp-host',
  port: your-smtp-port,
  secure: true, // set to false if your server doesn't use SSL
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
};




This version removes any mention of npm dependencies and build tools, as it's assumed that your project does not require them.