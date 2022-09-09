exports.handler = async function(event, context){
  return {
    statusCode : 200,
    body : JSON.stringify({
      name : "Hino",
      age : 85,
      email : "chh5946@gmail.com"
    })
  }
}