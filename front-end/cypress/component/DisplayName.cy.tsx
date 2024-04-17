
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import { DisplayName } from '../../src/components/atoms/display-name';

describe('DisplayName.cy.tsx', () => {
  const renderComponent = (display?: string) => (
    mount(
    <MemoryRouter initialEntries={[`/${display}`]} initialIndex={0}>
      <DisplayName />
    </MemoryRouter>
  )  );

  it('renders "Consultas" link as active when location is "/"', () => {
    renderComponent();

    cy.get('div.DisplayNames>span.DisplayName').contains('Consultas');
  });

  it('renders "Bulário" link as active when location includes "/bulario"', () => {
    renderComponent('bulario');
    
    cy.get('div.DisplayNames>span.active').contains('Bulário');
  });
});
