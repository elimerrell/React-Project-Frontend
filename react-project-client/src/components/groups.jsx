import React, { Component } from "react";
import Container from "react-bulma-components/lib/components/container";

const GROUPS = "http://localhost:3000/api/v1/groups";
class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.getGroups();
  }

  getGroups = () => {
    fetch(GROUPS)
      .then(resp => resp.json())
      .then(groups =>
        this.setState({
          groups
        })
      );
  };

  mapGroups = () => {
    return this.state.groups.map(group => {
      return (
        <div className="circle-row">
          <div className="circle">{/* <h1>{group.name}</h1> */}</div>
        </div>
      );
    });
  };

  render() {
    return <Container>{this.mapGroups()}</Container>;
  }
}

export default Groups;
