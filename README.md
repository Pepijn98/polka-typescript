# polka-typescript
Testing polka in typescript

Wanted to try out polka using typescript so I wrote some simple type definitions, they could definitely be improved but it gets the job done for now.

Just clone the repo if you want to try it out yourself. \
`git clone git@github.com:KurozeroPB/polka-typescript.git && cd polka-typescript`

Then install the modules with either commands, I prefer yarn \
`yarn install` or `npm install`

Test using \
`yarn test` or `npm run test`

Once started you can test the routes \
These are all GET requests: \
`http://localhost:8080/api` will show you info about the server and it's routes \
`http://localhost:8080/api/test?name=pepijn&age=21` will show `{ "name": "pepijn", "age": "21" }`

These are all POST requests: \
`http://localhost:8080/api/test` with a json body will return a copy of the body you send
