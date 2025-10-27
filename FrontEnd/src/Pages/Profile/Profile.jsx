import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Profile.css";
import { isAuthed, authGet, authPut } from "../../lib/api";

const STORAGE_KEY = "mc_profile";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    avatarDataUrl: "",
  });

  const [initial, setInitial] = useState(form); // snapshot to detect changes / cancel
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState("");
  const fileRef = useRef(null);

  // ---- Fetch-first load (server -> cache -> UI), fallback to local cache
  useEffect(() => {
    (async () => {
      setApiError("");
      // 1) Try the API if we have a token
      if (isAuthed()) {
        try {
          const me = await authGet("/api/user/me"); // { userid, userName, email, phone, address }
          // Split userName into first/last if possible
          const [firstName = "", ...rest] = (me.userName || "").trim().split(/\s+/);
          const lastName = rest.join(" ");
          const next = {
            firstName,
            lastName,
            phone: me.phone || "",
            address: me.address || "",
            email: me.email || "",
            avatarDataUrl: "", // keep client-only for now
          };
          setForm(next);
          setInitial(next);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); // cache for quick reloads
          return; // done
        } catch (e) {
          // If API fails (CORS/offline/etc.), we fall through to local cache
          setApiError(typeof e === "string" ? e : e?.message || "Could not load profile");
          // don't return here; let it try cache below
        }
      }

      // 2) Fallback: local cache
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(parsed);
        setInitial(parsed);
      }
    })();
  }, []);

  // Derived display
  const fullName = useMemo(
    () => [form.firstName, form.lastName].filter(Boolean).join(" ") || "Your name",
    [form.firstName, form.lastName]
  );

  const initials = useMemo(() => {
    const fn = (form.firstName || "").trim();
    const ln = (form.lastName || "").trim();
    const start = (fn[0] || "") + (ln[0] || "");
    return (start || "U").toUpperCase();
  }, [form.firstName, form.lastName]);

  const isDirty = JSON.stringify(form) !== JSON.stringify(initial);

  // Warn on leave with unsaved edits
  useEffect(() => {
    const beforeUnload = (e) => {
      if (editing && isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [editing, isDirty]);

  // Handlers
  const update = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const pickFile = () => editing && fileRef.current?.click();

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, avatarDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    if (!editing) return;
    setForm((s) => ({ ...s, avatarDataUrl: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim() && !form.lastName.trim()) next.firstName = "First name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (form.phone && !/^[\d +()-]{7,}$/.test(form.phone)) {
      next.phone = "Enter a valid phone";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onEdit = () => setEditing(true);

  const onCancel = () => {
    setForm(initial); // revert
    setErrors({});
    setEditing(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setApiError("");
    try {
      // Build backend payload (your controller expects userName, email, phone, address)
      const userName = [form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(" ");
      if (isAuthed()) {
        await authPut("/api/user/me", {
          userName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        });
      }
      // keep local cache for quick loads
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim() })
      );
      setInitial({ ...form });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch (ex) {
      setApiError(ex?.message || "Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="profile-wrap">
      {/* LEFT: avatar + summary */}
      <aside className="profile-left">
        <div
          className={`photo-card ${editing ? "is-editable" : ""}`}
          onClick={pickFile}
          title={editing ? "Click to change photo" : "Photo"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? pickFile() : null)}
        >
          {form.avatarDataUrl ? (
            <img className="photo" src={form.avatarDataUrl} alt="Profile" />
          ) : (
            <div className="photo fallback">{initials}</div>
          )}
        </div>

        <div className="summary">
          <div className="summary-name">{fullName}</div>
          <div className="summary-email">{form.email || "your@email.com"}</div>

          {editing && (
            <div className="photo-actions">
              <button type="button" className="btn" onClick={pickFile}>
                Upload photo
              </button>
              {form.avatarDataUrl && (
                <button type="button" className="btn subtle" onClick={removePhoto}>
                  Remove
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} hidden />
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT: form */}
      <main className="profile-right">
        <div className="toolbar">
          <h2>Profile Settings</h2>

          <div className="toolbar-actions">
            {!editing ? (
              <>
                <span className="badge view">View</span>
                {isAuthed() ? (
                  <button className="btn ghost" type="button" onClick={onEdit}>
                    ✏️ Edit
                  </button>
                ) : (
                  <a className="btn primary" href="/login?role=customer">
                    Log in to edit
                  </a>
                )}
              </>
            ) : (
              <>
                <span className="badge editing">Editing</span>
                <button className="btn subtle" type="button" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  className="btn primary"
                  type="submit"
                  form="profile-form"
                  disabled={!isDirty || saving}
                  aria-disabled={!isDirty || saving}
                  title={!isDirty ? "No changes to save" : undefined}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* API errors (e.g., CORS/offline/401) */}
        {apiError && (
          <div className="saved-toast" style={{ background: "#FEF2F2", borderColor: "#FCA5A5", color: "#7F1D1D" }}>
            {apiError}
          </div>
        )}

        <form id="profile-form" className="profile-form" onSubmit={onSave} noValidate>
          <div className="row">
            <label className="field">
              <span className="label">Name</span>
              <input
                name="firstName"
                value={form.firstName}
                onChange={update}
                placeholder="first name"
                disabled={!editing}
              />
              {errors.firstName && <small className="error">{errors.firstName}</small>}
            </label>

            <label className="field">
              <span className="label">Surname</span>
              <input
                name="lastName"
                value={form.lastName}
                onChange={update}
                placeholder="surname"
                disabled={!editing}
              />
            </label>
          </div>

          <label className="field">
            <span className="label">Phone Number</span>
            <input
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="enter phone number"
              disabled={!editing}
            />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </label>

          <label className="field">
            <span className="label">Address</span>
            <input
              name="address"
              value={form.address}
              onChange={update}
              placeholder="enter address"
              disabled={!editing}
            />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="enter email id"
              disabled={!editing}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          {/* Save/Cancel already in toolbar for better UX */}
          {saved && <div className="saved-toast">Saved ✓</div>}
        </form>
      </main>
    </section>
  );
}
