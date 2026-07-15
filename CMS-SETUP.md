# Supabase Setup — Do This Last

1. Create a Supabase project.
2. Open SQL Editor and run `supabase-schema.sql`.
3. In Authentication, create your admin user with email and password.
4. Copy that user's UUID.
5. Run:

```sql
insert into public.admin_users (user_id)
values ('PASTE-YOUR-AUTH-USER-UUID-HERE');
```

6. Open Supabase Project Settings → API.
7. Copy the Project URL and publishable/anon key into `js/cms-config.js`:

```js
window.CREATIFY_CMS = {
  supabaseUrl: "https://YOUR-PROJECT.supabase.co",
  supabaseAnonKey: "YOUR-PUBLISHABLE-ANON-KEY",
  storageBucket: "creatify-media"
};
```

8. Commit and push that file.
9. Open `/admin.html` on the live website and sign in.

Never place the Supabase service-role key in browser code.
