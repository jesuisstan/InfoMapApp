# Project Documentation: Info Map Fullstack App

The deployed project can be accessed at http://209.38.216.33:4040/. \
The source code with explanatory comments is available on GitHub [repository](https://github.com/jesuisstan/InfoMapApp).

## Objective

The primary goal of this project was to develop a web app using react / typescript to display a map and API data.

## Implementation

The project was implemented using functional components and popular hooks in ReactJS with TypeScript and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started), leveraging the Material UI library for its components and styling, in addition to custom CSS modules. The Contact Book App was developed to be responsive, following a multi-platform approach. The following steps were taken to complete the project:

1.  **Backend + MongoDB implementation**: Backend was built with NodeJS and Express server to save time. Database (MongoDB) was attached to backend to store all user accounts data. Authentication (sign up and sign in) with user's email and password (encrypted) is also implemented.

2. **Material UI, Custom Styling with CSS Modules & Custom Fonts**: Material UI components were utilized to achieve a consistent and visually appealing design. Components such as TextField, Drawer, FloatingButton, LoadingButton and others were used to create responsive and user-friendly web-app and related elements. The Montserrat font was applied to the project to improve attractiveness of the App.

3. **Deployment**: The code was deployed on a Digital Ocean web server and made accessible through the [URL](http://209.38.216.33:4040/).

4. **Version Control**: The code was hosted on GitHub and made publicly accessible. The repository can be found at https://github.com/jesuisstan/InfoMapApp.

## Results

Deployed version of the App allows user to:

- get access to his contact list with authentication;

- search for specific contact by his Lastname;

- sort existing contacts by Lastnames;

- create a new contact by opening a side panel with empty fields;

- edit an existing contact by opening a side panel pre-filled with the contact's current information;

- delete a contact from the directory.

## Demonstration


https://github.com/jesuisstan/InfoMapApp/assets/82715902/951bb119-629e-4c23-a3c9-3200c94a853b



## Future Improvements

While the project has been successfully implemented and deployed, there are potential areas for improvement:

- **Unit Testing**: Implementing unit tests for the components and functionality of the Info Map App would help ensure the stability and maintainability of the codebase, allowing for easier future modifications and bug fixes.

- **Safari browser support** was not tested.

- **API requests** from frontend are supposed to be moved to backend.


By addressing these areas for improvement, the project can be further optimized and polished, providing an even better user experience.

## How to use
##### 1. Adjust backend/.env and frontend/.env files if you need other HOST, PORT or MONGO vars.
##### 2. Adjust "proxy" line in frontend/package.json file so that it points to your Server

##### 3. Run the App:
a) with Docker:
- create docke image:
```sh
docker build -t map .
```

- Start Info Map Fullstack App:
```sh
docker run -p 4444:4444 -p 4040:4040 map
```
OR

b) with NPM:
- install all the dependencies according to 'package.json' file from the root dir:
```sh
npm install
```

- Start Info Map Fullstack App:
```sh
npm start
```

##### 4. Open the App link in browser ([http://localhost:4040](http://localhost:4040) or [http://209.38.216.33:4040](http://209.38.216.33:4040) by default).

##### 5. Additional commands:
- to list all Docker container:
```sh
docker ps -a
```
- to list all Docker images:
```sh
docker images
```
- to stop all running containers:
```sh
docker stop $(docker ps -q)
```
- to remove all stopped containers:
```sh
docker rm $(docker ps -a -q)
```
- to delete all Docker images
```sh
docker rmi $(docker images -q)
```
