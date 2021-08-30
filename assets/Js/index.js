import { Carrosel } from "./carrossel.js"

//variaveis com os elementos do html p/ serem trabalhados no carrossel
const voltar = '[data-voltar]' //valor do seletor do data atributes ( data- )
const avancar = '[data-avancar]'
const listaProdutos = '[data-lista-produtos]'
const navegacao = '[data-navegacao]'

new Carrosel(voltar, avancar, listaProdutos, navegacao)