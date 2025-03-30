export const initialHtml = `<div class="container">
  <h1>Hello CodeCraft!</h1>
  <p>This is a live coding environment.</p>
  
  <button id="demo-button">Click me!</button>
  
  <div class="result"></div>
</div>
`;

export const initialCss = `.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

h1 {
  color: #6366F1;
}

button {
  background-color: #10B981;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
`;

export const initialJs = `// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('demo-button');
  const result = document.querySelector('.result');
  
  let count = 0;
  
  button.addEventListener('click', () => {
    count++;
    result.textContent = \`Button clicked \${count} times\`;
  });
});
`;
