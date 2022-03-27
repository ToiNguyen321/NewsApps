import React from 'react'
import { StyleSheet, View, ActivityIndicator, ActivityIndicatorProps } from 'react-native'

interface LoaderPositionProps extends ActivityIndicatorProps {
    isLoading: Boolean,
    size?: 'large' | 'small'
}

export default function LoaderPosition({ isLoading, ...props }: LoaderPositionProps) {
    if (!isLoading) return null;
    return (
        <View style={styles.container}>
            <ActivityIndicator {...props} />
        </View>
    )
}

LoaderPosition.defaultProps = {
    isLoading: false,
    size: 'large'
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    }
})
