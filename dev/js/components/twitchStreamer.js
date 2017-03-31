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
    let status;
    if (this.props.hasAccount) {
      status = this.props.status;
    } else {
      status = "Account not available";
    }
    return(
      <Row className="is-table-row">
        <Col xs={4} sm={2} className="is-table-col">
          {this.props.img ? <Image src={this.props.img} responsive /> : null}
        </Col>
        <Col xs={8} sm={10} className="is-table-col">
          <Row>
            <Col xs={12} sm={4}>
                <p className="">{this.props.name} ({this.props.user})</p>
            </Col>
            <Col xs={12} sm={8}>
              <p><strong>{this.props.game}</strong> {status}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
