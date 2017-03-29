'use strict';

import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import '../../css/style.css';

// let streamers = ["medrybw", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

let streamers = ["ESL_SC2", "freecodecamp"];
let baseUrl = "https://wind-bow.glitch.me/twitch-api";

export default class App extends React.Component {

  componentDidMount() {
    this.testTwitchRequests();
  }

  apiCall(parm) {
    return axios.get(baseUrl + parm);
  }

  testTwitchRequests() {
    let apiCalls = [this.apiCall("/streams/freecodecamp"), this.apiCall("/users/freecodecamp"), this.apiCall("/channels/freecodecamp")];

    let responses = [];
    axios.all(apiCalls).then((responses) => {
      responses.map((response, index) => {
        console.log(index + ": " + JSON.stringify(response.data));
        console.log("------------------------------------");
      })
    }).catch((error) => {
      console.log("error axios: " + error);
    });
  }

  requestTwitch() {
    let apiCalls = [];
    streamers.map((user, index) =>{
      apiCalls[index] = this.apiCall("/streams/" + user);
    });

    let responses = [];
    axios.all(apiCalls).then((responses) => {
        console.log(responses[0].data);
        console.log("------------------------------------");
        console.log(responses[1].data);
    }).catch((error) => {
      console.log("error axios: " + error);
    });
  }

  render() {
    return(
      <div>
        <Grid className="content">
          <Row>
            <Col xs={10} xsOffset={1}>
              <h1>Free Code Camp - Use the Twitchtv JSON API</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Tabs defaultActiveKey={1} id="tabs">
                <Tab eventKey={1} title="All">
                  Tab 1 content
                </Tab>
                <Tab eventKey={2} title="Online">
                  Tab 2 content
                </Tab>
                <Tab eventKey={3} title="Offline">
                  Tab 3 content
                </Tab>
              </Tabs>
            </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
