'use strict';

import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import TwitchStreamer from './twitchStreamer';
import '../../css/style.css';

let streamers = ["medrybw", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

// let streamers = ["ESL_SC2", "medrybw", "freecodecamp"];

let baseUrl = "https://wind-bow.glitch.me/twitch-api";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      streamersInfo: [],
      streams: []
    };
  }

  componentDidMount() {
    // this.testTwitchRequests();
    this.requestTwitch();
  }

  apiCall(parm) {
    return axios.get(baseUrl + parm);
  }

  testTwitchRequests() {
    // let apiCalls = [this.apiCall("/streams/freecodecamp"), this.apiCall("/users/freecodecamp"), this.apiCall("/channels/freecodecamp")];
    let apiCalls = [this.apiCall("/streams/ESL_SC2"), this.apiCall("/streams/medrybw")];

    let responses = [];
    axios.all(apiCalls).then((responses) => {
      responses.map((response, index) => {
        console.log(JSON.stringify(response.data));
        console.log("------------------------------------");
      })
    }).catch((error) => {
      console.log("error axios: " + error);
    });
  }

  requestTwitchUsers() {
    let apiCalls = [];
    streamers.map((user, index) =>{
      apiCalls[index] = this.apiCall("/users/" + user);
    });

    let responses = [];
    axios.all(apiCalls).then((responses) => {
      responses.map((response, index) => {
        let currentState = this.state.streamersInfo;
        currentState[index] = {
          "name": response.data.display_name,
          "user": streamers[index],
          "img": response.data.logo
        };
        this.setState({
          streamersInfo: currentState
        });
      });
    }).catch((error) => {
      console.log("error axios1: " + error);
    });
  }

  requestTwitchStreams() {
    let apiCalls = [];
    streamers.map((user, index) =>{
      apiCalls[index] = this.apiCall("/streams/" + user);
    });

    let responses = [];
    axios.all(apiCalls).then((responses) => {
      responses.map((response, index) => {
        // console.log("responses.map ---> " + JSON.stringify(response.data));
        if (response.data.stream) {
          console.log("responses.map ---> " + index + ": " + JSON.stringify(response.data.stream.channel.game));
          console.log("---------------------------------------------");
          let currentState = this.state.streams;
          currentState[index] = {
            "status": response.data.stream.channel.status,
            "game": response.data.stream.channel.game
          };
          this.setState({
            streams: currentState
          });
        } else {
          console.log("stream is null for index=" + index);
        }
      });
    }).catch((error) => {
      console.log("error axios2: " + error);
    });
  }

  requestTwitch() {
    this.requestTwitchUsers();
    this.requestTwitchStreams();
  }

  createAllStreamers() {
    return this.state.streamersInfo.map((streamer, index) => {
      let game = "";
      let status = "offline";
      if (this.state.streams[index]) {
        game = this.state.streams[index].game;
        status = this.state.streams[index].status;
      }
      return <TwitchStreamer
              key={index}
              name={streamer.name}
              img={streamer.img}
              user={streamers[index]}
              game={game}
              status={status}
            />;
      // return <p key={index}>nothing here</p>;
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
            <Col xs={10} xsOffset={1}>
              <Tabs defaultActiveKey={1} id="tabs">
                <Tab eventKey={1} title="All" className="streamers">
                  {this.createAllStreamers()}
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
