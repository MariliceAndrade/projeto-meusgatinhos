export class Carrosel{
    constructor(voltar, avancar, listaProdutos, navegacao){
        this.voltar = document.querySelector(voltar)
        this.avancar = document.querySelector(avancar)
        this.listaProdutos = document.querySelector(listaProdutos)
        this.navegacao = document.querySelector(navegacao)

        this.slides = this.getListaSlides()
        this.indicadores = this.getListaIndicadores()
        this.tamanhoImg = this.getTamanhoSlide()

        this.indiceSlideAtual = 0
        
        this.proximo.addEventListener('click', this.proximoSlide.bind(this)) //bind(this) é garantir que o this utilizado é o do carrossel
        this.anterior.addEventListener('click', this.slideAnterior.bind(this))
        
        this.navegacao.addEventListener('click', pularParaSlide.bind(this))

        this.preparaSlides()
    }

    // função que retorna listas
    getListaSlides(){
        return Array.from(this.listaProdutos.children) //lista de array "from"-a partir de quem-, a patir dos filhos da Lista de Produtos
    }

    getListaIndicadores(){
        return Array.from(this.navegacao.children)
    }

    getTamanhoSlide(){ //função que retorna o tamanho de uma imagem
        return this.slides[0].getBoundingClientRect().width
    }

    getSlideAtual(){ //faz a busca baseada no indice
        return this.slides[this.indiceSlideAtual]
    }

    getIndiceAtual(){
        return this.indicadores[this.indiceSlideAtual]
    }

    proximoSlide(){
        let proximaPosicao = this.indiceSlideAtual + 1
        if(proximaPosicao > this.slides.length - 1){  //condicionando o limite de 5 - 1 para ficar na posicao 4 do array
            proximaPosicao = 0 //volta para a posição inicial
        }

        this.vaParaSlide(proximaPosicao)
    }

    slideAnterior(){
        let posicaoAnterior = this.indiceSlideAtual - 1
        if(posicaoAnterior < 0){  //
            posicaoAnterior = this.slides.length - 1 //
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
        if(evento.target === evento.currentTarget)
            return
        const indicadorSelecionado = evento.target.getAttribute('data-indicador')
        
        this.vaParaSlide(parseInt(indicadorSelecionado))
    }

    preparaSlides(){ //função para colocar um left para cada uma das imgs
        this.slides.forEach((slide, i) => {
            slide.style.left = this.tamanhoImg * i + 'px'
        })
    }
}