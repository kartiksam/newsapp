import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export class App extends Component {
  c = "john";
  pageSize = 7;
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  country="in"
                  category="general"
                ></News>
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={this.pageSize}
                  country="in"
                  category="business"
                ></News>
              }
            />
            <Route
              Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={this.pageSize}
                  country="in"
                  category="entertainment"
                ></News>
              }
            />
            <Route
              Route
              exact
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  country="in"
                  category="general"
                ></News>
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={this.pageSize}
                  country="in"
                  category="health"
                ></News>
              }
            />

            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={this.pageSize}
                  country="in"
                  category="science"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={this.pageSize}
                  country="in"
                  category="sports"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={this.pageSize}
                  country="in"
                  category="technology"
                ></News>
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
