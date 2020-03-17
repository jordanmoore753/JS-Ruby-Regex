const helper = {
  createJSHighlight: function(data, reg, str) {
    let newStrings = [];

    str.forEach(function(s) {
      newStrings.push(s.replace(reg, `<span class='highlight'>$&</span>`));
    });

    let r;

    newStrings = newStrings.map(function(s) {
      if (s === '') {
        return '<br>';
      }

      r = '<p>';
      r += s + '</p>';
      return r;
    });

    let res = '';

    newStrings.forEach((p) => res += p);
    return { __html: res };
  },

  matchJS: function(regex, str) {
    let res = [];

    str.forEach(function(s) {
      res.push([...s.matchAll(regex)]);
    });

    let obj = { match: [], groups: [] };

    res.forEach(function(sub) {
      sub.forEach(function(e) {
        e.forEach(function(inn, i) {
          if (i === 0) {
            obj.match.push(inn);
          } else {
            obj.groups.push(inn);
          }
        });
      });
    });

    return obj;
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