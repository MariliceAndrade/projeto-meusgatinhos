export class Carrosel{
    constructor(voltar, avancar, listaProdutos, navegacao){ //pegando os elementos do html
        this.voltar = document.querySelector(voltar) //atributo p/ o elemento de button 'voltar'
        this.avancar = document.querySelector(avancar)
        this.listaProdutos = document.querySelector(listaProdutos) //atributo p/ o elemento de ul (lista das fotos)
        this.navegacao = document.querySelector(navegacao) //atributo p/ o elemento de div (navegação pelos tracinhos)

        this.slides = this.getListaSlides() //salvando o retorno da função nesse atributo (variável slides)
        this.indicadores = this.getListaIndicadores()
        this.tamanhoImg = this.getTamanhoSlide() //salvando o retorno da função nesse atributo (o tamanho da img -variável tamanhoImg-)
        
        this.indiceSlideAtual = 0 //primeiro elemento (img) da lista de slides do carrossel
        
        this.avancar.addEventListener('click', this.proximoSlide.bind(this)) //bind(this) é garantir que o this utilizado é o do carrossel
        this.voltar.addEventListener('click', this.slideAnterior.bind(this))
        this.navegacao.addEventListener('click', this.pularParaSlide.bind(this))

        this.preparaSlides()
    }

    // função que retorna listas
    getListaSlides(){ //pegando cada um das img
        return Array.from(this.listaProdutos.children) //lista de array "from" -a partir de quem-, a patir dos elementos filhos (children) da Lista de Produtos
    }

    getListaIndicadores(){ //pegando cada um dos indicadores
        return Array.from(this.navegacao.children)
    }

    getTamanhoSlide(){ //função que retorna o tamanho de uma imagem
        return this.slides[0].getBoundingClientRect().width //pegando propriedade de largura (width) do elemento 
    }

    getSlideAtual(){ //retorna o slide (img) atual baseada no indice
        return this.slides[this.indiceSlideAtual]
    }

    getIndiceAtual(){
        return this.indicadores[this.indiceSlideAtual]
    }

    proximoSlide(){ //movimentando os slides (imgs)
        let proximaPosicao = this.indiceSlideAtual + 1
        if(proximaPosicao > this.slides.length - 1){  //condicionando o limite de 5 - 1 para ficar na posicao 4 do array
            proximaPosicao = 0 //volta para a posição inicial
        }

        this.vaParaSlide(proximaPosicao)
    }

    slideAnterior(){ //movimentando os slides (imgs)
        let posicaoAnterior = this.indiceSlideAtual - 1
        if(posicaoAnterior < 0){  
            posicaoAnterior = this.slides.length - 1 
        }

        this.vaParaSlide(posicaoAnterior)
    }

    vaParaSlide(posicao){ //atualizando o indice do slide
        const indicadorAtual = this.getIndiceAtual() //pegando valor antes de alterar o indice p/ os indicadores de slide
        this.indiceSlideAtual = posicao
        const indicadorSelecionado = this.getIndiceAtual()
        
        this.indiceSlideAtual = posicao
        this.scrollParaSlide(this.getSlideAtual())

        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado)
    }

    scrollParaSlide(slideSelecionado){ 
        this.listaProdutos.style.transform = 'translateX(-' + slideSelecionado.style.left + ')'
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado){
        indicadorAtual.classList.remove('carrossel_indicador_ativo') //remove a classe css de estilização qual slide está ativo
        indicadorSelecionado.classList.add('carrossel_indicador_ativo') //adiciona a classe css de estilização do slide que está ativo
    }

    pularParaSlide(evento){ //função p/ quando clicar no indicador, trocar para o slide (img) desse indicador selecionado
        if(evento.target === evento.currentTarget) return

        const indicadorSelecionado = evento.target.getAttribute('data-indicador') //retorna qual o indice selecionado do indicador (tracinho) do carrossel
        
        this.vaParaSlide(parseInt(indicadorSelecionado)) //transformando os valores recebidos em string para inteiro
    }

    preparaSlides(){ //função para colocar um valor (em pixel) left para cada uma das imgs
        this.slides.forEach((slide, i) => { //
            slide.style.left = this.tamanhoImg * i + 'px' //720 * 0 (720 * 1 -2 -3 -4)
        })
    }
}