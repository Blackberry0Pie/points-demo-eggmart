// Egg part of logo from: https://www.freepik.com/macrovector
import logo from './logo.png';
import _ from "lodash";
import React, { useState, useEffect } from "react";
import './App.css';
import Customers from './customers.json';

class App extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      displayTypePoints: false,
      data: [
                { "name": "Abe",       "april": 100, "may":  50, "june":  0 },
                { "name": "Alexandra", "april": 101, "may":   0, "june": 51 },
                { "name": "Benny",     "april":  99, "may":  49, "june":  0 },
                { "name": "Barbara",   "april":  11, "may": 200, "june": 36 },
                { "name": "Tammy",     "april":   0, "may":   0, "june":  0 }
        ],
      rewardData: [],
      displayData: []
    }
    this.rewardsEarned = this.rewardsEarned.bind(this);
    this.moneySpent = this.moneySpent.bind(this);
    this.state.displayData = this.state.data;
  }

  moneySpent (event) {
    this.setState ({displayTypePoints: false})
    this.setState ({displayData: this.state.data})
  }

  rewardsEarned (event) {
    this.setState ({displayTypePoints: true})
    let rewards = _.cloneDeep(this.state.data);
    rewards.forEach((data)=>calculateRewards(data));
    this.setState ({rewardData: rewards})
    this.setState ({displayData: rewards})
  }

  render() {
    const displayTypePoints = this.state.displayTypePoints;
    let tableHeader;
    if (displayTypePoints) {
      tableHeader = "Reward Points";
    } else {
      tableHeader = "Money spent";
    }
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <h2>EggMart Rewards Program</h2>
        <b>{tableHeader}</b>
        <table>
          <thead>
          <tr><th>Customer</th><th>April</th><th>May</th><th>June</th><th>Total</th></tr>
          </thead>
          <tbody>
            {this.state.displayData.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td><td>{item.april}</td><td>{item.may}</td><td>{item.june}</td><td>{item.april + item.may + item.june}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span>Show me the: </span>
        <button onClick={this.rewardsEarned}>
          Rewards
        </button>
        <button onClick={this.moneySpent}>
          Money
        </button>
        <hr></hr>
        <span>Eggcellence is our goal™</span>
      </div>
    )
  }
}

function getRewardPoints(val) {
    if (val > 100) {
      return 2 * (val - 100) + 50;
    } else if (val > 50) {
      return val - 50;
    } else {
      return 0;
    }
  }

function calculateRewards(customer) {
  customer.april = getRewardPoints(customer.april);
  customer.may = getRewardPoints(customer.may);
  customer.june = getRewardPoints(customer.june);
}

export default App;
