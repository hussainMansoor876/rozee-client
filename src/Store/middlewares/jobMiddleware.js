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
                return dispatch(JobActions.getMyJobsFail({ success: false, errorMessage: response.data.message }))
            }

            dispatch(JobActions.getMyJobsSuccess({ success: false, successMessage: response.data.message, myJobs: response.data.jobs }))
        }).catch(err => {
            dispatch(JobActions.getMyJobsFail({ success: false, errorMessage: "Something went wrong please try again later" }))

        })
    }
}