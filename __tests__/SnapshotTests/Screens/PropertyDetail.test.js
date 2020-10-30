import React from 'react'
import { act, create } from 'react-test-renderer'
import PropertyDetail from '../../../src/screens/PropertyDetail'

jest.useFakeTimers()
jest.mock('@expo/vector-icons', () => {
  return {
    ...jest.requireActual('@expo/vector-icons'),
    FontAwesome5: () => jest.fn()
  }
})
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})

describe('PropertyDetail test', () => {

  it('render PropertyDetail screen correctly', () => {
    act(() => {
      tree = create(
        <PropertyDetail />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})