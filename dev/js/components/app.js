'use strict';

import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import TwitchStreamer from './twitchStreamer';
import '../../css/style.css';

let streamers = ["medrybw", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

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
    let apiCalls = [this.apiCall("/users/freecodecamp"), this.apiCall("/users/storbeck"), this.apiCall("/users/brunofin"), this.apiCall("/users/comster404"), ];

    let responses = [];
    axios.all(apiCalls).then((responses) => {
      responses.map((response, index) => {
        console.log(JSON.stringify(response.data));
        if (response.data.error) {
          console.log(index + ": ERROR ---> " + response.data.error);
          console.log("------------------------------------");
        }
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
        let hasAccount = true;
        if (response.data.error) {
          hasAccount = false;
        }
        currentState[index] = {
          "hasAccount": hasAccount,
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
        if (response.data.stream) {
          let currentState = this.state.streams;
          let url = null;
          if (response.data.stream.channel) {
            url = response.data.stream.channel.url;
          }
          currentState[index] = {
            "status": response.data.stream.channel.status,
            "game": response.data.stream.channel.game,
            "url": url
          };
          this.setState({
            streams: currentState
          });
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
      return this.createTwitchStreamerComponent(streamer, index);
    });
  }

  createOnlineStreamers() {
    return this.state.streamersInfo.map((streamer, index) => {
      if ( ! streamer.hasAccount || ! this.state.streams[index]) {
        return null;
      }
      return this.createTwitchStreamerComponent(streamer, index);
    });
  }

  createOfflineStreamers() {
    return this.state.streamersInfo.map((streamer, index) => {
      if ( ! streamer.hasAccount || this.state.streams[index]) {
        return null;
      }
      return this.createTwitchStreamerComponent(streamer, index);
    });
  }

  createTwitchStreamerComponent(streamer, index) {
    let game = "";
    let status = "offline";
    let url = null;
    if (this.state.streams[index]) {
      game = this.state.streams[index].game;
      status = this.state.streams[index].status;
      url = this.state.streams[index].url;
    }
    return <TwitchStreamer
            key={index}
            name={streamer.name}
            img={streamer.img}
            user={streamers[index]}
            game={game}
            status={status}
            hasAccount={streamer.hasAccount}
            url = {url}
          />;
  }

  render() {
    return(
      <div>
        <Grid className="content">
          <Row>
            <Col xs={10} xsOffset={1}>
              <h1>
                Free Code Camp - Use the Twitchtv JSON API<br />
                <small>by <a href="http://www.daveyx.ga" target="_blank" title="daveyx">daveyx</a></small>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <Tabs defaultActiveKey={1} id="tabs">
                <Tab eventKey={1} title="All" className="streamers">
                  {this.createAllStreamers()}
                </Tab>
                <Tab eventKey={2} title="Online">
                  {this.createOnlineStreamers()}
                </Tab>
                <Tab eventKey={3} title="Offline">
                  {this.createOfflineStreamers()}
                </Tab>
              </Tabs>
            </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <hr />
                <footer>
                  Sourcecode at github.com: <a href="https://github.com/daveyx/fcc-twitchtv" title="Sourcecode" target="_blank">click</a><br />
                Demo at github.com: <a href="https://daveyx.github.io/fcc-twitchtv/" title="Demo" target="_blank">click</a>
                </footer>
              </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
