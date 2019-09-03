import * as JobActions from '../actions/jobActions'
import axios from 'axios'
import Path from '../../Config/Path'
import SessionStorageManager from '../../Config/SessionStorageManager';

export const getPostedJobs = () => {
    return dispatch => {
        dispatch(JobActions.getMyJobs());
        const userId = SessionStorageManager.getUser()._id
        axios.post(Path.GET_MY_JOBS, {
            posterId: userId
        }).then(response => {
            if (!response.data.success) {
                return dispatch(JobActions.getMyJobsFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.getMyJobsSuccess({ success: true, message: response.data.message, myJobs: response.data.jobs }))
        }).catch(err => {
            dispatch(JobActions.getMyJobsFail({ success: false, message: "Something went wrong please try again later" }))

        })
    }
}


export const postJob = (data) => { 
    return dispatch => {
        dispatch(JobActions.postJobs());
        const userId = SessionStorageManager.getUser()._id
        axios.post(Path.POST_JOB, {
            posterId: userId,
            jobTitle: data.jobTitle, 
            jobDescription: data.rawHtml,
            location: data.location, 
            role: data.role
        }).then(response => {
            console.log("POST JOB RESPONSE", response)
            if (!response.data.success) {
                return dispatch(JobActions.postJobsFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.postJobsSuccess({ success: true, message: response.data.message }))
        }).catch(err => {
            dispatch(JobActions.postJobsFail({ success: false, message: "Something went wrong please try again later" }))

        })
    }

}