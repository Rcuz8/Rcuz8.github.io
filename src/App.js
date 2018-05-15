import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import axios from 'axios';
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Parallax, Background } from 'react-parallax';
import { Col, Row, Grid, DropdownButton, MenuItem, ButtonToolbar, Well, Navbar, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import Plot from 'react-function-plot';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer, AreaChart, Area, ReferenceLine, Cell, BarChart, Bar, LabelList} from 'recharts';
import Typing from 'react-typing-animation';
import TypeWriter from 'react-typewriter';
import Moment from 'react-moment';
import imgs from './ImgFactory.js';
import sample from './SampleData.js';
import Web3 from 'web3';
var LOCALHOST_URL =  "http://127.0.0.1:8080/";
var HEROKU_URL = 'https://gentle-crag-38927.herokuapp.com';
var COINAPI = HEROKU_URL + "/tradeInfo";
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
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

function log(str) {
  console.log('(Z) ' + str)
}


class MyCustomChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    var data = JSON.stringify(props.data);
    console.log('this.state.data is now: ' + data)
  }
  render() {
    return (
    <ResponsiveContainer width="90%" height={300}>
    <LineChart data={this.props.data}
          margin={{top: 30, right: 0, left: 0, bottom: 5}}>
     <XAxis dataKey="name"/>
     <YAxis/>
     <Tooltip/>
     <Legend />
     <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{r: 8}}/>
     {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
    </ResponsiveContainer>
  )};
}

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tradingFrom: 'Trading From',
      tradingTo: 'Trading To',
      result: '...',
      activeFunction: '2x',
      data: {}
    };
    this.retrieveValue = this.retrieveValue.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.updateTradingTo = this.updateTradingTo.bind(this);
    this.updateTradingFrom = this.updateTradingFrom.bind(this);

  }

  updateResult(str) {
    if (str != null) {
      this.setState({
        result: str,
      });
    }
  }
  updateTradingTo(str) {
    if (str != null) {
      this.setState({
        tradingTo: str,
      });
    }
  }
  updateTradingFrom(str) {
    if (str != null) {
      this.setState({
        tradingFrom: str,
      });
    }
  }

  retrieveValue() {
    console.log('App: retrieveValue executed...');

    let to = this.state.tradingTo;
    let from = this.state.tradingFrom;

    if (to != 'Trading To' && from != 'Trading From' && to != from) {
      let symbol = to + from;
      console.log("Submitting symbol: " + symbol);
      //  Make Server Request
      axios.get(COINAPI, {
            params: {
                tradingTo: to,
                tradingFrom: from,
            }
        }).then((response) => {
          var unformatted_data = response.data;
          var data = JSON.stringify(unformatted_data);
      //      chartData = data;
      console.log('then (response)');
            ReactDom.render(<MyCustomChart data={unformatted_data} className='MyCustomChart'/>, document.getElementById('chahts'));

        })
        .catch((error) => {
          console.log(error);
          this.updateResult("ERROR");
        });
    } else {
      alert('Bag is NOT secured...');
    }
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
       //    this.getPizzas();
       //    this.getRobots();
         }
       })
   }

  render() {
    return (
      <div className="App">

        <Parallax className='par'
          blur={6}
          bgImage={imgs.fox}
          bgImageAlt="Fox"
          strength={200}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <TypeWriter typing={0.3} style={{margin: '10px'}}>
              <span style={{font: '60px courier'}}>Welcome, friend.</span>
            </TypeWriter>
          <div style={{ height: '200px' }} />
        </Parallax>
        <Jumbotron id='firstJumbo'>
          <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
              <h2 className="App-Text">The following is a <strong>Ryan Cocuzzo </strong>website.</h2>
          </ScrollAnimation>
        </Jumbotron>
        <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
          <Grid>
        <Row className="show-grid">
          <Col xs={12} md={4} className="isAColumn">
              <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={sample.data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	sample.data03.map((entry, index) => <Cell fill={sample.PINK_COLORS[index % sample.PINK_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
            <h1>Connectivity</h1>
            <p> Connection is fundamental in any product. In our distributed peer-to-peer systems, we place a heavy emphasis on connections by connecting our connections. We supplement this by further connecting the connections that connect the connections.</p>
            </ScrollAnimation>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
            <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={sample.data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	sample.data03.map((entry, index) => <Cell fill={sample.BLUE_COLORS[index % sample.BLUE_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
          </ScrollAnimation>
            <h1>Responsiveness</h1>
            <p> Agility. Reactivity. Quickness. Each of these are characteristics of a Pronghorn Antelope. We accesorize our products with the lightweight, logically-efficient code and robust APIs in a similar way in which one could accesorize an antelope.</p>
          </Col>
          <Col xs={12} md={4} className="isAColumn">
              <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={sample.data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	sample.data03.map((entry, index) => <Cell fill={sample.RED_COLORS[index % sample.RED_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>
            <h1>Explosiveness</h1>
            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </ScrollAnimation>
          </Col>
        </Row>
          </Grid>
      </ScrollAnimation>
      <div className="exchange-view">

      <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
        <Grid>
          <Row>
            <Col xs={0} md={5} lg={5} id='exchCol'>
                <div class="exchRateLbl">Exchange Rate Charting</div>
            </Col>
            <Col xs={12} md={7} lg={7}>
            <ButtonToolbar className="toolbar">
              <DropdownButton
                bsStyle={'default'}
                title={this.state.tradingTo}
                key={1}
                id={`tradeToDD`}
                className='xx'
              >
                <MenuItem eventKey="1" onClick={() => {this.updateTradingTo('ETH')}}>ETH</MenuItem>
                <MenuItem eventKey="2" onClick={() => {this.updateTradingTo('LTC')}}>LTC</MenuItem>
                <MenuItem eventKey="3" onClick={() => {this.updateTradingTo('BTC')}}>BTC</MenuItem>

              </DropdownButton>
              <DropdownButton
                bsStyle={'default'}
                title={this.state.tradingFrom}
                key={2}

                id={`tradeFromDD`}
              >
                <MenuItem eventKey="1" onClick={() => {this.updateTradingFrom('USD')}}>USD</MenuItem>
                <MenuItem eventKey="2" onClick={() => {this.updateTradingFrom('ETH')}}>ETH</MenuItem>
                <MenuItem eventKey="3" onClick={() => {this.updateTradingFrom('LTC')}}>LTC</MenuItem>
                <MenuItem eventKey="4" onClick={() => {this.updateTradingFrom('BTC')}}>BTC</MenuItem>
              </DropdownButton>
                <Button id={`retrVal`} bsStyle={'default'} onClick={this.retrieveValue}> Retrieve Value </Button>
              </ButtonToolbar>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Grid>

        <br></br>



      <div id="chahts"></div>

      <br></br><br></br>
      </ScrollAnimation>
      </div>
      <Parallax className='par'
        blur={6}
        bgImage={imgs.bg2}
        bgImageAlt="bg2"
        strength={300}
        >
          <br></br>
          <br></br>
          <h2>Great 2001 Investments</h2>
          <br></br>
          <br></br>
          <br></br>

          <br></br>

        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <img src={imgs.google} className="constrained"></img>
            </Col>
            <Col xs={6} md={6}>
              <img src={imgs.btc} className="constrained"></img>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <img src={imgs.ibm} className="constrained"></img>
            </Col>
            <Col xs={6} md={6}>
              <img src={imgs.amazon} className="constrained"></img>
            </Col>
          </Row>
        </Grid>
        <div style={{ height: '100px' }} />
      </Parallax>

        {/* <div className="TXTAREA">
          <p className="TA-p">{this.state.result}</p>
        </div> */}
        <br></br>
        <h3 className='new-section'>
          Source Code
        </h3>
        <hr></hr>
        <Well bsSize="large">
          <pre>
          <code>
            <xmp id="container">

              &lt;xmp &gt;
              &lt;ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0}&gt; &#13;
                          &lt;p&gt;something can never be nothing ball&lt;/p&gt; &#13;
                          &lt;h4&gt;something can never be nothing ball&lt;/h4&gt; &#13;
                          &lt;h4&gt;something can never be nothing ball&lt;/h4&gt; &#13;

                      &lt;/ScrollAnimation&gt;
              &lt;/xmp &gt;

            </xmp>
          </code>
        </pre>
        </Well>
        <br></br>
        <br></br>
        <br></br>
        <h2>Data Analytics</h2>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ScrollAnimation animateIn="slideInRight" animateOnce={true} viewport={1} duration={1} delay={0} className="scroll">
          <Grid>
            <Row className="show-grid">

              <Col xs={12} md={6} className="isAColumn">
            <h1>Our Sales Projections</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={sample.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Net Profit" stackId='a' fill="#8884d8" />
                 <Bar dataKey="Our Money" stackId='a' fill="#82ca9d" />

              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            <Col xs={12} md={6} className="isAColumn">
            <h1>Our Competitors</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={sample.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Opponent Money" stackId='b' fill="#8884d8" />
                 <Bar dataKey="Opponent Success" stackId='b' fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            </Row>
            <Row className="show-grid">

              <Col xs={12} md={6} className="isAColumn">
            <h1>Our Sales Projections</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={sample.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Net Profit" stackId='a' fill="#8884d8" />
                 <Bar dataKey="Our Money" stackId='a' fill="#82ca9d" />

              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            <Col xs={12} md={6} className="isAColumn">
            <h1>Our Competitors</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={sample.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid/>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Opponent Money" stackId='b' fill="#8884d8" />
                 <Bar dataKey="Opponent Success" stackId='b' fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <p> The most dispositional value of the custom solutions we offer is stability. Although we operate predominantly in the software industry, we do extensive testing to make sure our products rate amongst the lowest in explosiveness. This ensures our clients use the most stabile software in the industry.</p>
            </Col>
            </Row>
          </Grid>
      </ScrollAnimation>

        <hr></hr>

        <div id="wb" style={{height: 700}}>
          <br></br>
          <h2 style={{color: 'black'}}>Our Process</h2>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Grid style={{height: 700}}>
            <Col xs={12} md={6} lg={6}>


            <Row>
              <ScrollAnimation animateIn="bounceIn" viewport={1} duration={1} delay={0} className="scroll">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart onMouseEnter={this.onPieEnter}>
              <Pie stroke="none" fill="red"
                data={sample.data03}
                className='pie2'
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={0}
              >
              	{
                	sample.data03.map((entry, index) => <Cell fill={sample.PINK_COLORS[index % sample.PINK_COLORS.length]}/>)
                }
              </Pie>
              <Tooltip/>
            </PieChart>
            </ResponsiveContainer>

            <h1 style={{color: 'black'}}>Connectivity</h1>
            <p style={{color: 'darkgrey'}}> Connection is fundamental in any product. In our distributed peer-to-peer systems, we place a heavy emphasis on connections by connecting our connections. We supplement this by further connecting the connections that connect the connections.</p>
            </ScrollAnimation>
            </Row>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <ScrollAnimation animateIn='fadeInUp'
                animateOut='fadeOutDown' offset={300}>
                <img src={imgs.blkImg} id='custom-img-1'></img>
              </ScrollAnimation>
            </Col>

          </Grid>



          </div>

      </div>
    );
  }
}



export default App;
