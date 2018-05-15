import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Parallax, Background } from 'react-parallax';
import { Form, FormControl, FormGroup, Checkbox, ControlLabel, Col, Row, Grid, DropdownButton, Jumbotron, MenuItem, Button, ButtonToolbar, Well, Navbar, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import imgs from './ImgFactory.js';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
//import Plot from 'react-function-plot';
//import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer, AreaChart, Area, ReferenceLine, Cell, BarChart, Bar, LabelList} from 'recharts';
import Typing from 'react-typing-animation';
import TypeWriter from 'react-typewriter';
//import Moment from 'react-moment';
//import getWeb3 from './utils/getWeb3.js';
import { Web3Provider } from 'react-web3';
import {Helmet} from "react-helmet";
// Using an ES6 transpiler like Babel
import NumericInput from 'react-numeric-input';
// To include the default styles
// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider';
import axios from 'axios';
import Web3 from 'web3';
// To include the default styles
import 'react-rangeslider/lib/index.css'
import './EthApp.css'
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// Pre-Deployed
let pr_contract_address = '0xe8f631b0f5beb2e117bcc2ec9665ef1ff646e848';
let pr_contract_abi =  [
    {
      "constant": true,
      "inputs": [],
      "name": "getRobots",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "pizzaType",
          "type": "uint256"
        }
      ],
      "name": "addPizza",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pizzas",
      "outputs": [
        {
          "name": "_type",
          "type": "uint8"
        },
        {
          "name": "pizzaId",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPizzas",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "robots",
      "outputs": [
        {
          "name": "_type",
          "type": "uint8"
        },
        {
          "name": "robotId",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "addNumber",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "robotType",
          "type": "uint256"
        }
      ],
      "name": "addRobot",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getNumber",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    }
  ];
let pr_contract = new web3.eth.Contract(pr_contract_abi, pr_contract_address);

var URLs = {
  getPizzas: 'http://127.0.0.1:8080/getPizzas',
  getRobots: 'http://127.0.0.1:8080/getRobots',
  addPizza:  'http://127.0.0.1:8080/addPizza',
  addRobot:  'http://127.0.0.1:8080/addRobot',
};
function log(str) {
  console.log('(Z) ' + str)
}
class EthApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      acc: '',
      num: 0,
      min: 0,
      max: 100,
      numberOfRobots: 'N/A',
      numberOfPizzas: 'N/A'
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addPizza = this.addPizza.bind(this);
    this.addRobot = this.addRobot.bind(this);
    this.getPizzas = this.getPizzas.bind(this);
    this.getRobots = this.getRobots.bind(this);
  }
  componentWillMount() {

      web3.eth.getAccounts((error, accounts) => {
        if (accounts.length == 0) {
            // there is no active accounts in MetaMask
            log('Bag not secured, couldn\'t find metamask accounts');
        }
        else {
          log('We found accounts from metamask');
          this.setState ({
            acc: accounts[0],
            num: 0
          });
          let displayed = "ETH Address: " + accounts[0];
          ReactDom.render(displayed, document.getElementById('ETH_ADDR'));
          this.getPizzas();
          this.getRobots();
        }
      })
  }

    addPizza() {
			log('attempting to add pizza...')
			let id = this.state.acc;
			pr_contract.methods.addPizza(1).send({from: id}, function(error, result){
				if (error != null) {
					log('Error logged')
				} else {
					log('callback response: \n { \n' + result + ' \n}');
					this.getPizzas();
				}
			}.bind(this));
    }
    addRobot() {
        log('attempting to add robot...')
        let id = this.state.acc;
        pr_contract.methods.addRobot(1).send({from: id}, function(error, result){
          if (error != null) {
            log('Error logged')
          } else {
            log('callback response: \n { \n' + result + ' \n}');
						this.getRobots();
          }
        }.bind(this));
    }

    getPizzas() {
			let id = this.state.acc;
			pr_contract.methods.getPizzas().call({from: id}, function(error, result){
				if (error != null) {
					log('Error logged')
				} else {
					log('callback response: \n { \n' + result + ' \n}');
	//				ReactDom.render(<h1>{result}</h1>, document.getElementById('numPizzas'));
						this.setState({
							numberOfPizzas: result
						})

				}
			}.bind(this));
    }

		getRobots() {
			let id = this.state.acc;
			pr_contract.methods.getRobots().call({from: id}, function(error, result){
				if (error != null) {
					log('Error logged')
				} else {
					log('callback response: \n { \n' + result + ' \n}');
	//				ReactDom.render(<h1>{result}</h1>, document.getElementById('numRobots'));
					this.setState ({
						numberOfRobots: result
					});
				}
			}.bind(this));
    }

  handleOnChange = (valueAsNumber) => {
      this.setState({
        num: valueAsNumber
      })
  }

  render() {

    return (
      <div className="EthApp">
        <Web3Provider>
        <Helmet bodyAttributes={{style: 'background : linear-gradient(to top, #3494E6 , #EC6EAD); background-repeat: no-repeat;'}}/>
        <div className='mainView' style={{height: 2000, margin: '15px'}}>
          <br></br><br></br><br></br><br></br><br></br>
          <TypeWriter typing={0.3}>
            <span style={{font: '60px courier', color: '#5900b3'}}>This is the 3rd Web...</span>
          </TypeWriter>
          <Grid className='centered'>
            <Row>
							<Col xs={6} sm={3} md={3}>
								<img className='centeredImage' src={imgs.pizza}/>
								<h1 className='centered'><strong>{this.state.numberOfPizzas}</strong></h1>
							</Col>
              <Col xs={6} sm={3} md={3} >
                <a className="btnX" href="#">
                <span onClick={this.addPizza}>ADD</span>
              </a>
              </Col>
							<Col xs={6} sm={3} md={3}>
								<img className='centeredImage' src={imgs.robot}/>
								<h1 className='centered'><strong>{this.state.numberOfRobots}</strong></h1>
							</Col>
              <Col xs={6} sm={3} md={3} >
                <a className="btnX" href="#">
                <span onClick={this.addRobot}>ADD</span>
              </a>
              </Col>
          </Row>
        </Grid>

      <br></br>
        </div>
      </Web3Provider>
      </div>

    );
  }
}



export default EthApp;
