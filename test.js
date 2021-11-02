const arr = [1, 2, 3, 1, 3, 4, 5, 1, 3];

const new_arr = [];

let key_index = 0;
for (let i = 1; i < arr.length; i++) {
  if (arr[i] === 1) {
    new_arr.push(arr.slice(key_index, i));
    key_index = i;
  }
}
new_arr.push(arr.slice(key_index, arr.length));
console.log(new_arr);
