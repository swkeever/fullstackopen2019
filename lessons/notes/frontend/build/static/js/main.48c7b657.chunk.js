(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
  15(t, e, n) { t.exports = n(39) },
  38(t, e, n) {},
  39(t, e, n) {
    n.r(e); const a = n(0); const r = n.n(a); const o = n(13); const c = n.n(o); const u = n(14); const i = n(2); const l = n(3); const m = n.n(l); const f = function () { return m.a.get('/api/notes').then(t => t.data) }; const s = function (t) { return m.a.post('/api/notes', t).then(t => t.data) }; const p = function (t, e) { return m.a.put(''.concat('/api/notes', '/').concat(t), e).then(t => t.data) }; const d = function (t) { const e = t.note; const n = t.toggleImportance; const a = e.important ? 'make not important' : 'make important'; return r.a.createElement('li', { className: 'note' }, e.content, r.a.createElement('button', { onClick: n }, a)) }; const E = function (t) { const e = t.message; return e ? r.a.createElement('div', { className: 'error' }, e) : null }; const b = function () { return r.a.createElement('div', { style: { color: 'green', fontStyle: 'italic', fontSize: 16 } }, r.a.createElement('br', null), r.a.createElement('em', null, 'Note app, Department of Computer Science, University of Helsinki 2019')) }; const v = function () { const t = Object(a.useState)([]); const e = Object(i.a)(t, 2); const n = e[0]; const o = e[1]; const c = Object(a.useState)('a new note...'); const l = Object(i.a)(c, 2); const m = l[0]; const v = l[1]; const g = Object(a.useState)(!0); const h = Object(i.a)(g, 2); const O = h[0]; const j = h[1]; const w = Object(a.useState)(''); const S = Object(i.a)(w, 2); const k = S[0]; const y = S[1]; Object(a.useEffect)(() => { f().then((t) => { o(t) }) }, []); const N = O ? n : n.filter(t => t.important); return r.a.createElement('div', null, r.a.createElement('h1', null, 'Notes'), r.a.createElement(E, { message: k }), r.a.createElement('div', null, r.a.createElement('button', { onClick() { return j(!O) } }, 'show ', O ? 'important' : 'all')), r.a.createElement('ul', null, N.map(t => r.a.createElement(d, { key: t.id, note: t, toggleImportance() { return (function (t) { const e = n.find(e => e.id === t); const a = Object(u.a)({}, e, { important: !e.important }); p(t, a).then((e) => { o(n.map(n => (n.id !== t ? n:e))) }).catch((a) => { y('Note '.concat(e.content, ' was already removed from server')), setTimeout(() => { y(null) }, 5e3), o(n.filter(e => e.id !== t)) }) }(t.id)) } }))), r.a.createElement('form', { onSubmit(t) { t.preventDefault(); const e = { content: m, date: (new Date()).toISOString(), important: Math.random() > 0.5 }; s(e).then((t) => { o(n.concat(t)), v('') }) } }, r.a.createElement('input', { value: m, onChange(t) { v(t.target.value) } }), r.a.createElement('button', { type: 'submit' }, 'save')), r.a.createElement(b, null)) }; n(38); c.a.render(r.a.createElement(v, null), document.getElementById('root'))
  },
}, [[15, 1, 2]]])
// # sourceMappingURL=main.48c7b657.chunk.js.map
