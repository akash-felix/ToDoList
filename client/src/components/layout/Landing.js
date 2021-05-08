import React from 'react';
import { Link } from 'react-router-dom';
const Landing=()=>{
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>To do list</h1>
                    <p>
                        Create to do list 
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>
                            Sign up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login 
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default Landing;