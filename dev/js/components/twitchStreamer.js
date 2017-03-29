'use strict';

import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default class TwitchStreamer extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    return(
      <Row className="match-my-cols">
        <Col xs={4} md={2}>
          <Image src={this.props.img} responsive />
        </Col>
        <Col xs={8} md={4}>
          <p>{this.props.name} ({this.props.user})</p>
        </Col>
        <Col xs={12} md={6}>
          <p><strong>{this.props.game}</strong><br />{this.props.status}</p>
        </Col>
      </Row>
    );
  }
}
