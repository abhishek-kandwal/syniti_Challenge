const fs = require("fs");
const file = "./data.json";
let data = "";

const readStream = fs.createReadStream(file);

readStream.setEncoding("UTF8");

// Reading all data in stream
readStream.on("data", function (chunk) {
  data += chunk;
});

// once read stream completed
readStream.on("end", function () {
  // creating a set to hold Unique ids
  let invalidIds = new Set();

  // parsed data to obj
  const parsedData = JSON.parse(data);

  // this is for invalid data with null values
  parsedData.forEach((obj) => {
    if (
      obj.name == "" ||
      obj.name == null ||
      obj.address == "" ||
      obj.address == null ||
      obj.zip == "" ||
      obj.zip == null
    )
      invalidIds.add(obj.id);
  });

  // getting all duplicate records ids
  for (let i = 0; i < parsedData.length; i++) {
    let currentObj = parsedData[i];
    for (let j = i + 1; j < parsedData.length; j++) {
      if (
        currentObj.name === parsedData[j].name &&
        currentObj.address === parsedData[j].address &&
        currentObj.zip === parsedData[j].zip
      ) {
        invalidIds.add(currentObj.id);
        invalidIds.add(parsedData[j].id);
      }
    }
  }

  // printing all the ids either duplicate, null or empty
  for (let invalidId of invalidIds) console.log(invalidId);
});

// if and error comes in our read stream
readStream.on("error", function (err) {
  console.log(err);
});
