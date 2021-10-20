import React from 'react'
import Posts from './Posts'
import Users from './Users'



const Home = () => {
    return (
        <div className="container">
            <div className="row g-0">
                <div className="col-sm-12 col-md-7 my-3">
                    <Posts/>
                </div>
                <div className="col-sm-12 col-md-5 my-3">
                    <Users/>
                </div>
            </div>
        </div>
    )
}

export default Home
