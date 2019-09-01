/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware';
import { Modal } from 'antd'

class Dashboard extends React.Component {


  state = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    myJobs: [],
    showCandidates: false,
    visible: false,
    currentJob: {}
  }


  showModal = (title, desc, salary, date, CVS) => {

    var currentJob = {
      jobTitle: title,
      jobDescription: desc,
      salary,
      createdAt: date,
      CVS,
    }

    this.setState({
      visible: true,
      currentJob
    });
  };


  handleOk = e => {
    this.setState({
      visible: false,
      showCandidates: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      showCandidates: false
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
    const { myJobs, visible, currentJob } = this.state
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
                  {myJobs.map(item => (
                    <React.Fragment key={item._id} >
                      <tr style={{ cursor: 'pointer' }} onClick={() => this.showModal(
                        item.jobTitle,
                        item.jobDescription,
                        item.salary,
                        item.createdAt,
                        item.CVS
                      )}>
                        <td>{item.jobTitle}</td>
                        <td>{item.jobDescription}</td>
                        <td>{item.salary}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                      </tr>


                    </React.Fragment>

                  ))}

                  <Modal
                    title={currentJob.jobTitle}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                  >
                    <div className="modal-desc">
                      <h6><b>Job Title:</b> {currentJob.jobTitle}</h6>
                      <h6><b>Job Description:</b> {currentJob.jobDescription}</h6>
                      <h6><b>Salary:</b> ${currentJob.salary}</h6>
                      <h6><b>Posted On:</b> {new Date(currentJob.createdAt).toDateString()}</h6>

                      <button onClick={this.handleCandidates}>View Candidates</button>

                      {this.state.showCandidates && <table>
                        <tr>
                          <th>Email</th>
                          <th>CV</th>

                        </tr>
                        {currentJob.CVS.map(CV => (
                          <tr key={CV._id}>
                            <td>{CV.email}</td>
                            <td><a href={CV.cvLink}>Download CV</a></td>
                          </tr>
                        ))}
                      </table>}

                    </div>

                  </Modal>

                </tbody>
              </table>
            </section>


            <InfoCard title="Jobs" items={[{ imp: "100", desc: "New Jobs" }]} />
            <InfoCard title="Chart" items={[
              { desc: "New Jobs" },
              { desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." },
              { desc: "Aliquam tincidunt mauris eu risus." }
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
