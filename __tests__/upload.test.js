/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import UploadPhoto from '../components/UploadPhoto';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Photo upload process', () => {

  test('Photo can be uploaded for further processing', async () => {
    render(<UploadPhoto />);

    const file = new File(['I am a photo'], 'photo.png');
    await userEvent.click(screen.getByTestId('imageUpload'), { target: { file: [file]}});
    expect(screen.getByTestId('imageUpload').file.length).toBeGreaterThan(0);
  });

});