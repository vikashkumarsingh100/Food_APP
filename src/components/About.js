import React from "react";

import UserClass from "./UseClass";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>This is About Page</h1>

        <UserClass name={"Vikash Kumar Singh"} />
      </div>
    );
  }
}

export default About;
