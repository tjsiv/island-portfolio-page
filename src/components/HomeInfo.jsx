import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from "../assets/icons";





const HomeInfo = ({currentStage}) => {
    const InfoBox = ({text, link, btnText}) => (
        <div className='info-box'>
            <p className='font-medium sm:text-xl text-center'>{text}</p>
            <Link to={link} className=' neo-brutalism-white neo-btn'>
                {btnText}
                <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
            </Link>
        </div>
    )
    
    
    if(currentStage === 1)
        return (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Terrence</span>👋
            <br/>
            A Software Engineer Based out of Las Vegas.
        </h1>
    );
    if(currentStage === 2)
        return (
        <InfoBox
            text="I've had the pleasure of working with many people and teams letting me pick up many Skills along the way."
            link='/about'
            btnText='Learn More'
        />
    );
    if(currentStage === 3)
        return (
        <InfoBox
            text="I've worked on many projects and from a wide range. I'm always looking for a great idea 💡"
            link='/projects'
            btnText='Visit my portfolio'
        />
    )
    if(currentStage === 4) 
        return(
        <InfoBox
            text=" Need a project done or looking for a dev? I'm just a few keystrokes away. ⌨️"
            link='/contact'
            btnText="Let's talk"
        />
    )
    return null;    
    
   
}

export default HomeInfo
