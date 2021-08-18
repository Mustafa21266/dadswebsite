import React from 'react'
import { Fragment } from 'react';
const Loader = ({ title }) => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center" style={{height: '100vh'}}>
                <div className="spinner-grow text-danger align-self-center" style={{width: '100px',height: '100px'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Loader


