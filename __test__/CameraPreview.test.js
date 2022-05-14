import React from 'react';
import '@testing-library/jest-native/extend-expect';
import CameraPreview from '../components/CameraPreview';
import { render } from '@testing-library/react-native';

describe('Camera Preview Component', () => {
  function renderComponent(props) {
    return render(<CameraPreview {...props} />);
  }

  const props = {
    photo: {
      uri: 'file url'
    }
  };

  it('should render the retake picture and  save button ', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('image')).toHaveProp('source', { uri: props.photo.uri });
  });

  it('should render the retake picutre button', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('retake-photo')).toBeTruthy();
    expect(getByTestId('save-photo')).toBeTruthy();
  });
});
