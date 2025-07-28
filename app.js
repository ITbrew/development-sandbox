/**
 * TaskMaster Pro
 *
 * A simple yet polished task management application. Users can add tasks,
 * mark them as completed and remove tasks. All tasks are persisted in
 * localStorage so they survive page reloads. This script encapsulates
 * all of the core logic for rendering and updating the task list.
 */

document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const tasksContainer = document.getElementById('tasks-container');

  // Load tasks from localStorage or initialize as an empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  /**
   * Persist the current list of tasks to localStorage
   */
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Render the list of tasks to the page. This function first clears
   * out the container element and then creates a new DOM structure for
   * each task in the tasks array. Each task card contains a checkbox
   * (to mark completion), the task text, and a delete button.
   */
  function renderTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
      // Create the card wrapper
      const card = document.createElement('div');
      // Apply a semantic class to hook up CSS styles instead of Tailwind classes
      card.className = 'task-card';

      // Label holds both the checkbox and the text
      const label = document.createElement('label');
      // The layout styles are defined in CSS; no additional classes necessary

      // Checkbox for completion
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      // Custom colours are handled via accent-color in CSS

      // Text span holds the actual task text
      const span = document.createElement('span');
      span.textContent = task.text;
      if (task.completed) {
        // Apply a class to indicate completion
        span.classList.add('completed');
      }

      // When checkbox toggles, update state and re-render
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      label.appendChild(checkbox);
      label.appendChild(span);

      // Delete button (× symbol) for removing tasks
      const deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('aria-label', 'Remove task');
      deleteBtn.innerHTML = '&times;';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      card.appendChild(label);
      card.appendChild(deleteBtn);
      tasksContainer.appendChild(card);
    });
  }

  // Handle form submission to create a new task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text !== '') {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = '';
      taskInput.focus();
    }
  });

  // Initial render on page load
  renderTasks();
});
