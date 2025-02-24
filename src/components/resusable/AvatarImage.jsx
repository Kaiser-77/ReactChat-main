import React from 'react'
import { colors } from '../../constant/color'

const AvatarImage = ({profileUrl, name, clsName}) => {


    const getColor = (name) => {
        return colors.find(item => item.letter === name.charAt(0).toLowerCase())?.color;
    }

    
    if(profileUrl){
        return <img src={profileUrl} alt={userName} />
    }

    return (
        
        <div style={{ backgroundColor: getColor(name) }} className={clsName}>{name.charAt(0).toUpperCase()}</div>
    )
}

export default AvatarImage
