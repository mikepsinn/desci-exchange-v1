// noinspection ES6ConvertVarToLetConst

const assets = '../assets';
const fs = require('fs');

function removeBetween(newFileName, startStr) {
  var arr = newFileName.split(startStr);
  var length = 0;
  var longest;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length > length) {
      length = arr[i].length;
      longest = arr[i];
    }
  }
  return longest;
}

function removeUUID(file) {
  let newFileName = file;
  let ext = file.split('.').pop();
  newFileName = newFileName.replace(`.${ext}`, '');
  newFileName = removeBetween(newFileName, '-');
  newFileName += `.${ext}`;
  return newFileName;
}

function trimFileName(file) {
  let newFileName = file;
  let ext = file.split('.').pop();
  newFileName = newFileName.replace(`.${ext}`, '');
  newFileName = reverseString(newFileName);
  newFileName = newFileName.substring(0, 70);
  newFileName = reverseString(newFileName);
  newFileName += `.${ext}`;
  return newFileName;
}

fs.readdirSync(assets).forEach((folder) => {
  fs.readdirSync(`${assets}/${folder}`).forEach((file) => {
    if (file.length < 70) return;
    console.log(file);
    let newFileName = removeUUID(file);
    newFileName = trimFileName(newFileName);
    if (newFileName === file) {
      return;
    }
    fs.renameSync(
      `${assets}/${folder}/${file}`,
      `${assets}/${folder}/${newFileName}`
    );
  });
});

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(''); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(''); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}
