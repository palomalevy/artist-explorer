import React from 'react'
import SuggestedBox from './SuggestedBox'
import Logout from '../../Logout'

const RightSideNav = () => {
  return (
    <>
        <section className="rightNavColumn">
            <div>RightSideNav</div>
            <section className="suggestions">
                <h4>Suggestions</h4>
                <SuggestedBox />
            </section>
            <Logout />
        </section>
    </>
    
  )
}

export default RightSideNav