# Police Occurrence Suggestion (Pinecone Test)

This is a test Pinecone project, the idea is just a simple api that saves an police occurrence in a vector database and retrieves it based on the way that that operator types the new one.

To make it faster for the operator to tag the occurrence.

## Setup

```sh
# install packages
npm install
# run
bun ./src/index.ts
# run with watch
bun ./src/index.ts --watch
```

- Create an account on [Pinecone](https://www.pinecone.io)
- Create a new project and put the API key in the `.env` file

## Using

| Method | Endpoint           | Description                                |
| ------ | ------------------ | ------------------------------------------ |
| POST   | /occurrence        | Create a new occurrence                    |
| POST   | /occurrence/search | Retrieve the occurrence based on the issue |

- Create a new occurrence just to populate the database:

```sh
curl --location 'http://localhost:3000/occurrence' \
--header 'Content-Type: application/json' \
--data '{
    "issue": "someone stole my phone",
    "tag": "theft"
}'
```

- Retrieve the occurrence:

```sh
curl --location 'http://localhost:3000/occurrence/search' \
--header 'Content-Type: application/json' \
--data '{
    "issue": "someone get something from me",
}'
```

## What is a vector database?

A vector database is a database that stores vectors, which are arrays of numbers. These numbers represent the features of an object. For example, a vector representing an image might contain the pixel values of the image. A vector representing a text document might contain the word frequencies in the document.

- https://www.youtube.com/watch?v=klTvEwg3oJ4
- https://www.youtube.com/watch?v=iw2TeYESnTk
