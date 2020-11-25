// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb")
  q = faunadb.query

const handler = async (event) => {
  try {
    const client = new faunadb.Client({ secret: process.env.DB_SECRET });    
    const obj = JSON.parse(event.body);

    var result = await client.query(
      q.Update(
       q.Ref(
        q.Collection("messages"), obj.id), {
          data: { message: obj.message },
      })
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${obj.message}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
