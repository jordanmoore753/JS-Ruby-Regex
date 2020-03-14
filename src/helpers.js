import React from 'react';

const helper = {
  createHighlightElement: function(data, reg) {
    const keys = Object.keys(data);
    const o = reg.o;
    const r = reg.r;
    const s = reg.s;
    const regex = new RegExp(r, o + 'g');

    let sHighlight = s.replace(regex, `<span class='highlight'>$&</span>`);
    return { __html: sHighlight };
  },

  getGroups: function(data) {
    let res = [];
    let keys = Object.keys(data);

    keys.forEach(function(key) {
      if (key[0] === '[' && key[key.length - 1] === ']') {
        res.push(key);
      }
    });

    return this.makeListElements(res);
  },

  makeListElements: function(arr) {
    if (arr.length === 0) {
      return { __html: "<li>No groups found.</li>" };
    }

    let str = '';

    arr.forEach(function(s) {
      str += `<li>${s.slice(1, s.length - 1)}</li>`;
    });

    console.log(str);
    return { __html: str };
  }
};

export default helper;