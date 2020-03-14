import React from 'react';
import logo from './logo.svg';
import Helper from './helpers';

class App extends React.Component {
  state = {
    regexText: '',
    options: '',
    strText: '',
    matchText: { __html: 'No results to show.' },
    groupMatches: { __html: '<li>No group results.</li>' }
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
    // const items; // array of groups, convert to list items
    // this.setState({ groupMatches: items });
  };

  fetchResults = (e) => {
    e.preventDefault();

    let data = {
      'regex': this.state.regexText,
      'string': this.state.strText,
      'opt': this.state.options
    };

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
      let d = { o: data.opt, r: data.regex, s: data.string };

      let n = Helper.createHighlightElement(json, d);
      let g = Helper.getGroups(json);

      self.setState({ groupMatches: g });
      self.setState({ matchText: n });
      // handle successful response
    })
    .catch(function(error) {
      console.log(error);
      // handle error
    });
  };

  render() {
    return (
      <div className="App">
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
