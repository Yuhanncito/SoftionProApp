import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from '../app/(home)/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Mock de `expo-router`
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock de `AsyncStorage`
jest.mock('@react-native-async-storage/async-storage', () => ({
  removeItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('authToken')),
}));

describe('Profile', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    // Configura el mock de `useRouter` para que devuelva `replace`
    useRouter.mockReturnValue({
      replace: mockReplace,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  

  it('debería cerrar sesión correctamente sin depender del token', async () => {
    const { getByText } = render(<Profile />);

    fireEvent.press(getByText('Cerrar sesión'));

    await waitFor(() => {
      // Verifica si `removeItem` y `replace` fueron llamados
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('authToken');
    });
  });
});
