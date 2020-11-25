// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb")
  q = faunadb.query

const handler = async (event) => {
  try {
    const client = new faunadb.Client({ secret: process.env.DB_SECRET })
    var result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("messages"))),
        q.Lambda(x => q.Get(x))
      )
    )
     console.log("Result ==> ", result.data);
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
