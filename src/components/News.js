import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "science",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props) {
    super(props);

    console.log("hello i am a constructor from news component");
    this.state = {
      //   articles: this.articles,above defined earlier and this below api has 38 articles and 18 next page need next btn
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    //impo
    document.title = `${this.capitalFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  updatePage = async () => {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf3df9af4e7341d68faf2499e3b8c777&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles.length);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  async componentDidMount() {
    this.updatePage();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf3df9af4e7341d68faf2499e3b8c777&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
    });
  };
  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updatePage();
  };
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updatePage();
  };
  render() {
    //1 row and indise make three cols - 12 grid col of boot strap 4 *3 12
    //  full space return inside  render and in fn and return
    return (
      <div
        className="   
      container my-3"
      >
        <h1 className="text-center">
          NewsMonkey - Top Headlines from{" "}
          {this.capitalFirstLetter(this.props.category)} category
        </h1>
        {this.state.loading && <Spinner></Spinner>}

        {/* 
        You're correct in observing that the loading state is initially set to true in the componentDidMount method and then immediately set to false after fetching the data. This might seem counterintuitive, but it serves an important purpose in providing a smooth user experience.

Here's how it works:

Initial State: When the component mounts, the loading state is set to true, indicating that data is being fetched.

Rendering with Spinner: While loading is true, the component's render method will display the loading spinner (<Spinner>). This is achieved with the conditional rendering in the render method:

jsx
Copy code
{this.state.loading && <Spinner></Spinner>}
When loading is true, the <Spinner> component will be rendered. Otherwise, it won't be rendered.

Data Fetching: Inside componentDidMount, data is fetched asynchronously. While the data is being fetched, loading is set to true.

Data Fetched: Once the data fetching is complete, the loading state is set to false, indicating that the loading process has finished.

Re-rendering: Since the state has been updated (loading is now false), React re-renders the component. This time, the loading spinner won't be rendered because this.state.loading is false.

So, even though loading is set to false immediately after the data is fetched, the spinner will still appear during the initial rendering while the data is being fetched. This ensures that users see a loading indicator until the data is ready to be displayed, providing feedback that something is happening in the background.
        ==it means when loading true then show spinner  if 1st condition is false not go to 2nd and both true then display and oppp in case of or - if loading true dont want to display content and if loadingf is false want to diaplay content 
        see the confusion. Let me clarify the sequence of events:

Component Mounting Begins: When the component is mounted, React first calls the constructor method.

Constructor Execution: In the constructor, initial state is set, but no rendering occurs at this point.

ComponentDidMount: After the constructor, React calls the componentDidMount method. This method is used for actions that need to be performed after the component is mounted and rendered for the first time.

Data Fetching: Inside componentDidMount, data fetching is initiated. At this point, loading state is set to true to indicate that data is being fetched.

State Update: After the data is fetched, the state is updated with the fetched data, and loading is set to false to indicate that data fetching is complete.

Re-rendering: After the state update, React triggers a re-rendering of the component.

Render Method Execution: Now, the render method is executed again. Since loading is now false, the conditional rendering for the spinner ({this.state.loading && <Spinner></Spinner>}) no longer evaluates to true, so the spinner is not rendered.

UI Update: The UI is updated with the fetched data, and the component is now displayed with the news articles.

So, the componentDidMount method is responsible for setting loading to true initially, but it's updated to false after the data is fetched. The render method doesn't execute again until after the state is updated, so loading being set to false does not affect the initial rendering of the spinner.


User
still not get how render method going to execute ad how the condition become true for spinner becuse irt sets to fslse
ChatGPT
I see the confusion now. Let's break it down:

Initial Render: When the component mounts, React renders the component initially. At this point, loading is true because it's set to true in the constructor. Therefore, the spinner will render because the condition {this.state.loading && <Spinner></Spinner>} evaluates to true.

ComponentDidMount: After the initial render, componentDidMount is called. Inside this method, data fetching is initiated, and loading remains true.

Data Fetching: While data is being fetched, loading remains true.

Data Fetched: After the data is fetched, the state is updated. loading is set to false now because data fetching is complete.

Re-render: After the state update, React triggers a re-render of the component.

Second Render: During the re-render, the render method is called again. However, this time loading is false because it was updated in the state. Therefore, the condition {this.state.loading && <Spinner></Spinner>} evaluates to false. As a result, the spinner will not render.

So, to clarify, the condition for rendering the spinner becomes false during the re-render after the data is fetched and the state is updated. This is because loading is set to false in the state. During the initial render and the initial execution of componentDidMount, loading is true, so the spinner renders.

Let's go through the sequence of rendering and re-rendering in the provided code:

Initial Rendering: When the component is mounted for the first time, it goes through an initial rendering process.

First Render: During the initial render, the constructor is called, setting the initial state. Then, the render method is executed to render the component UI. Since loading is initially set to false in the state, the spinner is not rendered during this initial render.

ComponentDidMount: After the initial render, componentDidMount lifecycle method is called. Inside it, data fetching is initiated, and loading is set to true.

Data Fetching and State Update: Data fetching is performed asynchronously. Once the data is fetched successfully, the state is updated with the fetched articles, loading is set back to false, and the component is re-rendered.

Second Render: During the re-render, the render method is executed again. This time, loading is false because it was updated in the state. Therefore, the condition {this.state.loading && <Spinner></Spinner>} evaluates to false, and the spinner is not rendered.

So, in total, there are two renders: the initial render when the component is mounted and a re-render after the data is fetched and the state is updated. During these renders, the spinner is rendered only once, during the initial render, when loading is true.

User
each time whe the state chaged compoet re render 
ChatGPT
Yes, you're correct. Each time the state changes, React triggers a re-render of the component to reflect the updated state in the UI.

In the provided code:

The initial render occurs when the component is mounted.
After the data is fetched and the state is updated (specifically, when loading is toggled from true to false), React triggers a re-render to reflect this change in the UI.
So, in total, there are two renders:

The initial render when the component is mounted.
A re-render after the data is fetched and the state is updated.
During each of these renders, the component's render method is executed to generate the updated UI based on the current state.



        */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* !this.state.loading && */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    ></NewsItem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
         
        </div> */}
      </div>
    );
  }
}
{
  /* if it will be in newsitem then i each cart there will betn */
}
{
  /* button will disabled when condition is true */
}

export default News;
