const fs = require("fs");

fs.readFile("../sample-text/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");

  fs.readFile(`../sample-text/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile("../sample-text/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("../sample-text/final.txt", `${data2}\n${data3}`, "utf-8", err => {
        console.log(`Your file has been written`);
      });
    });
  });
});

console.log("Will read file");
