# Artista - Showcase your perspective

[Visit the latest deployment](https://artista-fe.netlify.com/)

## What is the goal of this project?

This application provides a more professional environment for artists to showcase their work than it is currently available on platforms such as Instagram or DevianArt. Our goal was to make it feel as professional as Linkedin or Squarespace, but with an arty feel & touch to it.

## Who worked on the team?
 -  Team Lead:
    - Andrew Brush
 - User Interface:
    - Nisa Champagne
    - Greg Poirier
    - William Brooks
  - User Experience:
    - Mai Ho
  - Backend-end
    - Thierry Joux
  - Front-end
    - Patrick Rodrigues

## How do I serve the application?

This project was created in 4 days with **`create-react-app`**

  ```
    1. Clone the repo
    2. cd artfolio/
    3. npm install
    4. npm start or npm run build
  ```

## What dependencies did I use ?
```
  1. axios
  2. formik
  3. moment
  4. prop-types
  5. react
  6. react-dom
  7. react-redux
  8. react-router-dom
  9. react-scripts
  10. redux
  11. redux-thunk
  12. styled-components
  13. yup
```

## What was the process?

I started out by building the boilerplate for the redux store and did some small components here and there, then I guided myself over the MVP to create all the state management before creating the components, and it was a mistake since I didn't plan ahead. I went on creating everything and figure out everything on the go, which was also a bad idea. At the end I spent at least a whole day polishing the code and styling, which could've been avoided if I had planned out the project before hand.

## What would I do differently ?

 I worked with a team in a different Timezone, 7-9 hours apart, despite being aware of this fact, I jumped into making the boilerplate for the application while I waited but I went too far and ended up making some questionable architecture decisions.

 I believe that spending the first day or at least half of it, just planning out every single component & the general user flow of this application would've saved me a lot of time in the long run.

## What did I learn?

 - Meet with the UX & Backend before jumping into it
 - Architecture the application with both the UX & Backend
 - Use smaller, more reusable components for more agile code
 - Have more slices of state stored in redux
 - Plan each component before starting coding
 - Don't jump in to it without having a detailed plan

## Known Bugs & Fixes

 - [ ] When creating a post the second time the user gets redirected to the last posted post
 - [ ] Signup banner is partially hidden for Guests
 - [x] Gallery isn't displaying properly in mobile view
 - [ ] No Page linked to the Find Artists Page
 - [ ] No feedback if the password/email is wrong
 - [ ] No feedback if the user already exists in the database
 - [ ] No component to display default 404 Page
 - [ ] Some styling may look off in some browsers
 - [ ] No Links work in the footer

_`If a checkbox is marked it means that it is fixed`_
