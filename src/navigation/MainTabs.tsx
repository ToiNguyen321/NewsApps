import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Feather from 'react-native-vector-icons/Feather'
import { MainTabsParamsList } from "data/type"
import SCREENS from "./Screens"
import News from "screens/news"
import Mark from "screens/mark"
import { COLORS } from "utils/styleGlobal"

const MainTab = createBottomTabNavigator<MainTabsParamsList>()

export default () => {
  return (
    <MainTab.Navigator
      initialRouteName={SCREENS.MAIN.NEWS}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: String
          let Icon: any

          switch (route.name) {
            case SCREENS.MAIN.NEWS:
              Icon = Feather;
              iconName = focused ? 'home' : 'home';
              break;
            case SCREENS.MAIN.MARK:
              Icon = Feather;
              iconName = focused ? 'bookmark' : 'bookmark';
              break;
            default:
              Icon = Feather;
              iconName = focused ? 'bookmark' : 'bookmark';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: COLORS.GRAY,
        headerShown: false
      })}>
      <MainTab.Screen name={SCREENS.MAIN.NEWS} component={News} options={{
        tabBarLabel: 'World news'
      }} />
      <MainTab.Screen name={SCREENS.MAIN.MARK} component={Mark} options={{
        tabBarLabel: 'Saved'
      }} />
    </MainTab.Navigator>
  )
}

