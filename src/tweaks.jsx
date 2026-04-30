// Tweaks panel
function TweaksPanel({ state, setTweak, close }) {
  const t = state.tweaks;
  const colors = [
    { id: "tst", name: "TST blue", val: "#0066cc" },
    { id: "ne",  name: "AAA Northeast", val: "#004990" },
    { id: "tx",  name: "AAA Texas",     val: "#0a8a4f" },
    { id: "nc",  name: "AAA NorCal",    val: "#c8102e" },
    { id: "gold", name: "Gold", val: "#aa8360" },
  ];
  return (
    <div className="tweaks" role="dialog" aria-label="Tweaks panel">
      <div className="tweaks-head">
        <h3>Tweaks</h3>
        <button className="close" aria-label="Close" onClick={close}><Icons.X size={14}/></button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label htmlFor="tw-name">Guest name</label>
          <input id="tw-name" type="text" value={t.guestName} onChange={e => setTweak({ guestName: e.target.value })}/>
        </div>
        <div className="tweak-row">
          <label htmlFor="tw-trav">Travelers</label>
          <input id="tw-trav" type="number" min="1" max="8"
            value={t.travelers}
            onChange={e => setTweak({ travelers: Math.max(1, Math.min(8, Number(e.target.value) || 1)) })}/>
        </div>
        <div className="tweak-row">
          <label htmlFor="tw-date">Departure date</label>
          <input id="tw-date" type="date" value={t.departureDate}
            onChange={e => setTweak({ departureDate: e.target.value })}/>
        </div>
        <div className="tweak-row">
          <label>Brand color</label>
          <div className="color-swatches">
            {colors.map(c => (
              <button key={c.id} title={c.name}
                className={t.primary === c.val ? "sel" : ""}
                style={{background: c.val}}
                onClick={() => setTweak({ primary: c.val })}
                aria-label={c.name}/>
            ))}
          </div>
        </div>
        <div className="tweak-row inline">
          <label htmlFor="tw-hero">Show hero photos</label>
          <button id="tw-hero" role="switch" aria-checked={t.heroOn} className="tweak-switch"
            onClick={() => setTweak({ heroOn: !t.heroOn })}/>
        </div>
        <div className="tweak-row inline">
          <label htmlFor="tw-bundle">Bundle alert (Add-ons)</label>
          <button id="tw-bundle" role="switch" aria-checked={t.bundleAlertOn} className="tweak-switch"
            onClick={() => setTweak({ bundleAlertOn: !t.bundleAlertOn })}/>
        </div>
        <div className="tweak-row inline">
          <label htmlFor="tw-err">Force validation errors</label>
          <button id="tw-err" role="switch" aria-checked={t.forceErrors} className="tweak-switch"
            onClick={() => setTweak({ forceErrors: !t.forceErrors })}/>
        </div>
        <div className="tweak-row inline">
          <label htmlFor="tw-urgent">Urgent deadline (≤ 7 days)</label>
          <button id="tw-urgent" role="switch" aria-checked={t.urgentDeadline} className="tweak-switch"
            onClick={() => setTweak({ urgentDeadline: !t.urgentDeadline })}/>
        </div>
      </div>
    </div>
  );
}
window.TweaksPanel = TweaksPanel;
