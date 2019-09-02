import React, { Component } from 'react'

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { Button } from 'antd'
import { connect } from 'react-redux'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './PostJob.css'
import htmlToText from 'html-to-text';
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'

class PostJob extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        rawHtml: "",
        jobTitle: "",
        salary: 0,
        loading: false,
        disabled: false
    };


    static getDerivedStateFromProps(props) {

        console.log("NEW PROPS", props)

    }

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let html = stateToHTML(contentState);

        const text = htmlToText.fromString(html, {
            wordwrap: 130
        });

        this.setState({
            editorState,
            rawHtml: text
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { jobTitle, salary, rawHtml } = this.state
        this.setState({ loading: true, disabled: true })
        this.props.postJob({ jobTitle, salary, rawHtml })
    }

    render() {
        const { editorState, jobTitle, salary, disabled } = this.state


        return (
            <main role="main">
                <section className="panel">
                    <h2>Post A Job</h2>
                    <form  >
                        <div className="post-form" >
                            <label htmlFor="jobTitle">Job Title</label>
                            <input value={jobTitle} onChange={this.handleChange} type="text" name="jobTitle" id="jobTitle" placeholder="Need a MERN Developer" />

                            <label htmlFor="salary">Salary</label>
                            <input value={salary} onChange={this.handleChange} type="number" name="salary" id="salary" ></input>

                            <label htmlFor="textarea">Description</label>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="editor-toolbar"
                                wrapperClassName="editor-wrapper"
                                editorClassName="editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />

                            <Button type="primary mt-2 w-100" disabled={disabled} onClick={this.handleSubmit}>Post</Button>
                            {/* {ReactHtmlParser(rawHtml)} */}
                            {/* <textarea cols={40} rows={8} name="textarea" id="textarea" defaultValue={""} /> */}
                        </div>


                    </form>
                </section>
            </main >
        )
    }
}



const mapStateToProps = (state) => {
    return {

        isLoading: state.jobs.isLoading,
        isError: state.jobs.isError,
        errorMessage: state.jobs.errorMessage,
        successMessage: state.jobs.successMessage,
        // myJobs: state.jobs.myJobs,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postJob: (data) => {
            dispatch(jobMiddleware.postJob(data))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PostJob)
