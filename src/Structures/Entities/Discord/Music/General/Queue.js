class Queue extends Array {
  add (title, url, requester) {
    if (typeof title !== 'string') throw new Error(`Queue#add requires two arguments and both of them are a string\nGot: ${typeof str}`);
    if (typeof url !== 'string') throw new Error(`Queue#add requires two arguments and both of them are a string\nGot: ${typeof str}`);
    this.push({
      title,
      url,
      requester
    });
    return true;
  }

  remove (num) {
    if (typeof num !== 'number') throw new Error(`Queue#remove requires one argument and it is a string\nGot: ${typeof num}`);
    return this.splice(num, 1)[0];
  }
}

module.exports = Queue;

// eslint-disable-next-line no-unused-vars
function group (arr, num) {
  if (typeof num !== 'number') throw new Error('Argument is not a number!');
  let newArr = [];
  while (arr.length !== 0) {
    newArr.push([...arr.slice(0, (arr.length) >= num ? num : arr.length)]);
    arr = arr.slice(num);
  }
  return newArr;
}
