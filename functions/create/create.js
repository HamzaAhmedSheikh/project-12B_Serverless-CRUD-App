// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb")
  q = faunadb.query


const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const client = new faunadb.Client({ secret: process.env.DB_SECRET })
    const obj = JSON.parse(event.body);

    let result = await client.query(
      q.Create(
        q.Collection("messages"), { data: obj }
      )
    )
    console.log("Entry Created and Inserted in Container: " + result.ref.id)
    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
