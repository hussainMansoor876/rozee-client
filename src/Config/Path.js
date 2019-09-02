class Path {

    // static BASE_URL = "https://rozee-server.herokuapp.com"

    static BASE_URL = "http://localhost:3001"

    static USER_LOGIN = Path.BASE_URL + "/auth/login"

    static GET_MY_JOBS = Path.BASE_URL + "/job/getPostedJobs"

    static POST_JOB = Path.BASE_URL + "/job/addNewJob"

}

export default Path