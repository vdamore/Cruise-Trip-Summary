// Section components: Overview, Insurance, Preferences, Add-ons, Receipt
const { useState: uS, useEffect: uE } = React;

function OverviewCard({ state, totals }) {
  const c = MOCK.cruise;
  return (
    <article className="card section-anchor" id="section-overview" data-screen-label="Overview">
      <div className="ov-header">
        <h2 className="ov-title">{c.title}</h2>
        <div className="ov-price-tag">
          <div className="amt">{fmt(totals.total)}</div>
          <span className="lbl">Total · {state.tweaks.travelers} travelers</span>
        </div>
      </div>
      <div className="ship-line">
        <div className="ship-logo" aria-hidden="true" style={{background: c.lineColor}}>{c.lineCode}</div>
        <div className="name"><b>{c.line}</b>{c.ship}</div>
      </div>
      <div className="ov-divider"/>
      <div className="kv-grid">
        <div className="kv">
          <p className="k">Departing</p>
          <div className="v">{c.depart.port}<small>{c.depart.date}</small></div>
        </div>
        <div className="kv">
          <p className="k">Returning</p>
          <div className="v">{c.returnT.port}<small>{c.returnT.date}</small></div>
        </div>
        <div className="kv">
          <p className="k">Cabin</p>
          <div className="v">{c.cabin}<small>{c.cabinDesc}</small></div>
        </div>
      </div>
      <h3 className="section-title">Ports of call</h3>
      <div className="ports-list" aria-label="Ports of call">
        {c.ports.map(p => (
          <span key={p} className="port-chip"><Icons.Pin size={12}/> {p}</span>
        ))}
      </div>
      <h3 className="section-title">Promotions &amp; discounts</h3>
      <div>
        {c.promos.map((p, i) => (
          <div key={i} className="promo-row">
            <Icons.Tag size={16}/>
            <div><strong style={{marginRight:6}}>{p.label}</strong>{p.text}</div>
          </div>
        ))}
      </div>
      <div className="ov-actions">
        <Button variant="outline"><Icons.ExternalLink size={16}/><span>View full itinerary</span></Button>
        <Button variant="outline"><Icons.Edit size={16}/><span>Change cabin</span></Button>
      </div>
    </article>
  );
}

function InsuranceCard({ state, update, showErrors }) {
  const ins = state.insurance;
  const missingState = ins.add && !ins.state;
  return (
    <article className="card section-anchor" id="section-insurance" data-screen-label="Insurance">
      <h2 className="card-title lg">Travel protection</h2>
      <p className="card-subtitle">Cover the unexpected. Add travel protection to your booking — cancel for any reason, medical coverage, and 24/7 emergency assistance.</p>

      <CheckboxRow
        checked={ins.add}
        onChange={v => update({ insurance: { ...ins, add: v, state: v ? ins.state : "" } })}
        icon="Shield"
        title={MOCK.insurance.title}
        desc={MOCK.insurance.desc}
        price={MOCK.insurance.pricePer}
        unit="per guest"
      />

      {ins.add && (
        <div style={{marginTop: 20}}>
          <label className="field-label" htmlFor="ins-state">State of residence<span className="req">*</span></label>
          <p className="field-hint">Required to determine coverage eligibility and pricing in your state.</p>
          <Select id="ins-state" value={ins.state} invalid={showErrors && missingState}
            options={MOCK.states}
            onChange={v => update({ insurance: { ...ins, state: v } })}/>
          {showErrors && missingState && <FieldError>Select your state of residence to continue.</FieldError>}
        </div>
      )}

      <div className="alert" style={{marginTop: 24}}>
        <span className="icon"><Icons.Info size={18}/></span>
        <div>
          <div className="title">Why add protection?</div>
          <div className="body">73% of AAA travelers add protection on cruise bookings. Trip cancellation reimburses up to 100% of non-refundable costs.</div>
        </div>
      </div>
    </article>
  );
}

function PreferencesCard({ state, update, showErrors }) {
  const p = state.prefs;
  const set = (k, v) => update({ prefs: { ...p, [k]: v } });
  const missDining = !p.dining;
  const missBed = !p.bed;
  return (
    <article className="card section-anchor" id="section-preferences" data-screen-label="Preferences">
      <h2 className="card-title lg">Dining &amp; cabin preferences</h2>
      <p className="card-subtitle">Tell us how you'd like things set up. We'll relay these preferences to your ship.</p>

      <div className="pref-grid">
        <div className="pref-field">
          <label className="field-label" htmlFor="p-dining"><Icons.Utensils size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Dining seating<span className="req">*</span></label>
          <p className="field-hint">When would you like to dine each evening?</p>
          <Select id="p-dining" value={p.dining} invalid={showErrors && missDining}
            options={MOCK.diningOptions} onChange={v => set("dining", v)}/>
          {showErrors && missDining && <FieldError>Select a dining time.</FieldError>}
        </div>
        <div className="pref-field">
          <label className="field-label" htmlFor="p-bed"><Icons.Bed size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Bed configuration<span className="req">*</span></label>
          <p className="field-hint">How should we set up your cabin beds?</p>
          <Select id="p-bed" value={p.bed} invalid={showErrors && missBed}
            options={MOCK.bedOptions} onChange={v => set("bed", v)}/>
          {showErrors && missBed && <FieldError>Select a bed configuration.</FieldError>}
        </div>
        <div className="pref-field">
          <label className="field-label" htmlFor="p-diet"><Icons.Leaf size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Dietary preference</label>
          <p className="field-hint">Optional — kitchen will accommodate.</p>
          <Select id="p-diet" value={p.diet || "No preference"} options={MOCK.dietOptions} onChange={v => set("diet", v)}/>
        </div>
        <div className="pref-field">
          <label className="field-label" htmlFor="p-cabin"><Icons.Accessibility size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Cabin requests</label>
          <p className="field-hint">Optional — subject to availability.</p>
          <Select id="p-cabin" value={p.cabinReq || "No preference"} options={MOCK.cabinReqOptions} onChange={v => set("cabinReq", v)}/>
        </div>
      </div>

      <h3 className="section-title" style={{marginTop:24}}>Celebrating something?</h3>
      <div className="pref-grid" style={{gridTemplateColumns:"1fr"}}>
        <div className="pref-field">
          <label className="field-label" htmlFor="p-occ"><Icons.Gift size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/>Special occasion</label>
          <p className="field-hint">We'll let the ship know so they can mark the moment.</p>
          <Select id="p-occ" value={p.occasion || "None"} options={MOCK.occasionOptions} onChange={v => set("occasion", v)}/>
        </div>
      </div>
    </article>
  );
}

function AddOnsCard({ state, update, showBundleAlert, dismissBundleAlert }) {
  const toggle = (id, v) => update({ addons: state.addons.map(a => a.id === id ? { ...a, on: v } : a) });
  const selectedCount = state.addons.filter(a => a.on).length;
  return (
    <article className="card section-anchor" id="section-addons" data-screen-label="Add-ons">
      <h2 className="card-title lg">Enhance your voyage</h2>
      <p className="card-subtitle">Lock in savings by bundling add-ons now — most packages are 15–45% cheaper when purchased before you sail.</p>

      {showBundleAlert && (
        <Alert
          title="Bundle & save"
          body="Add any 3 packages before checkout to unlock an extra 10% off your add-ons."
          onClose={dismissBundleAlert}
        />
      )}

      <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>
        {state.addons.map(a => (
          <CheckboxRow key={a.id}
            checked={a.on}
            onChange={v => toggle(a.id, v)}
            icon={a.icon}
            title={a.title}
            desc={a.desc}
            price={a.price}
            unit={a.unit}
          />
        ))}
      </div>

      <div style={{marginTop:16,fontSize:13,color:"var(--tds-color-gray-7)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>{selectedCount} of {state.addons.length} add-ons selected</span>
        {selectedCount > 0 && (
          <button onClick={() => update({ addons: state.addons.map(a => ({...a, on: false})) })}
            style={{background:"none",border:0,color:"var(--tds-color-primary-8)",fontWeight:500,cursor:"pointer",padding:0,textDecoration:"underline"}}>
            Clear all
          </button>
        )}
      </div>
    </article>
  );
}

function PreTravelCard({ state, update, showErrors }) {
  const pt = state.pretravel;
  const data = MOCK.pretravel;
  const T = state.tweaks.travelers;

  const setHotel  = (slot, val)     => update({ pretravel: { ...pt, [slot]: val } });
  const setNights = (slot, n)       => update({ pretravel: { ...pt, [slot]: n } });
  const setFlight = (slot, val)     => update({ pretravel: { ...pt, [slot]: val } });
  const setXfer   = (slot, val)     => update({ pretravel: { ...pt, [slot]: val } });

  return (
    <article className="card" id="section-pretravel" data-screen-label="Pre/post travel">
      <h2 className="card-title lg">Pre &amp; post-cruise travel</h2>
      <p className="card-subtitle">Round out your trip with a hotel, flights, and transfers — book through us for protected connections and a single price.</p>

      <div className="pretravel-grid">
        {/* Pre-cruise column */}
        <div className="pt-col">
          <div className="pt-col-header">
            <span className="pt-tag pre">Before · arrives Jun 11–12</span>
            <h3 className="pt-col-title">Before your cruise</h3>
            <p className="pt-col-sub">Miami, Florida</p>
          </div>

          <PTHotelPicker
            label="Hotel before cruise"
            options={data.hotel.pre}
            selected={pt.hotelPre}
            nights={pt.hotelPreNights || 1}
            onSelect={v => setHotel("hotelPre", v)}
            onNights={n => setNights("hotelPreNights", n)}
          />
          <PTFlightPicker
            label="Outbound flight"
            sub="To Miami (MIA) · Jun 11"
            options={data.flight.out}
            selected={pt.flightOut}
            travelers={T}
            onSelect={v => setFlight("flightOut", v)}
          />
          <PTTransferPicker
            label="Transfer to port"
            options={data.transfer.pre}
            selected={pt.transferPre}
            travelers={T}
            onSelect={v => setXfer("transferPre", v)}
          />
        </div>

        {/* Post-cruise column */}
        <div className="pt-col">
          <div className="pt-col-header">
            <span className="pt-tag post">After · departs Jun 19+</span>
            <h3 className="pt-col-title">After your cruise</h3>
            <p className="pt-col-sub">Miami, Florida</p>
          </div>

          <PTTransferPicker
            label="Transfer from port"
            options={data.transfer.post}
            selected={pt.transferPost}
            travelers={T}
            onSelect={v => setXfer("transferPost", v)}
          />
          <PTHotelPicker
            label="Hotel after cruise"
            options={data.hotel.post}
            selected={pt.hotelPost}
            nights={pt.hotelPostNights || 1}
            onSelect={v => setHotel("hotelPost", v)}
            onNights={n => setNights("hotelPostNights", n)}
          />
          <PTFlightPicker
            label="Return flight"
            sub="From Miami (MIA) · Jun 19+"
            options={data.flight.back}
            selected={pt.flightBack}
            travelers={T}
            onSelect={v => setFlight("flightBack", v)}
          />
        </div>
      </div>

      <div className="alert" style={{marginTop: 24}}>
        <span className="icon"><Icons.Info size={18}/></span>
        <div>
          <div className="title">Why book pre/post with us?</div>
          <div className="body">If your flight is delayed and you miss the ship, we re-route you to the next port — included at no charge. Hotels and transfers are protected by the same guarantee.</div>
        </div>
      </div>
    </article>
  );
}

// --- Pre/post travel sub-components ---

function PTHotelPicker({ label, options, selected, nights, onSelect, onNights }) {
  return (
    <div className="pt-section">
      <div className="pt-section-head">
        <span className="pt-icon"><Icons.Hotel size={18}/></span>
        <span className="pt-label">{label}</span>
        {selected && (
          <button type="button" className="pt-clear" onClick={() => onSelect(null)}>Remove</button>
        )}
      </div>
      <div className="pt-options">
        {options.map(h => {
          const on = selected && selected.id === h.id;
          return (
            <button key={h.id} type="button"
              className={`pt-opt hotel ${on ? "selected" : ""}`}
              onClick={() => onSelect(on ? null : h)}>
              <div className="pt-opt-main">
                <div className="pt-opt-title">
                  {h.name}
                  <span className="pt-stars" aria-label={`${h.stars} stars`}>
                    {Array.from({length: h.stars}).map((_, i) => <Icons.Star key={i} size={11}/>)}
                  </span>
                </div>
                <div className="pt-opt-meta">{h.dist}</div>
                <div className="pt-opt-perks">
                  {h.perks.map((p, i) => <span key={i} className="pt-perk">{p}</span>)}
                </div>
              </div>
              <div className="pt-opt-price">
                <span className="pt-price">{fmt(h.price)}</span>
                <small>per night</small>
              </div>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="pt-nights">
          <label className="pt-nights-label">Nights:</label>
          <div className="pt-stepper">
            <button type="button" onClick={() => onNights(Math.max(1, nights - 1))} aria-label="Fewer nights">
              <Icons.Minus size={14}/>
            </button>
            <span className="pt-stepper-val">{nights}</span>
            <button type="button" onClick={() => onNights(Math.min(7, nights + 1))} aria-label="More nights">
              <Icons.Plus size={14}/>
            </button>
          </div>
          <span className="pt-nights-total">{fmt(selected.price * nights)} total</span>
        </div>
      )}
    </div>
  );
}

function PTFlightPicker({ label, sub, options, selected, travelers, onSelect }) {
  return (
    <div className="pt-section">
      <div className="pt-section-head">
        <span className="pt-icon"><Icons.Plane size={18}/></span>
        <span className="pt-label">{label}</span>
        <span className="pt-sub">{sub}</span>
        {selected && (
          <button type="button" className="pt-clear" onClick={() => onSelect(null)}>Remove</button>
        )}
      </div>
      <div className="pt-options">
        {options.map(f => {
          const on = selected && selected.id === f.id;
          return (
            <button key={f.id} type="button"
              className={`pt-opt flight ${on ? "selected" : ""}`}
              onClick={() => onSelect(on ? null : f)}>
              <div className="pt-opt-main">
                <div className="pt-opt-title">
                  <span className="pt-airline">{f.airline}</span>
                  <span className="pt-flightno">{f.flightNo}</span>
                </div>
                <div className="pt-opt-times">{f.times}</div>
                <div className="pt-opt-meta">{f.stops}</div>
              </div>
              <div className="pt-opt-price">
                <span className="pt-price">{fmt(f.price)}</span>
                <small>per guest · {fmt(f.price * travelers)} total</small>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PTTransferPicker({ label, options, selected, travelers, onSelect }) {
  return (
    <div className="pt-section">
      <div className="pt-section-head">
        <span className="pt-icon"><Icons.Car size={18}/></span>
        <span className="pt-label">{label}</span>
        {selected && (
          <button type="button" className="pt-clear" onClick={() => onSelect(null)}>Remove</button>
        )}
      </div>
      <div className="pt-options">
        {options.map(x => {
          const on = selected && selected.id === x.id;
          const mult = x.unit === "per guest" ? travelers : 1;
          return (
            <button key={x.id} type="button"
              className={`pt-opt transfer ${on ? "selected" : ""}`}
              onClick={() => onSelect(on ? null : x)}>
              <div className="pt-opt-main">
                <div className="pt-opt-title">{x.type}</div>
                <div className="pt-opt-meta">{x.desc}</div>
              </div>
              <div className="pt-opt-price">
                <span className="pt-price">{fmt(x.price)}</span>
                <small>{x.unit} · {fmt(x.price * mult)} total</small>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Receipt({ state, totals, onSave, onCheckout }) {
  const c = MOCK.cruise;
  const addons = state.addons.filter(a => a.on);
  const insurance = state.insurance.add && state.insurance.state ? MOCK.insurance : null;
  const pt = state.pretravel || {};
  const T = state.tweaks.travelers;

  // Build pretravel line items
  const ptItems = [];
  if (pt.hotelPre) {
    const n = pt.hotelPreNights || 1;
    ptItems.push({ key: "hpre", icon: "Hotel", title: pt.hotelPre.name, meta: `Pre-cruise · ${n} ${n === 1 ? "night" : "nights"}`, amt: pt.hotelPre.price * n });
  }
  if (pt.flightOut) {
    ptItems.push({ key: "fout", icon: "Plane", title: `${pt.flightOut.airline} ${pt.flightOut.flightNo}`, meta: `Outbound · ${T} travelers`, amt: pt.flightOut.price * T });
  }
  if (pt.transferPre) {
    const m = pt.transferPre.unit === "per guest" ? T : 1;
    ptItems.push({ key: "tpre", icon: "Car", title: pt.transferPre.type, meta: "Pre-cruise transfer", amt: pt.transferPre.price * m });
  }
  if (pt.transferPost) {
    const m = pt.transferPost.unit === "per guest" ? T : 1;
    ptItems.push({ key: "tpost", icon: "Car", title: pt.transferPost.type, meta: "Post-cruise transfer", amt: pt.transferPost.price * m });
  }
  if (pt.hotelPost) {
    const n = pt.hotelPostNights || 1;
    ptItems.push({ key: "hpost", icon: "Hotel", title: pt.hotelPost.name, meta: `Post-cruise · ${n} ${n === 1 ? "night" : "nights"}`, amt: pt.hotelPost.price * n });
  }
  if (pt.flightBack) {
    ptItems.push({ key: "fback", icon: "Plane", title: `${pt.flightBack.airline} ${pt.flightBack.flightNo}`, meta: `Return · ${T} travelers`, amt: pt.flightBack.price * T });
  }

  const itemCount = 1 + (insurance ? 1 : 0) + addons.length + ptItems.length;

  // Deadline urgency
  const finalDate = new Date(c.finalPaymentDate);
  const now = new Date();
  const days = Math.round((finalDate - now) / (1000*60*60*24));
  const urgent = days <= 7;

  return (
    <aside className="receipt" aria-label="Trip breakdown">
      <div className="receipt-top">
        <div className="receipt-title-row">
          <h2 className="receipt-title">Trip breakdown</h2>
          <span className="item-count">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
        </div>

        <div className="line-item">
          <div className="thumb" style={{backgroundImage:`url("${c.images.thumb}")`}}/>
          <div className="li-body">
            <div className="li-title">{c.title}</div>
            <div className="li-meta">{c.line} · {state.tweaks.travelers} travelers</div>
          </div>
          <div className="li-amt">{fmt(totals.cruiseSub)}</div>
        </div>

        {insurance && (
          <div className="line-item addon">
            <div className="thumb"><Icons.Shield size={24} color="var(--tds-color-primary-8)"/></div>
            <div className="li-body">
              <div className="li-title">{insurance.title}</div>
              <div className="li-meta">{state.tweaks.travelers} travelers</div>
            </div>
            <div className="li-amt">{fmt(totals.insTotal)}</div>
          </div>
        )}

        {ptItems.map(p => {
          const Ico = Icons[p.icon];
          return (
            <div key={p.key} className="line-item addon">
              <div className="thumb">{Ico && <Ico size={24} color="var(--tds-color-primary-8)"/>}</div>
              <div className="li-body">
                <div className="li-title">{p.title}</div>
                <div className="li-meta">{p.meta}</div>
              </div>
              <div className="li-amt">{fmt(p.amt)}</div>
            </div>
          );
        })}

        {addons.map(a => {
          const Ico = Icons[a.icon];
          const mult = a.unit === "per guest" ? state.tweaks.travelers : 1;
          return (
            <div key={a.id} className="line-item addon">
              <div className="thumb">{Ico && <Ico size={24} color="var(--tds-color-primary-8)"/>}</div>
              <div className="li-body">
                <div className="li-title">{a.title}</div>
                <div className="li-meta">{a.unit === "per guest" ? `${state.tweaks.travelers} travelers` : "Per cabin"}</div>
              </div>
              <div className="li-amt">{fmt(a.price * mult)}</div>
            </div>
          );
        })}
      </div>

      <div className="sep-dashed"/>

      <div className="receipt-totals">
        <div className="tot-row">
          <span>Subtotal</span>
          <span className="v">{fmt(totals.cruiseSub + totals.addonTotal + totals.insTotal)}</span>
        </div>
        <div className="tot-row muted">
          <span>Taxes, port fees &amp; gratuities</span>
          <span className="v">{fmt(totals.taxes)}</span>
        </div>
        <div className="tot-row grand">
          <span>Total</span>
          <span className="v">{fmt(totals.total)}</span>
        </div>
        <div className="tot-row due-now" style={{marginTop:6}}>
          <span>Due now (deposit)</span>
          <span className="v">{fmt(totals.deposit)}</span>
        </div>
        <div className={`deadline ${urgent ? "urgent" : ""}`}>
          <div className="l1">
            <span>Final payment</span>
            <span className="v">{fmt(totals.remaining)}</span>
          </div>
          <div className="l2">Due {fmtDate(c.finalPaymentDate)} by 4:00 PM UTC</div>
          {urgent && <span className="chip-u">Due soon</span>}
        </div>
      </div>

      <div className="receipt-cta">
        <Button variant="light" size="md" onClick={onSave}>
          <Icons.Bookmark size={16}/><span>Save trip</span>
        </Button>
        <Button variant="primary" size="lg" onClick={onCheckout}>
          <span>Proceed to checkout</span><Icons.ArrowRight size={18}/>
        </Button>
      </div>
    </aside>
  );
}

Object.assign(window, { OverviewCard, InsuranceCard, PreferencesCard, AddOnsCard, PreTravelCard, Receipt });
