import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Button from '../../src/components/button';

describe('<Button />', () => {
  it('Deve ser igual ao snapshot salvo anteriormente quando o botão for renderizado', () => {
    const words = faker.word.words(3);
    render(<Button title={words} />);

    const button = screen.getByRole('button');

    expect(button).toMatchSnapshot();//verifica se o botão renderizado é igual ao snapshot
  });

  describe('Deve exibir o botão corretamente quando ele for renderizado', () => {
    it('Deve exibir o título do botão quando o valor for passado via prop "Title"', () => {
      const words = faker.word.words(3);
      render(<Button title={words} />);

      const button = screen.getByText(words);//obter o elemento do botão com base no texto do título

      expect(button).toBeInTheDocument();//verifica se o elemento está presente no documento
    });

    it('Deve chamar a função de "onClick" quando o botão for clicado', async () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);//simulando um clique

      expect(onClick).toBeCalledTimes(1);//verificando se foi chamado exatamente uma vez
    });
  });
});
