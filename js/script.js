(() => {
  const phone = '+256708643109';
  const whatsappBase = `https://wa.me/${phone}`;

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    navList.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    }));
  }

  const page = document.body.dataset.page;
  if (page) {
    const current = document.querySelector(`[data-nav="${page}"]`);
    if (current) current.setAttribute('aria-current', 'page');
  }

  document.querySelectorAll('[data-wa]').forEach((link) => {
    link.addEventListener('click', () => {
      const service = link.dataset.wa || 'general enquiry';
      const text = `Hello AARONS Electrical Services. I would like to enquire about ${service}.`;
      link.href = `${whatsappBase}?text=${encodeURIComponent(text)}`;
    });
  });

  const form = document.querySelector('#enquiry-form');
  const feedback = document.querySelector('#form-feedback');
  const serviceField = document.querySelector('#service');
  const params = new URLSearchParams(window.location.search);
  if (serviceField && params.get('service')) {
    const requested = params.get('service').toLowerCase();
    const matching = [...serviceField.options].find((option) => option.value.toLowerCase().includes(requested));
    if (matching) serviceField.value = matching.value;
  }

  if (form && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = document.querySelector('#name').value.trim();
      const service = serviceField.value;
      const message = document.querySelector('#message').value.trim();
      const waText = `Hello AARONS Electrical Services. My name is ${name}. I am enquiring about ${service}. ${message}`;
      const waLink = `${whatsappBase}?text=${encodeURIComponent(waText)}`;
      feedback.innerHTML = `This demonstration form is not connected to a backend. Your details have not been stored. <a href="${waLink}" target="_blank" rel="noopener" class="service-link">Continue via WhatsApp ↗</a>`;
      feedback.classList.add('is-visible');
      feedback.setAttribute('role', 'status');
    });
  }
})();
