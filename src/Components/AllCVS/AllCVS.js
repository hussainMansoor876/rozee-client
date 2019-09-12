import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { connect } from 'react-redux'
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'
import Axios from 'axios'
import Path from '../../Config/Path'

class AllCVS extends Component {

    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        allCVS: []
    }

    getAllCVS = async () => {
        const response = await Axios.get(Path.GET_CVS);

        if (!response.data.success) {
            return this.setState({
                errorMessage: response.data.message,
                allCVS: [],
                isLoading: false
            })
        }


        this.setState({ allCVS: response.data.CVS, isLoading: false })

    }


    componentDidMount() {
        this.setState({ isLoading: true })
        this.getAllCVS()
    }


    render() {
        const { allCVS } = this.state
        return (
            <main role="main">
                <section className="panel important ">
                    <h2>All CV's</h2>

                    <table>
                        <tbody >
                            <tr className="table-header">
                                <th>S.No</th>
                                <th>Candidate Name</th>
                                <th>CV</th>
                            </tr>

                            {allCVS.map((item, idx) => (
                                <React.Fragment key={item._id} >
                                    <tr style={{ cursor: 'pointer' }}>
                                        <td>{idx + 1}</td>
                                        <td>{item.candidateName}</td>
                                        <td><a href={item.cvLink}>download CV</a></td>
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


export default AllCVS

