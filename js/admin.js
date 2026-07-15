let adminClient = null;
let activeResource = 'projects';
let resourceRows = {};
let dashboardLoaded = false;

const resources = {
  projects: {
    title: 'Projects',
    table: 'projects',
    image: 'image_url',
    fields: [
      ['title', 'Project title', 'text', true],
      ['slug', 'URL slug', 'text', true],
      ['category', 'Category', 'text', true],
      ['year', 'Year', 'text', true],
      ['client_name', 'Client name', 'text', false],
      ['services', 'Services', 'text', false],
      ['excerpt', 'Short description', 'textarea', true],
      ['description', 'Full project story', 'textarea', false],
      ['image_url', 'Cover image URL', 'image', false],
      ['sort_order', 'Display order', 'number', false],
      ['featured', 'Featured project', 'checkbox', false],
      ['published', 'Published', 'checkbox', false]
    ]
  },
  services: {
    title: 'Services',
    table: 'services',
    fields: [
      ['title', 'Service name', 'text', true],
      ['icon', 'Icon or symbol', 'text', false],
      ['description', 'Description', 'textarea', true],
      ['sort_order', 'Display order', 'number', false],
      ['published', 'Published', 'checkbox', false]
    ]
  },
  clients: {
    title: 'Clients & Logos',
    table: 'clients',
    image: 'logo_url',
    fields: [
      ['name', 'Client name', 'text', true],
      ['website_url', 'Website URL', 'url', false],
      ['logo_url', 'Logo URL', 'image', false],
      ['sort_order', 'Display order', 'number', false],
      ['published', 'Published', 'checkbox', false]
    ]
  },
  testimonials: {
    title: 'Testimonials',
    table: 'testimonials',
    fields: [
      ['quote', 'Testimonial', 'textarea', true],
      ['client_name', 'Client name', 'text', true],
      ['client_role', 'Client type or role', 'text', false],
      ['sort_order', 'Display order', 'number', false],
      ['published', 'Published', 'checkbox', false]
    ]
  },
  faqs: {
    title: 'FAQs',
    table: 'faqs',
    fields: [
      ['question', 'Question', 'text', true],
      ['answer', 'Answer', 'textarea', true],
      ['sort_order', 'Display order', 'number', false],
      ['published', 'Published', 'checkbox', false]
    ]
  },
  stats: {
    title: 'Statistics',
    table: 'stats',
    fields: [
      ['value', 'Value', 'text', true],
      ['label', 'Label', 'text', true],
      ['sort_order', 'Display order', 'number', false],
      ['published', 'Published', 'checkbox', false]
    ]
  }
};

const settingsFields = [
  ['eyebrow', 'Hero eyebrow'],
  ['hero_line_1', 'Hero line one'],
  ['hero_line_2', 'Hero line two'],
  ['hero_description', 'Hero description'],
  ['intro_title', 'Intro title'],
  ['intro_body', 'Intro paragraph'],
  ['about_title', 'About title'],
  ['about_body', 'About paragraph'],
  ['email', 'Email address'],
  ['phone', 'Phone'],
  ['location', 'Location line'],
  ['instagram', 'Instagram URL'],
  ['linkedin', 'LinkedIn URL'],
  ['behance', 'Behance URL'],
  ['primary_cta_label', 'Primary button label'],
  ['primary_cta_url', 'Primary button URL'],
  ['secondary_cta_label', 'Secondary button label'],
  ['secondary_cta_url', 'Secondary button URL'],
  ['footer_blurb', 'Footer description']
];

function ready() {
  const config = window.CREATIFY_CMS || {};
  return Boolean(
    config.supabaseUrl &&
    config.supabaseAnonKey &&
    window.supabase?.createClient
  );
}

function db() {
  if (!ready()) return null;

  adminClient ||= window.supabase.createClient(
    window.CREATIFY_CMS.supabaseUrl,
    window.CREATIFY_CMS.supabaseAnonKey
  );

  return adminClient;
}

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function notice(message, type = 'success') {
  const element = document.getElementById('adminNotice');
  element.textContent = message;
  element.className = `admin-notice show ${type}`;

  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => element.classList.remove('show'), 5000);
}

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function initAdmin() {
  document.getElementById('configRequired').hidden = ready();
  document.getElementById('authArea').hidden = !ready();

  if (!ready()) return;

  document.getElementById('loginForm').addEventListener('submit', login);
  document.getElementById('logoutButton').addEventListener('click', () => db().auth.signOut());

  document.querySelectorAll('[data-admin-tab]').forEach(button => {
    button.addEventListener('click', () => showTab(button.dataset.adminTab));
  });

  document.getElementById('addItem').addEventListener('click', () => openEditor(activeResource));
  document.getElementById('closeEditor').addEventListener('click', closeEditor);
  document.querySelector('.editor-backdrop').addEventListener('click', closeEditor);
  document.getElementById('resourceForm').addEventListener('submit', saveResource);
  document.getElementById('settingsForm').addEventListener('submit', saveSettings);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeEditor();
  });

  const { data, error } = await db().auth.getSession();
  if (error) notice(error.message, 'error');
  await setAuth(data?.session || null);

  db().auth.onAuthStateChange((_event, session) => {
    setTimeout(() => setAuth(session), 0);
  });
}

async function login(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"], button:not([type])');
  const originalText = button.textContent;
  const formData = new FormData(form);

  button.disabled = true;
  button.textContent = 'Logging in…';

  const { error } = await db().auth.signInWithPassword({
    email: String(formData.get('email') || '').trim(),
    password: String(formData.get('password') || '')
  });

  button.disabled = false;
  button.textContent = originalText;

  if (error) notice(error.message, 'error');
}

async function setAuth(session) {
  document.getElementById('loginPanel').hidden = Boolean(session);
  document.getElementById('dashboard').hidden = !session;
  document.getElementById('loggedInEmail').textContent = session?.user?.email || '';

  if (!session) {
    dashboardLoaded = false;
    return;
  }

  if (!dashboardLoaded) {
    await loadDashboard();
    dashboardLoaded = true;
  }
}

function showTab(name) {
  document.querySelectorAll('[data-admin-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.adminTab === name);
  });

  // Projects, Services, Clients, Testimonials, FAQs and Statistics all use
  // the same reusable resource panel. The old code hid that panel when a
  // non-project resource was selected, which caused blank dashboard pages.
  const visiblePanel = resources[name] ? 'projects' : name;

  document.querySelectorAll('[data-admin-panel]').forEach(panel => {
    panel.hidden = panel.dataset.adminPanel !== visiblePanel;
  });

  if (resources[name]) {
    activeResource = name;
    renderResourcePanel(name);
  }

  if (name === 'settings') loadSettings();
  if (name === 'inquiries') loadInquiries();
}

async function loadDashboard() {
  await Promise.all([
    ...Object.keys(resources).map(loadResource),
    loadSettings(),
    loadInquiries()
  ]);

  showTab(activeResource);
}

async function loadResource(name) {
  const resource = resources[name];
  const { data, error } = await db()
    .from(resource.table)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    resourceRows[name] = [];
    notice(`${resource.title}: ${error.message}`, 'error');
    return;
  }

  resourceRows[name] = data || [];
}

function renderResourcePanel(name) {
  const resource = resources[name];
  const mount = document.getElementById('resourceList');
  const rows = resourceRows[name] || [];

  document.getElementById('resourceTitle').textContent = resource.title;
  document.getElementById('addItem').hidden = false;

  mount.innerHTML = rows.length
    ? rows.map(row => {
        const title = row.title || row.name || row.question || row.client_name || row.label || 'Item';
        const subtitle = row.category || row.client_role || row.description || row.answer || row.value || '';
        const image = resource.image && row[resource.image]
          ? `<img class="admin-thumb" src="${esc(row[resource.image])}" alt="">`
          : `<div class="admin-thumb placeholder">${esc(title.slice(0, 2).toUpperCase())}</div>`;

        return `
          <article class="admin-list-item">
            ${image}
            <div>
              <span class="badge ${row.published ? '' : 'draft'}">
                ${row.published ? 'Published' : 'Draft'}
              </span>
              <h3>${esc(title)}</h3>
              <p>${esc(String(subtitle).slice(0, 100))}</p>
            </div>
            <div class="admin-actions">
              <button class="button secondary small" type="button" data-edit="${row.id}">Edit</button>
              <button class="button small orange" type="button" data-delete="${row.id}">Delete</button>
            </div>
          </article>
        `;
      }).join('')
    : '<p class="muted">No items yet. Use “Add Item” to create the first one.</p>';

  mount.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', () => openEditor(name, button.dataset.edit));
  });

  mount.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', () => deleteResource(name, button.dataset.delete));
  });
}

function openEditor(name, id = '') {
  activeResource = name;

  const resource = resources[name];
  const row = (resourceRows[name] || []).find(item => String(item.id) === String(id)) || {};

  document.getElementById('editorTitle').textContent = `${id ? 'Edit' : 'Add'} ${resource.title.replace(/s$/, '')}`;
  document.getElementById('resourceName').value = name;
  document.getElementById('resourceId').value = id;
  document.getElementById('editorFields').innerHTML = resource.fields
    .map(([key, label, type, required]) => fieldHtml(key, label, type, row[key], required))
    .join('');

  const titleInput = document.querySelector('#resourceForm [name="title"]');
  const slugInput = document.querySelector('#resourceForm [name="slug"]');

  if (titleInput && slugInput && !id) {
    titleInput.addEventListener('input', () => {
      slugInput.value = slugify(titleInput.value);
    });
  }

  document.getElementById('editorDrawer').classList.add('open');
}

function fieldHtml(key, label, type, value, required) {
  if (type === 'checkbox') {
    const checked = value === undefined ? key === 'published' : Boolean(value);
    return `
      <label class="field checkbox-field">
        <input type="checkbox" name="${key}" ${checked ? 'checked' : ''}>
        <span>${label}</span>
      </label>
    `;
  }

  if (type === 'textarea') {
    return `
      <label class="field full">
        <span>${label}</span>
        <textarea name="${key}" ${required ? 'required' : ''}>${esc(value || '')}</textarea>
      </label>
    `;
  }

  if (type === 'image') {
    return `
      <div class="field full">
        <label for="${key}">${label}</label>
        <input id="${key}" name="${key}" value="${esc(value || '')}">
        <input type="file" name="${key}_file" accept="image/*">
        <small class="muted">Paste an image URL or upload a file.</small>
      </div>
    `;
  }

  return `
    <label class="field ${key === 'excerpt' || key === 'description' ? 'full' : ''}">
      <span>${label}</span>
      <input
        type="${type}"
        name="${key}"
        value="${esc(value ?? (type === 'number' ? 0 : ''))}"
        ${required ? 'required' : ''}
      >
    </label>
  `;
}

function closeEditor() {
  document.getElementById('editorDrawer').classList.remove('open');
  document.getElementById('resourceForm').reset();
}

async function upload(file, folder) {
  if (!file?.size) return '';

  const extension = file.name.split('.').pop().toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const bucket = window.CREATIFY_CMS.storageBucket || 'creatify-media';

  const { error } = await db().storage
    .from(bucket)
    .upload(path, file, {
      upsert: false,
      contentType: file.type || undefined
    });

  if (error) throw error;

  return db().storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

async function saveResource(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"], button:not([type])');
  const originalText = button.textContent;
  const formData = new FormData(form);
  const name = String(formData.get('resourceName') || '');
  const id = String(formData.get('resourceId') || '');
  const resource = resources[name];
  const payload = {};

  if (!resource) {
    notice('Unknown dashboard section.', 'error');
    return;
  }

  button.disabled = true;
  button.textContent = 'Saving…';

  try {
    for (const [key, _label, type] of resource.fields) {
      if (type === 'checkbox') {
        payload[key] = Boolean(form.elements[key]?.checked);
      } else if (type === 'number') {
        payload[key] = Number(formData.get(key) || 0);
      } else if (type === 'image') {
        let url = String(formData.get(key) || '').trim();
        const file = formData.get(`${key}_file`);

        if (file?.size) url = await upload(file, name);
        payload[key] = url;
      } else {
        payload[key] = String(formData.get(key) || '').trim();
      }
    }

    const query = id
      ? db().from(resource.table).update(payload).eq('id', id)
      : db().from(resource.table).insert(payload);

    // Returning the saved row verifies that the database actually accepted
    // the change. This avoids showing a false success message.
    const { data, error } = await query.select('*').single();

    if (error) throw error;
    if (!data) throw new Error('The database did not return the saved item.');

    await loadResource(name);
    renderResourcePanel(name);
    closeEditor();
    notice(`${resource.title} saved successfully.`);
  } catch (error) {
    console.error(error);
    notice(error.message || 'The item could not be saved.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function deleteResource(name, id) {
  if (!confirm('Delete this item permanently?')) return;

  const { error } = await db()
    .from(resources[name].table)
    .delete()
    .eq('id', id);

  if (error) {
    notice(error.message, 'error');
    return;
  }

  await loadResource(name);
  renderResourcePanel(name);
  notice('Item deleted.');
}

async function loadSettings() {
  const form = document.getElementById('settingsForm');
  if (!form || !db()) return;

  const { data, error } = await db()
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    notice(error.message, 'error');
    return;
  }

  document.getElementById('settingsFields').innerHTML = settingsFields
    .map(([key, label]) => {
      const isLongText = ['hero_description', 'intro_body', 'about_body', 'footer_blurb'].includes(key);
      const control = isLongText
        ? `<textarea name="${key}">${esc(data?.[key] || '')}</textarea>`
        : `<input name="${key}" value="${esc(data?.[key] || '')}">`;

      return `
        <label class="field ${isLongText ? 'full' : ''}">
          <span>${label}</span>
          ${control}
        </label>
      `;
    })
    .join('');

  document.getElementById('settingsId').value = data?.id || '';
}

async function saveSettings(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"], button:not([type])');
  const originalText = button.textContent;
  const formData = new FormData(form);
  const payload = {};
  const id = String(formData.get('id') || '');

  settingsFields.forEach(([key]) => {
    payload[key] = String(formData.get(key) || '').trim();
  });

  button.disabled = true;
  button.textContent = 'Saving…';

  try {
    const query = id
      ? db().from('site_settings').update(payload).eq('id', id)
      : db().from('site_settings').insert(payload);

    const { data, error } = await query.select('*').single();

    if (error) throw error;
    if (!data) throw new Error('The database did not return the saved settings.');

    await loadSettings();
    notice('Website settings saved successfully.');
  } catch (error) {
    console.error(error);
    notice(error.message || 'Website settings could not be saved.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function loadInquiries() {
  const mount = document.getElementById('inquiryList');
  if (!mount || !db()) return;

  const { data, error } = await db()
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    notice(error.message, 'error');
    return;
  }

  mount.innerHTML = data?.length
    ? data.map(inquiry => `
        <article class="inquiry-card">
          <h3>${esc(inquiry.name)} · ${esc(inquiry.service || 'General enquiry')}</h3>
          <div class="inquiry-meta">
            <span>${esc(inquiry.email)}</span>
            <span>${esc(inquiry.company || 'No company')}</span>
            <span>${new Date(inquiry.created_at).toLocaleString()}</span>
          </div>
          <p>${esc(inquiry.message)}</p>
          <div class="admin-actions">
            <a class="button secondary small" href="mailto:${esc(inquiry.email)}">Reply</a>
            <button class="button small" type="button" data-read="${inquiry.id}">
              ${inquiry.status === 'read' ? 'Marked read' : 'Mark as read'}
            </button>
          </div>
        </article>
      `).join('')
    : '<p class="muted">No enquiries yet.</p>';

  mount.querySelectorAll('[data-read]').forEach(button => {
    button.addEventListener('click', async () => {
      const { error: updateError } = await db()
        .from('inquiries')
        .update({ status: 'read' })
        .eq('id', button.dataset.read);

      if (updateError) {
        notice(updateError.message, 'error');
        return;
      }

      await loadInquiries();
    });
  });
}

document.addEventListener('DOMContentLoaded', initAdmin);
