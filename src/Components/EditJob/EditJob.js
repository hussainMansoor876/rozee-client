import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'
import './EditJob.css'
import { countries, roles } from '../../Config/constants'
import { message } from 'antd'

class EditJob extends Component {

    state = {
        currentJob: {
            ID: "",
            jobTitle: "",
            jobDescription: "",
            location: "",
            role: "",
        },
        jobs: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        showCandidates: false,


    }

    // static getDerivedStateFromProps(props) {
    //     if (props.myJobs.length) {
    //         return {
    //             jobs: props.myJobs,
    //             isLoading: false,
    //             successMessage: props.successMessage,
    //         }
    //     }

    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.myJobs.length) {
            this.setState({
                jobs: nextProps.myJobs,
                isLoading: false,
                successMessage: nextProps.successMessage,
            })
        }

        if (nextProps.isError) {
            return message.error(nextProps.errorMessage)
        }


        if (nextProps.successMessage === "Job Updated") {
            message.success(nextProps.successMessage)
            let currentJob = {
                ID: "",
                jobTitle: "",
                jobDescription: "",
                location: "",
                role: "",
            }

            this.setState({ currentJob, isLoading: false })
            this.props.getPostedJobs()

        }

    }


    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.getPostedJobs()
    }

    updateSetter = (ID, jobTitle, jobDescription, location, role, ) => {
        let currentJob = {
            ID,
            jobTitle,
            jobDescription,
            location,
            role,
        }
        this.setState({ currentJob })

    }


    handleChange = event => {
        const { currentJob } = this.state
        currentJob[event.target.name] = event.target.value
        this.setState({ currentJob })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { currentJob } = this.state
        const updatedJob = currentJob;

        this.setState({ isLoading: true, })
        this.props.updatedNewJob({
            jobId: updatedJob.ID,
            title: updatedJob.jobTitle,
            role: updatedJob.role,
            location: updatedJob.location,
            desc: updatedJob.jobDescription,
        })

    }


    render() {
        const { currentJob, jobs, } = this.state
        return (
            <main role="main">
                <section className="panel important ">
                    <h2>Edit Job</h2>
                    <h6 className="mt-0" style={{ margin: '1rem' }}>Select a job to edit</h6>

                    <div className="form-style-6 panel important">
                        <form onSubmit={this.handleSubmit}>

                            <label htmlFor="jobTitle">Job Title</label>
                            <input type="text" onChange={this.handleChange} value={currentJob.jobTitle} name="jobTitle" placeholder="Your Name" />

                            <label htmlFor="jobDescription">Job Description</label>
                            <input type="text" onChange={this.handleChange} value={currentJob.jobDescription} name="jobDescription" placeholder="Email Address" />

                            <label htmlFor="location">Location</label>
                            <select value={currentJob.location} name="location" onChange={this.handleChange}>
                                {countries.map((item, idx) => (
                                    <option key={idx} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                            <label htmlFor="role">Role</label>
                            <select value={currentJob.role} name="role" onChange={this.handleChange}>
                                {roles.map((item, idx) => (
                                    <option key={idx} value={item.position}>{item.position}</option>
                                ))}
                            </select>

                            <input type="submit" value="Update"></input>
                        </form>
                    </div>

                    <table>
                        <tbody >
                            <tr className="table-header">
                                <th>S.No</th>
                                <th>Job Title</th>
                                <th>Job Description</th>
                                <th>Location</th>
                                <th>Role</th>
                                <th>Posted On</th>
                            </tr>
                            {jobs.map((item, idx) => (
                                <React.Fragment key={item._id} >
                                    <tr style={{ cursor: 'pointer' }} onClick={() => this.updateSetter(
                                        item._id,
                                        item.jobTitle,
                                        item.jobDescription,
                                        item.location,
                                        item.role,
                                    )}>
                                        <td>{idx + 1}</td>
                                        <td>{item.jobTitle}</td>
                                        <td>{item.jobDescription}</td>
                                        <td>{item.location}</td>
                                        <td>{item.role}</td>

                                        <td>{new Date(item.createdAt).toDateString()}</td>
                                    </tr>


                                </React.Fragment>

                            ))}



                        </tbody>
                    </table>
                </section>
            </main>
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
        },

        updatedNewJob: (data) => {
            dispatch(jobMiddleware.updateNewJob(data))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditJob)
