import './App.css';
import { PrController } from './PrController';
import { PullRequest } from './PullRequest';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = { load: false }
    this.pr_api = new PrController()

  }
  componentDidMount() {
    this.pr_api.fetchData().then((data) => {
      this.setState({ load: true, data: data })
    })
  }
  render() {
    if (this.state.load) {
      return (
        <div className="App">
          <PullRequest all_prs={this.state.data} />
        </div>
      );
    }
    return (<div></div>);
  }

}

export default App;
