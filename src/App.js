import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import _ from 'lodash';

import WatchList from './components/watch_list/watch_list_dash';
import StockView from './components/stock_view/stock_view_dash';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStock: null,
    }

    this.setSelected = this.setSelected.bind(this);
  }

  componentDidMount() {
    const selected = document.getElementsByClassName('selected');
    console.log(selected);
  }

  setSelected(stock) {
    const symbol = stock[0];
    stock = _.merge({}, stock[1]);
    this.setState((state, props) => {
      return {
        ...state,
        selectedStock: stock,
      }
    })
  }

  render() {
    return (
      <Router>
        <main className="App">
          <header className="App-header">
          </header>
          <div className="sidebar">
            <WatchList setSelected={this.setSelected}/>
          </div>
          <div className="content">
            <Route path="/stocks/:symbol"
              render={(props) => <StockView {...props} selectedStock={this.state.selectedStock}/>} />
          </div>
        </main>
      </Router>
    );
  }
}

// export const Chart = (props) => {
//   // debugger
//   const stockDetails = () =>
//   console.log();
//   if (props.selectedStock) {
//     return (
//       <div className="mock__chart">
//         <div className="">{props.match.params.symbol}</div>
//         <div className="display-selected">
//         </div>
//       </div>
//     )
//   } else {
//     return <h1>Loading...</h1>
//   }
// }

export default App;



// const App = () => {
//   _.unset(selectedStock);
//   // selectedStock = selectedStock || null;
//   return (
//     <Router>
//       <main className="App">
//         <header className="App-header">
//         </header>
//         <div className="sidebar">
//           <WatchList setSelected={setSelected.bind(this)}/>
//         </div>
//         <div className="content">
//           <Route path="/stocks/:symbol" component={Chart} />
//         </div>
//       </main>
//     </Router>
//   )
// }
