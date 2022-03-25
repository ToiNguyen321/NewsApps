import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './MainTabs';

function MainNavigator() {
    return (
      <NavigationContainer>
       <MainTabs />
      </NavigationContainer>
    );
  }

  export default MainNavigator;