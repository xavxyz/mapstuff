import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Header from '../ui/components/Header';

storiesOf('Header', module)
  .add('Blank header', () => (
    <Header />
  ));
