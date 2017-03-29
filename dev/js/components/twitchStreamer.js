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
      <Row className="is-table-row">
        <Col xs={4} sm={2} className="is-table-col">
          <Image src={this.props.img} responsive />
        </Col>
        <Col xs={8} sm={10} className="is-table-col">
          <Row>
            <Col xs={12} sm={4}>
                <p className="">{this.props.name} ({this.props.user})</p>
            </Col>
            <Col xs={12} sm={8} className="inner">
              <p><strong>{this.props.game}</strong><br />{this.props.status}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
