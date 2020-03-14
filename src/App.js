import React from 'react';
import logo from './logo.svg';
import Helper from './helpers';

class App extends React.Component {
  state = {
    regexText: '',
    options: '',
    strText: '',
    matchText: { __html: 'No results to show.' },
    groupMatches: { __html: '<li>No group results.</li>' },
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
      this.matchChange({ __html: 'Invalid regex.'});
      return this.groupChange({ __html: '<li>No group results.</li>'});
    }

    let results = Helper.matchJS(regex, data.string);
    let element = Helper.createJSHighlight(results, regex, data.string);
    let g = Helper.groupJS(results);

    this.matchChange(element);
    this.groupChange(g);   
  };

  fetchResults = (e) => {
    e.preventDefault();

    let data = {
      'regex': this.state.regexText,
      'string': this.state.strText,
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
      // ruby is handled, js must be now
      if (Helper.isError(json)) {
        self.matchChange({ __html: Helper.createErrorMsg(json) });
        self.groupChange({ __html: '<li>No group results.</li>'});
        return;
      }

      let d = { o: data.opt, r: data.regex, s: data.string };
      let n = Helper.createHighlightElement(json, d);
      let g = Helper.getGroups(json);

      self.matchChange(n);
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
        <select value={currLang} onChange={this.handleLangChange}>
            <option value="Ruby">Ruby</option>
            <option value="JavaScript">JavaScript</option>
        </select>
        <input 
          type="text"
          className="left-regex"
          value={this.state.regexText}
          onChange={this.regexChange}
          onBlur={this.fetchResults}
        />
        <input
          type="text"
          className="right-regex"
          value={this.state.options}
          onChange={this.optionChange}
          onBlur={this.fetchResults}
        />
        <textarea
          className="string-text"
          value={this.state.strText}
          onChange={this.textChange}
          onBlur={this.fetchResults}
        />
        <section className="left-output">
          <p dangerouslySetInnerHTML={this.state.matchText}/>
        </section>
        <section className="right-output">
          <ul dangerouslySetInnerHTML={this.state.groupMatches} />
        </section>
      </div>
    );    
  }
}

export default App;
