const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

toggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.navigation a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.classList.remove('error');
  formStatus.textContent = 'Envoi en cours…';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });

    if (!response.ok) throw new Error('Envoi impossible');

    formStatus.textContent = 'Merci, votre message a bien été envoyé. Nous vous répondons sous 48 heures.';
    contactForm.reset();
  } catch (error) {
    formStatus.classList.add('error');
    formStatus.textContent = 'Une erreur est survenue. Vous pouvez aussi écrire directement à contact.sinoes@gmail.com.';
  } finally {
    submitButton.disabled = false;
  }
});
