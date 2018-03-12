`The Movie DB` project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Folder Structure

After creation, your project should look like this:

```
the-movie-db/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Technology

- [React](https://reactjs.org/)
  - ES6
- Jest
- Enzyme
- [Docker](https://www.docker.com/community-edition)
- The Movie DB [API](https://developers.themoviedb.org/3)


### Installation
Please make sure you have Docker installed on your machine to run this app.

```
$ git clone https://github.com/rs6g10/the-movie-db.git
$ cd the-movie-db
$ make build
```

### Run

### In development:

To run normally use:
```
$ make run
$ npm start
```

To run tests normally use:
```
$ npm test
```

#### In production:
No work done to productionise yet.
