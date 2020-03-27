const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`Could not find that file...`);
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(`Could not write the file...`);
      resolve(`File write succesfuly`);
    });
  });
};

const getDogPicture = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // const result = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    const result1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const result2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const result3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const allPromises = await Promise.all([
      result1Promise,
      result2Promise,
      result3Promise
    ]);

    const images = allPromises.map(promise => promise.body.message);
    // console.log(result.body.message);

    await writeFilePromise('dog-img.txt', images.join('\n'));
    console.log(`Random dog images saved to file`);
  } catch (error) {
    console.log(error);
    throw error;
  }

  return `2. Pictures are ready`;
};

(async () => {
  try {
    console.log(`1. Preparing to get dog pictures`);
    let picture = await getDogPicture();
    console.log(picture);
    console.log(`3. Done getting dog pictures`);
  } catch (error) {
    console.log('ERROR...BOOM!');
  }
})();

/* 
readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePromise('dog-img.txt', res.body.message);
  })
  .then(() => console.log(`Random dog image saved to file`))
  .catch(err => console.log(err.message));
  */
