import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB7ym9PNUnrgxhd7x2Q7ChZ78ukZRlYTj4',
  authDomain: 'mis-quince-melanie.firebaseapp.com',
  projectId: 'mis-quince-melanie',
  storageBucket: 'mis-quince-melanie.firebasestorage.app',
  messagingSenderId: '760773196747',
  appId: '1:760773196747:web:304bbc540e5beb383b944e'
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Definir funciones globales
window.guardarDeseo = function(nombre, mensaje) {
  return push(ref(db, 'buenos-deseos/'), {
    nombre,
    mensaje,
    timestamp: new Date().toISOString()
  });
};

window.toggleWishes = function() {
  const wishesDiv = document.getElementById('wishes-container');

  if (wishesDiv.classList.contains('visible')) {
    wishesDiv.classList.remove('visible');
    wishesDiv.classList.add('hidden');
    return;
  }

  if (wishesDiv.dataset.loaded === 'true') {
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
    return;
  }

  onValue(ref(db, 'buenos-deseos/'), (snapshot) => {
    requestIdleCallback(() => {
      wishesDiv.innerHTML = '';

      snapshot.forEach((childSnapshot) => {
        const wish = childSnapshot.val();
        const wishElement = document.createElement('p');
        wishElement.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
        wishesDiv.appendChild(wishElement);
      });

      wishesDiv.dataset.loaded = 'true';
      wishesDiv.classList.remove('hidden');
      wishesDiv.classList.add('visible');
    });
  });
};
