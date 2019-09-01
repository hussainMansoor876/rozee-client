import * as actionTypes from './Types';

export const getMyJobs = () => { 
    return {
        type: actionTypes.GEY_MY_JOBS,
    }
}

export const getMyJobsSuccess = (data) => { 
    return {
        type: actionTypes.GEY_MY_JOBS_SUCCESS,
        data
    }
}


export const getMyJobsFail = (data) => { 
    return {
        type: actionTypes.GEY_MY_JOBS_FAIL,
        data
    }
}
