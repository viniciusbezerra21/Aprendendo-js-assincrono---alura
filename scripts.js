const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.getElementById('main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }
        catch (erro) {
            console.error('Erro ao ler o arquivo:', erro);
        }
    }
})

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();


        const tag = evento.target.value.trim();
        if (tag !== '') {
            try {
                const tagValida = await verificaTagsDisponiveis(tag);
                if (tagValida) {
                const newTag = document.createElement('li');
                newTag.innerHTML = `<p>${tag}</p><img src="img/close-black.svg" class="remove-tag">`;
                listaTags.appendChild(newTag);
                evento.target.value = '';
                } else {
                    alert('Tag nao existente!');
                }
            } catch (erro) {
                console.error('Erro ao verificar a tag:', erro);
            }
        }
    }
});

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        const tagToRemove = evento.target.parentElement;
        listaTags.removeChild(tagToRemove);
    }
});

const tagsDisponiveis = ['Front End', 'Back End', 'Full Stack', 'DevOps', 'Data Science', 'Machine Learning', 'Mobile', 'UI/UX', 'Cloud', 'Security'];

async function verificaTagsDisponiveis(tag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tag));
        }, 1000);
    });
}

const botaoPublicar = document.querySelector('.botao-publicar');
botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsDoProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);
    

    console.log('Nome do Projeto:', nomeDoProjeto);
    console.log('Descricao do Projeto:', descricaoDoProjeto);
    console.log('Tags do Projeto:', tagsDoProjeto);
});

async function publicarProjeto(nome, descricao, tags) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            const sucesso = Math.random() > 0.5;

            if (sucesso) {
                resolve('Projeto publicado com sucesso!');
            }
            else {
                reject('Erro ao publicar o projeto. Tente novamente.');
            }
        }, 1000);
    });
}