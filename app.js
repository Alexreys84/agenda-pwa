document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const main = document.querySelector('main');

  // Esconde o loader e exibe o conteúdo principal após o carregamento da página
  window.addEventListener('load', function() {
    loader.style.display = 'none';
    main.style.display = 'block';
    document.body.style.overflow = 'auto'; // Permite o scroll após o carregamento
  });

  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');

  // Adiciona uma nova tarefa à lista quando o formulário é enviado
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskTitle = document.getElementById('task-title').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;

    // Cria um novo item de lista para a tarefa
    const li = document.createElement('li');
    li.textContent = `${taskTitle} - ${taskDate} ${taskTime}`;
    taskList.appendChild(li);

    // Limpa o formulário após a submissão
    taskForm.reset();
  });
});
