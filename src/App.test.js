/* Exemplo simples de teste, onde eu testo se o nome da minha aplicação está sendo renderizada na tela
screen: Serve para buscar na tela algo específico
getByText: Busca o texto que desejo, na tela
render: renderiza meu componente na tela


Estrutura de teste básica contém (describe, it)
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App, { calcularNovoSaldo } from './app'

describe('Componente principal', () => {
  describe('Quando eu abro o App do Banco:', () => {
    it('O nome dele deve ser exibido', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument()
    })

    it('O saldo deve ser exibido', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument
    })

    it('O botão de transação deve ser exibido', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument
    })
  })

  describe('Quando realizo uma transação', () => {
    it('que é um saque, valor diminui', () => {
      /* Esse teste verifica se a função de calculo da aplicação funciona */
      const valores = {
        transação: 'saque',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150)
      expect(novoSaldo).toBe(100);
    })

    it('que é um saque, a transacao deve ser realizada', () => {
      const {
        getByText,
        getByTestId,
        getByLabelText
      } = render(<App />);

      const saldo = getByText('R$ 1000');
      const transacao = getByLabelText('Saque');
      const valor = getByTestId('valor');
      const botaoTransacao = getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000')

      fireEvent.click(transacao, { target: { value: 'saque' } })
      fireEvent.change(valor, { target: { value: 10 } })
      fireEvent.click(botaoTransacao)

      expect(saldo.textContent).toBe('R$ 990')
    })
  })
})
