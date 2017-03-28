'use strict';

import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import '../../css/style.css';

export default class App extends React.Component {

  componentDidMount() {
    console.log("---> did mount");
  }

  render() {
    return(
      <div>
        <Grid className="content">
          <Row>
            <Col xs={6} xsOffset={3}>
              <h1>Free Code Camp - Use the Twitchtv JSON API</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Tabs defaultActiveKey={1} id="tabs">
                <Tab eventKey={1} title="All">Tab 1 content</Tab>
                <Tab eventKey={2} title="Online">Tab 2 content</Tab>
                <Tab eventKey={3} title="Offline">Tab 3 content</Tab>
              </Tabs>
            </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
