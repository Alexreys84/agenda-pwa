document.addEventListener('DOMContentLoaded', () => {
  const formularioTarefa = document.getElementById('task-form');
  const listaTarefas = document.getElementById('task-list');
  const botaoInstalar = document.getElementById('install-button');
  let promptAdiado;

  formularioTarefa.addEventListener('submit', evento => {
    evento.preventDefault();
    const tituloTarefa = document.getElementById('task-title').value;
    const dataTarefa = document.getElementById('task-date').value;
    const horaTarefa = document.getElementById('task-time').value;

    if (tituloTarefa && dataTarefa && horaTarefa) {
      const itemTarefa = document.createElement('li');
      itemTarefa.innerHTML = `<span><strong>${tituloTarefa}</strong></span>
                              <span>${dataTarefa} ${horaTarefa}</span>`;

      const botaoConcluir = document.createElement('button');
      botaoConcluir.textContent = 'Concluir';
      botaoConcluir.addEventListener('click', () => {
        itemTarefa.classList.toggle('completed');
      });

      const botaoExcluir = document.createElement('button');
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.addEventListener('click', () => {
        listaTarefas.removeChild(itemTarefa);
      });

      itemTarefa.appendChild(botaoConcluir);
      itemTarefa.appendChild(botaoExcluir);

      listaTarefas.appendChild(itemTarefa);

      formularioTarefa.reset();
    }
  });

  // Instalar PWA
  window.addEventListener('beforeinstallprompt', (evento) => {
    // Prevenir que a mini barra de informações apareça no mobile
    evento.preventDefault();
    // Armazenar o evento para poder ser disparado mais tarde
    promptAdiado = evento;
    // Atualizar a UI para notificar o usuário que ele pode instalar o PWA
    botaoInstalar.style.display = 'block';

    botaoInstalar.addEventListener('click', () => {
      // Esconder o botão de instalar
      botaoInstalar.style.display = 'none';
      // Mostrar o prompt de instalação
      promptAdiado.prompt();
      // Aguardar a resposta do usuário ao prompt
      promptAdiado.userChoice.then((resultadoEscolha) => {
        if (resultadoEscolha.outcome === 'accepted') {
          console.log('Usuário aceitou o prompt de instalação');
        } else {
          console.log('Usuário rejeitou o prompt de instalação');
        }
        promptAdiado = null;
      });
    });
  });
});
