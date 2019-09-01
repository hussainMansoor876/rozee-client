/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware';
import { Modal } from 'antd'
import JobModal from '../JobModal/JobModal'

class Dashboard extends React.Component {


  state = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    myJobs: [],
    showCandidates: false
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };



  handleLogout = () => {
    SessionStorageManager.clearSessionStorage();
    window.location.reload()
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.props.getPostedJobs()
  }

  static getDerivedStateFromProps(props, state) {

    if (props.myJobs.length) {
      return {
        myJobs: props.myJobs,
        isLoading: false,
        successMessage: props.successMessage
      }
    }
  }

  handleCandidates = () => {
    this.setState({ showCandidates: true })
  }




  render() {
    const user = SessionStorageManager.getUser()
    const { myJobs } = this.state
    // console.log(this.props.myJobs)
    console.log(this.state.myJobs)
    return (
      <div >
        <div>
          <header role="banner">
            <h1>Admin Panel</h1>
            <ul className="utilities">
              <li className="users"><a href="#">{user.fullName}</a></li>
              <li className="logout warn"><a onClick={this.handleLogout}>Log Out</a></li>
            </ul>
          </header>
          <nav role="navigation">
            <ul className="main">
              <li className="dashboard"><a href="#">Dashboard</a></li>
              <li className="write"><a href="#">Write Post</a></li>
              <li className="edit"><a href="#">Edit Posts</a></li>
              <li className="comments"><a href="#">Comments</a></li>
              <li className="users"><a href="#">Manage Users</a></li>
            </ul>
          </nav>
          <main role="main">
            <InfoCard title="Welcome to your dashboard" active items={[
              {
                desc: "New Jobs"
              },
              {
                desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
              },
              {
                desc: "Aliquam tincidunt mauris eu risus."
              }
            ]} />

            <section className="panel important ">
              <h2>Jobs</h2>

              <table>
                <tbody >
                  <tr>
                    <th>Job Title</th>
                    <th>Job Description</th>
                    <th>Salary</th>
                    <th>Created At</th>
                  </tr>
                  {myJobs && myJobs.map(item => (
                    <React.Fragment key={item._id}>
                      <tr style={{ cursor: 'pointer' }} onClick={this.showModal}>
                        <td>{item.jobTitle}</td>
                        <td>{item.jobDescription}</td>
                        <td>{item.salary}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                      </tr>

                      <JobModal
                        CVS={item.CVS}
                        jobTitle={item.jobTitle}
                        jobDescription={item.jobDescription}
                        salary={item.salary}
                        createdAt={item.createdAt} />

                    </React.Fragment>

                  ))}
                </tbody></table>
            </section>

            {/* <section className="panel important">
              <h2>Welcome to Your Dashboard </h2>
              <ul>
                <li>Important panel that will always be really wide Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit.</li>
                <li>Aliquam tincidunt mauris eu risus.</li>
                <li>Vestibulum auctor dapibus neque.</li>
              </ul>
            </section> */}
            <InfoCard title="Jobs" items={[{ imp: "100", desc: "New Jobs" }]} />
            <InfoCard title="Chart" items={[
              {
                desc: "New Jobs"
              },
              {
                desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
              },
              {
                desc: "Aliquam tincidunt mauris eu risus."
              }
            ]} />


            <section className="panel important">
              <h2>Write a post</h2>
              <form action="#">
                <div className="twothirds">
                  <label htmlFor="name">Text Input:</label>
                  <input type="text" name="name" id="name" placeholder="John Smith" />
                  <label htmlFor="textarea">Textarea:</label>
                  <textarea cols={40} rows={8} name="textarea" id="textarea" defaultValue={""} />
                </div>
                {/* <div className="onethird">
                  <legend>Radio Button Choice</legend>
                  <label htmlFor="radio-choice-1">
                    <input type="radio" name="radio-choice" id="radio-choice-1" defaultValue="choice-1" /> Choice 1
          </label>
                  <label htmlFor="radio-choice-2">
                    <input type="radio" name="radio-choice" id="radio-choice-2" defaultValue="choice-2" /> Choice 2
          </label>
                  <label htmlFor="select-choice">Select Dropdown Choice:</label>
                  <select name="select-choice" id="select-choice">
                    <option value="Choice 1">Choice 1</option>
                    <option value="Choice 2">Choice 2</option>
                    <option value="Choice 3">Choice 3</option>
                  </select>
                  <div>
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" id="checkbox" /> Checkbox
            </label>
                  </div>
                  <div>
                    <input type="submit" defaultValue="Submit" />
                  </div>
                </div> */}
              </form>
            </section>
            <section className="panel">
              <h2>feedback</h2>
              <div className="feedback">This is neutral feedback Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Alias, praesentium. Libero perspiciatis quis aliquid iste quam dignissimos, accusamus temporibus ullam
                voluptatum, tempora pariatur, similique molestias blanditiis at sunt earum neque.</div>
              <div className="feedback error">This is warning feedback
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                </ul>
              </div>
              <div className="feedback success">This is positive feedback</div>
            </section>

          </main>
          <footer role="contentinfo">Easy Admin Style by Melissa Cabral</footer>
        </div>

      </div>
    )
  }
}










const mapStateToProps = (state) => {
  return {

    isLoading: state.jobs.isLoading,
    isError: state.jobs.isError,
    errorMessage: state.jobs.errorMessage,
    successMessage: state.jobs.successMessage,
    myJobs: state.jobs.myJobs,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostedJobs: () => {
      dispatch(jobMiddleware.getPostedJobs())
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

// export default Dashboard;
