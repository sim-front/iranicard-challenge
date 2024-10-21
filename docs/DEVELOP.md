# Development of Ticket Panel

This project is developed using VS Code, on Microsoft Windows 11.

## Authentication

To determine if a user has logged in or not, an endpoint is called at the start, and using the response it is determined whether the user is logged in.

- If logged in, user will be redirected to `/panel`
- If not, user will be redirected to `/login`

## Creating a new ticket

In order to create a new ticket and send it to backend, images should be uploaded seperately, and then their IDs paired up with the ticket payload, and then sent to the endpoint.
