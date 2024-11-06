import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  mockPush,
} from '@testing-library/react-native';
import Login from '../app/index';
import { useRouter } from 'expo-router';

// Mocks de dependencias
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useNavigation: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
  Stack: {
    Screen: ({ children }) => <>{children}</>, // Mock de Stack.Screen
  },
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    trigger: jest.fn(),
    register: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, TextInput, Text } = require('react-native');

  return {
    Provider: ({ children }) => <View>{children}</View>,
    Portal: ({ children }) => <View>{children}</View>,
    Modal: ({ visible, children }) =>
      visible ? <View>{children}</View> : null,
    Checkbox: ({ status, onPress }) => (
      <View testID="checkbox" onPress={onPress}>
        {status}
      </View>
    ),
    TextInput: ({ label, value, onChangeText }) => (
      <View>
        <Text>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={{ borderColor: 'gray', borderWidth: 1 }}
        />
      </View>
    ),
  };
});



// Definir el mock para `useRouter`
describe('Login renderizado', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  it('should render inputs and button correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText('Inicie sesión con su cuenta')).toBeTruthy();
    expect(getByPlaceholderText('Correo')).toBeTruthy(); // Actualizado
    expect(getByPlaceholderText('Contraseña')).toBeTruthy(); // Actualizado
    expect(getByText('Iniciar Sesión')).toBeTruthy();
  });
  
});
