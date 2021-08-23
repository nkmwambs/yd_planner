import React from 'react'
import { Image } from 'react-native'

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 218, height: 90 }}
            source={require('../../Image/logo.png')}
        />
    )
}

export default LogoTitle;