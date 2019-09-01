import React, { Component } from 'react'
import { Modal } from 'antd'



class JobModal extends Component {

    state = {
        visible: this.props.visible ? true : false,
        showCandidates: this.props.showCandidates ? true : false
    }

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



    render() {

        const { CVS, jobTitle, jobDescription, salary, createdAt } = this.props
        return (
            <div>
                <Modal
                    title={jobTitle}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >
                    <div>
                        <h6><b>Job Title:</b> {jobTitle}</h6>
                        <h6><b>Job Description:</b> {jobDescription}</h6>
                        <h6><b>Salary:</b> ${salary}</h6>
                        <h6><b>Posted On:</b> {new Date(createdAt).toDateString()}</h6>

                        <button onClick={this.handleCandidates}>View Candidates</button>

                        {this.state.showCandidates && <table>
                            <tr>
                                <th>Email</th>
                                <th>CV</th>

                            </tr>
                            {CVS.map(CV => (
                                <tr>
                                    <td>{CV.email}</td>
                                    <td><a href={CV.cvLink}>Download CV</a></td>

                                </tr>
                            ))}
                        </table>}

                    </div>

                </Modal>
            </div>
        )
    }
}

export default JobModal
