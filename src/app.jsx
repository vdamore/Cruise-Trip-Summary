// Root app — tabbed layout
const { useState: Us, useEffect: Ue, useMemo: Um } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "guestName": "Vanessa",
  "travelers": 4,
  "departureDate": "2026-06-12",
  "primary": "#0066cc",
  "heroOn": true,
  "bundleAlertOn": true,
  "forceErrors": false,
  "urgentDeadline": false
}/*EDITMODE-END*/;

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "insurance", label: "Travel protection" },
  { id: "preferences", label: "Preferences" },
  { id: "pretravel", label: "Pre/post travel" },
  { id: "addons", label: "Add-ons" },
];

function App() {
  const [state, setState] = Us(() => ({
    activeTab: "overview",
    insurance: { add: false, state: "" },
    prefs: { dining: "", bed: "", diet: "", cabinReq: "", occasion: "" },
    addons: MOCK.addons.map(a => ({ ...a, on: false })),
    pretravel: {
      hotelPre: null,
      hotelPreNights: 1,
      hotelPost: null,
      hotelPostNights: 1,
      flightOut: null,
      flightBack: null,
      transferPre: null,
      transferPost: null,
    },
    bundleAlertOpen: true,
    tweaks: { ...TWEAK_DEFAULTS },
    showErrors: false,
  }));
  const [toasts, setToasts] = Us([]);
  const [loading, setLoading] = Us(false);
  const [checkoutDone, setCheckoutDone] = Us(false);
  const [tweaksOpen, setTweaksOpen] = Us(false);

  Ue(() => {
    const onMsg = e => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch(_){}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  Ue(() => {
    const p = state.tweaks.primary;
    document.documentElement.style.setProperty("--tds-color-primary-8", p);
    document.documentElement.style.setProperty("--tds-color-primary-filled", p);
    document.documentElement.style.setProperty("--tds-color-primary-text", p);
    document.documentElement.style.setProperty("--tds-color-primary-outline", p);
    document.documentElement.style.setProperty("--tds-color-primary-light-color", p);
  }, [state.tweaks.primary]);

  const update = patch => setState(s => ({ ...s, ...patch }));
  const setTweak = patch => {
    setState(s => ({ ...s, tweaks: { ...s.tweaks, ...patch } }));
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*"); } catch(_){}
  };

  const baseWithTravelers = MOCK.cruise.basePrice * state.tweaks.travelers / MOCK.guest.travelers;
  const totals = Um(() => computeTotals({
    base: Math.round(baseWithTravelers),
    travelers: state.tweaks.travelers,
    insurance: state.insurance.add && state.insurance.state ? MOCK.insurance : null,
    addons: state.addons,
    pretravel: state.pretravel,
  }), [state.addons, state.insurance, state.tweaks.travelers, state.pretravel]);

  Ue(() => {
    if (state.tweaks.urgentDeadline) {
      const d = new Date();
      d.setDate(d.getDate() + 4);
      MOCK.cruise.finalPaymentDate = d.toISOString().slice(0, 10);
    } else {
      MOCK.cruise.finalPaymentDate = "2026-10-14";
    }
  }, [state.tweaks.urgentDeadline]);

  const pushToast = t => {
    const id = Math.random().toString(36).slice(2);
    setToasts(xs => [...xs, { id, ...t }]);
    setTimeout(() => setToasts(xs => xs.filter(x => x.id !== id)), 4200);
  };
  const removeToast = id => setToasts(xs => xs.filter(x => x.id !== id));

  const onSave = () => pushToast({ title: "Trip saved", body: "You can pick it back up from My Trips." });

  const onCheckout = () => {
    const unresolved = state.insurance.add && !state.insurance.state;
    const needsPrefs = !state.prefs.dining || !state.prefs.bed;
    if (unresolved || needsPrefs) {
      const patch = { showErrors: true };
      if (unresolved) patch.activeTab = "insurance";
      else if (needsPrefs) patch.activeTab = "preferences";
      setState(s => ({ ...s, ...patch }));
      pushToast({ tone: "error", title: "Missing info", body: "Please complete the highlighted fields." });
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setCheckoutDone(true); }, 1400);
  };

  const showErrors = state.showErrors || state.tweaks.forceErrors;

  if (checkoutDone) {
    return (
      <div className="page">
        <div className="post-checkout">
          <div className="ok"><Icons.CheckBold size={36} stroke={3} color="#fff"/></div>
          <h1 style={{margin:"0 0 8px",fontSize:26,letterSpacing:"-0.01em"}}>Checkout complete</h1>
          <p style={{color:"var(--tds-color-gray-7)",margin:"0 0 24px",fontSize:15}}>
            Your cruise is booked. A confirmation is on its way to {state.tweaks.guestName.toLowerCase()}@example.com.
          </p>
          <Button variant="outline" onClick={() => {
            setCheckoutDone(false);
            setState(s => ({ ...s, showErrors: false, activeTab: "overview" }));
          }}>Back to trip summary</Button>
        </div>
      </div>
    );
  }

  const { activeTab } = state;

  return (
    <div className="page">
      <Header state={state}
        tabs={TABS}
        activeTab={activeTab}
        onTab={id => update({ activeTab: id })}
        onViewItinerary={() => pushToast({ title:"Itinerary opened", body:"Opening day-by-day view…"})}
        onChangeCabin={() => pushToast({ title:"Cabin selector", body:"Opening cabin picker…"})}
      />
      <Hero show={state.tweaks.heroOn}/>
      <main className="content">
        <div className="col-main" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === "overview" && <OverviewCard state={state} totals={totals}/>}
          {activeTab === "insurance" && <InsuranceCard state={state} update={update} showErrors={showErrors}/>}
          {activeTab === "preferences" && <PreferencesCard state={state} update={update} showErrors={showErrors}/>}
          {activeTab === "pretravel" && <PreTravelCard state={state} update={update} showErrors={showErrors}/>}
          {activeTab === "addons" && <AddOnsCard state={state} update={update}
            showBundleAlert={state.bundleAlertOpen && state.tweaks.bundleAlertOn}
            dismissBundleAlert={() => update({ bundleAlertOpen: false })}/>}
        </div>
        <div className="col-side">
          <Receipt state={state} totals={totals} onSave={onSave} onCheckout={onCheckout}/>
        </div>
      </main>
      <Toast items={toasts} onRemove={removeToast}/>
      {loading && <LoadingOverlay label="Securing your booking…"/>}
      {tweaksOpen && <TweaksPanel state={state} setTweak={setTweak} close={() => setTweaksOpen(false)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
