import React from 'react';
import logo from './logo.svg';
import Helper from './helpers';

class App extends React.Component {
  state = {
    regexText: '(regex|string|String)',
    options: '',
    strText: "String to match.\nstring.",
    matchText: { __html: '<p>No matching results to show.</p>' },
    groupMatches: { __html: '<li>No captured groups.</li>' },
    language: 'Ruby'
  };

  handleLangChange = (e) => {
    this.setState({ language: e.target.value });
  };

  regexChange = (e) => {
    this.setState({ regexText: e.target.value });
  };

  optionChange = (e) => {
    this.setState({ options: e.target.value });
  };

  textChange = (e) => {
    this.setState({ strText: e.target.value });
  };

  matchChange = (data) => {
    this.setState({ matchText: data });
  };

  groupChange = (data) => {
    this.setState({ groupMatches: data });
  };

  fetchJavascript = (data) => {
    let regex;

    if (!data.opt.includes('g')) {
      data.opt += 'g';
    }

    try {
      regex = new RegExp(data.regex, data.opt);
    } catch(error) {
      this.matchChange({ __html: '<p>Invalid regex.</p>'});
      return this.groupChange({ __html: '<li>No group results.</li>'});
    }

    let results = Helper.matchJS(regex, data.string);
    let element = Helper.createJSHighlight(results, regex, data.string);
    let g = Helper.makeLiJS(results.groups);

    this.matchChange(element);
    this.groupChange(g);   
  };

  fetchResults = (e) => {
    e.preventDefault();

    let data = {
      'regex': this.state.regexText,
      'string': this.state.strText.split('\n'),
      'opt': this.state.options
    };

    if (this.state.language === 'JavaScript') {
      return this.fetchJavascript(data);
    }

    let self = this;

    fetch('https://glacial-dusk-32569.herokuapp.com/test', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(function(json) {
      if (Helper.isError(json)) {
        self.matchChange({ __html: Helper.createErrorMsg(json) });
        self.groupChange({ __html: '<li>No captured groups.</li>'});
        return;
      }

      let paragraphs = '';
      let g = Helper.getGroups(json.groups);
      json.match.forEach((para) => paragraphs += para);

      self.matchChange({ __html: paragraphs });
      self.groupChange(g);
    })
    .catch(function(error) {
      self.matchChange({ __html: 'Error on the server side. Contact admin at: jordanmoore753@gmail.com.'});
      self.groupChange({ __html: '<li>No group results.</li>'});
    });
  };

  render() {
    const currLang = this.state.language;

    return (
      <div className="App">
        <select value={currLang} onChange={this.handleLangChange} className="lang-choice">
            <option value="Ruby">Ruby</option>
            <option value="JavaScript">JavaScript</option>
        </select>
        <div className="place-slash" data-placeholder='/'>
          <p className="trans-slash-one">/</p>
          <input 
            type="text"
            className="left-regex"
            title="Regex"
            value={this.state.regexText}
            onChange={this.regexChange}
            onBlur={this.fetchResults}
          />
        </div>
        <div className="place-slash" data-placeholder='/'>
          <p className="trans-slash-two">/</p>
          <input
            type="text"
            className="right-regex"
            title="Options"
            value={this.state.options}
            onChange={this.optionChange}
            onBlur={this.fetchResults}
            maxLength='6'
          />
        </div>
        <textarea
          className="string-text"
          title="String"
          value={this.state.strText}
          onChange={this.textChange}
          onBlur={this.fetchResults}
        />
        <p className="dots">. . .</p>
        <section 
          className="left-output" 
          title="Match Output" 
          dangerouslySetInnerHTML={this.state.matchText} />
        <section className="right-output" title="Group Output">
          <ul dangerouslySetInnerHTML={this.state.groupMatches} />
        </section>
      </div>
    );    
  }
}

export default App;
