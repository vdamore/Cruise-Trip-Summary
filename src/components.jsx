// Shared UI components
const { useState, useEffect, useMemo } = React;

function Button({ variant = "primary", size = "sm", block, children, onClick, disabled, type = "button", ...rest }) {
  const cls = [
    "btn",
    variant === "primary" && "btn-primary",
    variant === "outline" && "btn-outline",
    variant === "light" && "btn-light",
    size === "md" && "btn-md",
    size === "lg" && "btn-lg",
    block && "btn-block",
  ].filter(Boolean).join(" ");
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}

function Header({ state, tabs, activeTab, onTab, onViewItinerary, onChangeCabin }) {
  return (
    <header className="page-header" role="banner">
      <div className="inner">
        <div className="header-top">
          <div>
            <h1 className="greeting" aria-label={`Hi ${state.tweaks.guestName}. Here is your trip summary.`}>
              <span>Hi {state.tweaks.guestName}.</span>
              <span>Here is your trip summary.</span>
            </h1>
            <div className="past-guest">
              <Icons.User size={18}/>
              <span>Past guest#</span>
              <strong>{MOCK.guest.pastGuestNum}</strong>
            </div>
          </div>
          <div className="stat-stack" aria-label="Trip stats">
            <div className="stat">
              <Icons.Users size={18}/>
              <span className="k">Travelers</span>
              <span className="v">{state.tweaks.travelers}</span>
            </div>
            <div className="stat">
              <Icons.Calendar size={18}/>
              <span className="k">Departure</span>
              <span className="v">{fmtDate(state.tweaks.departureDate)}</span>
            </div>
            <div className="stat">
              <Icons.Ship size={18}/>
              <span className="k">Cabin</span>
              <span className="v">{MOCK.cruise.cabin}</span>
            </div>
          </div>
        </div>
        <div className="tabs-row">
          <div className="tabs" role="tablist" aria-label="Trip summary sections">
            {tabs.map(t => (
              <button key={t.id}
                role="tab"
                className="tab"
                aria-selected={activeTab === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => onTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="tab-actions">
            <button type="button" className="btn btn-outline" onClick={onViewItinerary}>
              <Icons.ExternalLink size={16}/><span>View itinerary</span>
            </button>
            <button type="button" className="btn btn-outline" onClick={onChangeCabin}>
              <Icons.Edit size={16}/><span>Change cabin type</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ show }) {
  if (!show) return null;
  const img = MOCK.cruise.images;
  return (
    <section className="hero" aria-label="Trip photos">
      <div className="hero-grid">
        <div className="cell" role="img" aria-label="Cruise ship at sea" style={{backgroundImage: `url("${img.ship}")`}}/>
        <div className="cell" role="img" aria-label="Turquoise beach in the Bahamas" style={{backgroundImage: `url("${img.beach}")`}}/>
        <div className="stack">
          <div className="cell" role="img" aria-label="Palm trees" style={{backgroundImage: `url("${img.palms}")`}}/>
          <div className="cell" role="img" aria-label="Balcony cabin interior" style={{backgroundImage: `url("${img.cabin}")`, position: "relative"}}>
            <button className="hero-overlay-btn" aria-label="Open photo gallery">
              <Icons.Image size={14}/> See all photos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({ value, onChange, options, invalid, id, ...rest }) {
  return (
    <select id={id} className="select" value={value} aria-invalid={invalid || undefined}
      onChange={e => onChange(e.target.value)} {...rest}>
      {options.map((o, i) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <option key={i} value={v}>{v === "" ? "Select…" : l}</option>;
      })}
    </select>
  );
}

function FieldError({ children }) {
  return <div className="field-error"><Icons.AlertCircle size={14}/> <span>{children}</span></div>;
}

function CheckboxRow({ checked, onChange, title, desc, price, unit, disabled, icon }) {
  const IconEl = icon ? Icons[icon] : null;
  return (
    <label className={`checkbox-row ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}`}>
      <input type="checkbox" checked={checked} onChange={e => !disabled && onChange(e.target.checked)} disabled={disabled}/>
      <span className="checkbox" aria-hidden="true">{checked && <Icons.Check size={14} stroke={3} color="#fff"/>}</span>
      <span className="checkbox-body">
        <span className="checkbox-title">{IconEl && <IconEl size={16}/>}{title}</span>
        <span className="checkbox-desc">{desc}</span>
      </span>
      {price != null && (
        <span className="checkbox-price">
          {fmt(price)}
          {unit && <small>{unit}</small>}
        </span>
      )}
    </label>
  );
}

function Alert({ title, body, onClose, tone = "info" }) {
  return (
    <div className={`alert ${onClose ? "dismissable" : ""}`}>
      <span className="icon"><Icons.Info size={18}/></span>
      <div style={{flex: 1}}>
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
      {onClose && (
        <button className="close" aria-label="Dismiss" onClick={onClose}><Icons.X size={16}/></button>
      )}
    </div>
  );
}

function Toast({ items, onRemove }) {
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {items.map(t => (
        <div key={t.id} className={`toast ${t.tone === "error" ? "error" : ""}`}>
          <span className="icon-wrap">
            {t.tone === "error" ? <Icons.AlertCircle size={18}/> : <Icons.Check size={18} stroke={2}/>}
          </span>
          <div style={{flex: 1, minWidth: 0}}>
            <div className="t-title">{t.title}</div>
            {t.body && <div className="t-body">{t.body}</div>}
          </div>
          <button className="close" aria-label="Dismiss" onClick={() => onRemove(t.id)} style={{background:"transparent",border:0,color:"var(--tds-color-gray-6)",padding:4,cursor:"pointer"}}>
            <Icons.X size={14}/>
          </button>
        </div>
      ))}
    </div>
  );
}

function LoadingOverlay({ label }) {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-card">
        <div className="spinner"/>
        <div style={{fontWeight:600}}>{label}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Button, Header, Hero, Select, FieldError, CheckboxRow, Alert, Toast, LoadingOverlay });
