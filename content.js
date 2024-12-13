// Inject your React app's script
const script = document.createElement('script');
script.src = chrome.runtime.getURL('static/js/main.js');
document.documentElement.appendChild(script);