import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import Header from '../Header'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusContent.initial, courseList: []}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const fetchdata = await response.json()
      const update = fetchdata.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logoUrl,
      }))
      this.setState({
        courseList: update,
        apiStatus: apiStatusContent.success,
      })
    }
  }

  onClickRetry = () => {
    this.getCourses()
  }

  renderFailureView = () => (
    <div className="errorView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="errorImg"
      />
      <h1 className="errorHeading">Oops! Something Went Wrong</h1>
      <p className="errorPara">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.onClickRetry} className="retryBtn">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseList = () => {
    const {courseList} = this.state
    return (
      <div className="courseContainer">
        <h1 className="heading">Courses</h1>
        <ul className="courseItemsList">
          {courseList.map(each => (
            <CourseItem key={each.id} courseItemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderCourse = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderCourseList()
      case apiStatusContent.failure:
        return this.renderFailureView()
      case apiStatusContent.inProgress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <Header />
        {this.renderCourse()}
      </div>
    )
  }
}

export default Home
