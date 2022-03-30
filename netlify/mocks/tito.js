const data = {
  12345 : {
    name: "Phil Hawksworth"
  },
  23456 : {
    name: "Jason Lengstorf"
  },
  34567 : {
    name: "Cher"
  },
  45678 : {
    name: "Zach Leatherman"
  }
}

exports.query = (id) => {
  return data[id];
}