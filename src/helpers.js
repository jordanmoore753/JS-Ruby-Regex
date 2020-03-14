import React from 'react';

const helper = {
  createHighlightElement: function(data, reg) {
    const keys = Object.keys(data);
    const o = reg.o + 'g';
    const r = reg.r;
    const s = reg.s;
    const regex = new RegExp(r, o);

    let sHighlight = s.replace(regex, `<span class='highlight'>$&</span>`);
    return { __html: sHighlight };
  },

  createJSHighlight: function(data, reg, str) {
    let s = str.replace(reg, `<span class='highlight'>$&</span>`);
    return { __html: s };
  },

  matchJS: function(regex, str) {
    let array = [...str.matchAll(regex)];
    let n = [];
    let obj;

    array.forEach(function(sub) {
      obj = { match: undefined, groups: [] };

      sub.forEach(function(e, i) {
        if (i === 0) {
          obj.match = e;
        } else {
          obj.groups.push(e);
        }
      });
      
      n.push(obj);
    });

    return n;
  },

  groupJS: function(data) {
    let res = [];

    data.forEach(function(obj) {
      obj.groups.forEach(function(group) {
        res.push(group);
      });
    });

    return this.makeLiJS(res);
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

  makeLiJS: function(arr) {
    if (arr.length === 0) {
      return { __html: "<li>No groups found.</li>" };
    }

    let str = '';

    arr.forEach(function(s) {
      str += `<li>${s}</li>`;
    });

    return { __html: str };
  },

  makeListElements: function(arr) {
    if (arr.length === 0) {
      return { __html: "<li>No groups found.</li>" };
    }

    let str = '';

    arr.forEach(function(s) {
      str += `<li>${s.slice(1, s.length - 1)}</li>`;
    });

    return { __html: str };
  },

  isError: function(json) {
    if (json['ERROR_915_JM_111']) {
      return true;
    }

    return false;
  },

  createErrorMsg: function(json) {
    let str = json['ERROR_915_JM_111'];
    return str[0].toUpperCase() + str.slice(1);
  }
};

export default helper;