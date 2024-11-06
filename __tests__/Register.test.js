import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Registerrr } from '../app/register'; // Asegúrate de que la ruta sea correcta
import { View, Text } from 'react-native';

describe('Registerrr renderizado', () => {
  it('debería renderizar correctamente el componente de Registerrr', () => {
    const { getByText, getByPlaceholderText } = render(<Registerrr />);

    // Verifica que el título y campos se rendericen correctamente
    expect(getByText('Register')).toBeTruthy();
    expect(getByText('Nombre de usuarioo')).toBeTruthy();
    expect(getByText('Correoo electrónicoc')).toBeTruthy();
    expect(getByText('Contraseñaa')).toBeTruthy();
    expect(getByText('Registrarsee')).toBeTruthy();
    expect(getByPlaceholderText('Ingrese su nombre de usuarioo')).toBeTruthy();
    expect(getByPlaceholderText('Ingrese su correoo')).toBeTruthy();
    expect(getByPlaceholderText('Ingrese su contraseñaa')).toBeTruthy();

    console.log('Prueba de renderizado exitosa');
  });

  it('debería llamar a la función onPress del botón Registrarsee', () => {
    const { getByText } = render(<Registerrr />);

    // Mock de console.log
    const consoleLogSpy = jest.spyOn(console, 'log');

    const button = getByText('Registrarsee');
    fireEvent.press(button);

    // Verificar que console.log fue llamado con 'Registro iniciado'
    expect(consoleLogSpy).toHaveBeenCalledWith('Registro iniciado');

    // Restaurar console.log después de la prueba
    consoleLogSpy.mockRestore();
  });
});
