# Server

## ESLint and Babel

`npm i -D eslint`

`npm i -D @babel/core @babel/cli @babel/node @babel/preset-env babel-eslint`

`npm i -D nodemon`

```json
// package.json
{
  "scripts": {
    "start": "nodemon --exec babel-node server.js"
  }
}
```
