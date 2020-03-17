import Helper from './helpers.js';

describe('create highlight for JS', () => {
  it('should return an obj with string of paragraph elements', () => {
    const { reg, data, str } = {
      reg: new RegExp('string', 'i'),
      str: ["I love string and STRING."],
      data: { match: ["string", "STRING"], groups: [] }
    };

    const res = Helper.createJSHighlight(data, reg, str);
    expect(res.__html).toEqual('<p>I love <span class=\'highlight\'>string</span> and STRING.</p>');
  });

  it('should substitute a new line with <br>', () => {
    const { reg, data, str } = {
      reg: new RegExp('string', 'i'),
      str: ["I love string and STRING.", '', 'plus string.'],
      data: { match: ["string", "STRING"], groups: [] }
    };

    const res = Helper.createJSHighlight(data, reg, str);
    expect(res.__html).toEqual("<p>I love <span class='highlight'>string</span> and STRING.</p><br><p>plus <span class='highlight'>string</span>.</p>");
  });
});

describe('matchJS method', () => {
  it('should return an obj with matches and groups', () => {
    const { reg, str } = {
      reg: new RegExp('string', 'i'),
      str: "String to match.\nstring.".split('\n')
    };

    const res = Helper.matchJS(reg, str);
    expect(res.match).toEqual(["String", "string"]);
    expect(res.groups).toEqual([]); 
  });

  it('should return an obj with matches and groups', () => {
    const { reg, str } = {
      reg: new RegExp('(blue|black)berry', ''),
      str: "blueberry\nblackberry".split('\n')
    };

    const res = Helper.matchJS(reg, str);
    expect(res.match).toEqual(["blueberry", "blackberry"]);
    expect(res.groups).toEqual(["blue", "black"]); 
  });
});

describe('make list elements method JS', () => {
  it('should return certain list item for empty', () => {
    const data = [];
    const res = Helper.makeLiJS(data);
    expect(res.__html).toEqual('<li>No groups found.</li>');
  });

  it('should return list item for each group captured', () => {
    const data = ['string', 'STRING'];
    const res = Helper.makeLiJS(data);
    expect(res.__html).toEqual('<li>string</li><li>STRING</li>')
  });
})

describe('get groups method', () => {
  it('should extract groups from ruby json', () => {
    const data = {"[blue]": 1, "[black]": 1 };
    const res = Helper.getGroups(data);
    expect(res.__html).toEqual("<li>blue</li><li>black</li>");
  });

  it('should return list item if empty', () => {
    const data = {};
    const res = Helper.getGroups(data);
    expect(res.__html).toEqual("<li>No groups found.</li>");
  })
});

describe('detect error msg method', () => {
  it('should not detect error for valid return', () => {
    const data = {
      match: [],
      groups: []
    };

    expect(Helper.isError(data)).toBe(false);
  });

  it('should detect error for invalid return', () => {
    const data = {
      'ERROR_915_JM_111': 'something msg'
    };

    expect(Helper.isError(data)).toBe(true);
  })
});

describe('create error msg method', () => {
  it('should capitalize first character', () => {
    const data = {
      'ERROR_915_JM_111': 'something msg'
    };

    expect(Helper.createErrorMsg(data)).toEqual('Something msg');    
  });
});