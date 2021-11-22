import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import AccountBalance from './components/AccountBalance';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 100,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      debits: [],
      credits: [],
      }
    }
  }
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    
    debits = debits.data
    credits = credits.data
    
    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  }
  
  addDebit = (e) => {
    e.preventDefault();
    const descriptionD = e.target[0].value;
    const amountD = Number(e.target[1].value);
    console.log(descriptionD, amountD);

{/*
  57-67:
    I am making a new array that is able to contain all of the items in the debits 
    array plus the new one that was just added by the user (I will later replace the original debits array with this new one).
    I am then using a for loop to iterate through each of the debits array entries and 
    assign the debits array's value to the new triii array.
*/}
    let num = Number(this.state.debits.length);
    let triii = [num];

    for (const[w] of this.state.debits.entries()) {
      triii[w] = this.state.debits[w];
    }

{/*
  71-81:
    I am now copying an arbitrary element (I just chose the 0th element) from the debits 
    array to the last/new index of triii (so that the new item can have all of the same 
    properties (amount, date, id, etc) and I will edit the properties individually to be the new item's value.
    I am also changing the id to be a unique number (d for the addDebits and c for the addCredits, 
    along with the number of the index (11, 12, 13, etc...)).
*/}
    triii[num] = {...this.state.debits[0]};
    triii[num].amount = amountD;
    triii[num].description = descriptionD;
    triii[num].id = triii.length+"d";
{/*
  84-93:
    I am just using functions to re-arrange the date in the proper format, and assiging
    that formatted date to the date property of the new triii item.
    The last step is to use the setState function to replace the current debits array with the new one.
*/}
    let oldDate = new Date();
    let dayVar = oldDate.getDate();
    let monVar = oldDate.getMonth();
    let yearVar = oldDate.getFullYear();
    triii[num].date = yearVar+'-'+(monVar+1)+'-'+dayVar;
    this.setState({debits: triii});

{/*
  The last two lines are calculating the new account balance and using the setState function
  to replace the current accountBalance value with the updated one.
*/}
    let y = this.state.accountBalance - amountD;
    this.setState({accountBalance: y});
  }
  
  addCredit = (e) => {
    e.preventDefault();
    const descriptionC = e.target[0].value;
    const amountC = Number(e.target[1].value);
    console.log(descriptionC, amountC);
    
{/* 
  Process is the same as the addDebits function, just using credits instead of debits,
  and adding to the accountBalance instead of subtracting.
*/}
    let n = this.state.credits.length;
    let subCredArr = [n];
    for (const[c] of this.state.credits.entries()) {
      subCredArr[c] = this.state.credits[c];
    }

    subCredArr[n] = {...this.state.credits[0]};
    subCredArr[n].amount = amountC;
    subCredArr[n].description = descriptionC;
    subCredArr[n].id = subCredArr.length+"c";
    let old_Date = new Date();
    let day_Var = old_Date.getDate();
    let mon_Var = old_Date.getMonth();
    let year_Var = old_Date.getFullYear();
    subCredArr[n].date = year_Var+'-'+(mon_Var+1)+'-'+day_Var;
    console.log(subCredArr[n]);
    this.setState({credits: subCredArr});

    let r = this.state.accountBalance + amountC;
    this.setState({accountBalance: r});
  }
  
  render() {
    const {debits} = this.state;
    const {credits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} />);
      const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={credits}/>);
    return (
      <Router>
{/*
  I am using <div> to make the acocuntBalance show up, and I'm including line 150 in App.js's
  render function so that the balance will be visible on all pages with the most up-to-date amount
*/}
      <div>
        <AccountBalance accountBalance={this.state.accountBalance}/>
      </div>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/Login" render={LogInComponent}/>
          <Route exact path="/Debits" render={DebitsComponent}/>
          <Route exact path="/Credits" render={CreditsComponent}/>
        </Switch>
      </Router>
      );
  }
}

export default App;
