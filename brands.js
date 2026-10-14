'use strict';
(() => {
 const root = document.querySelector('.brands-page');
 if (!root) return;
 const input = root.querySelector('#brand-search');
 const list = root.querySelector('#brand-results');
 const status = root.querySelector('#brand-status');
 const alphabet = root.querySelector('.brand-alphabet');
 const pager = root.querySelector('.brand-pagination');
 const featured = root.querySelector('.brand-featured');
 const mobileLayout = matchMedia('(max-width:760px)');
 function positionAlphabet() {
  if (mobileLayout.matches) root.querySelector('.brand-search-form').insertAdjacentElement('afterend',alphabet);
  else root.querySelector('.brand-directory').insertBefore(alphabet,root.querySelector('.brand-results-heading'));
 }
 positionAlphabet();
 mobileLayout.addEventListener('change',positionAlphabet);
 const params = new URLSearchParams(location.search);
 const state = { text:params.get('q') || '', letter:params.get('letter') || '', page:Math.max(1, Number(params.get('page')) || 1) };
 const pageSize = 32;
 let brands = [];
 const aliases = {
  'Chanel':['шанель'], 'Byredo':['байредо'], 'Creed':['крид'],
  'Le Labo':['ле лабо','лелабо'], 'Tom Ford':['том форд','томфорд'],
  'Maison Francis Kurkdjian':['мейсон франсис куркджан','мезон франсис куркджан','куркджан','мфк'],
  'Guerlain':['герлен'], 'Dior':['диор'], 'Diptyque':['диптик'],
  'Ex Nihilo':['экс нихило','экснихило'], 'Giorgio Armani':['армани'],
  'Yves Saint Laurent':['ив сен лоран','исл'], 'Hermès':['эрмес','гермес'],
  'Jo Malone London':['джо малон'], 'Lattafa Perfumes':['латтафа']
 };
 const clean = value => value.toLocaleLowerCase('ru').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ё/g,'е').replace(/[’'".&\s-]/g,'');
 const firstLetter = name => {
  const first = name.trim().charAt(0).toUpperCase();
  return /[А-ЯЁ]/.test(first) ? 'А-Я' : /[0-9]/.test(first) ? '0-9' : /[A-Z]/.test(first) ? first : '#';
 };
 const plural = (n, forms) => n%100>=11 && n%100<=14 ? forms[2] : n%10===1 ? forms[0] : n%10>=2 && n%10<=4 ? forms[1] : forms[2];
 const countCopy = n => n.toLocaleString('ru')+' '+plural(n,['аромат','аромата','ароматов']);
 const url = name => 'catalog.html?brand='+encodeURIComponent(name);
 function syncUrl() {
  const next = new URL(location.href);
  [['q',state.text.trim()],['letter',state.letter],['page',state.page>1?String(state.page):'']].forEach(([key,value]) => value ? next.searchParams.set(key,value) : next.searchParams.delete(key));
  history.replaceState(null,'',next);
 }
 function render() {
  const needle = clean(state.text);
  const results = brands.filter(b => (!state.letter || firstLetter(b.name)===state.letter) && (!needle || [b.name,...(aliases[b.name] || [])].some(value=>clean(value).includes(needle))));
  const pages = Math.ceil(results.length/pageSize);
  state.page = Math.min(Math.max(1,Math.floor(state.page)),Math.max(1,pages));
  const start = (state.page-1)*pageSize;
  const slice = results.slice(start,start+pageSize);
  featured.hidden = !!(needle || state.letter);
  root.querySelector('[data-brand-clear]').hidden = !state.text;
  root.querySelector('[data-brand-reset]').hidden = !(state.text || state.letter);
  status.textContent = results.length ? 'Показаны '+(start+1)+'-'+(start+slice.length)+' из '+results.length+' '+plural(results.length,['бренда','брендов','брендов'])+(state.letter?' · '+state.letter:'') : 'Ничего не найдено';
  const letters = ['',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ','А-Я','0-9'];
  if (brands.some(b=>firstLetter(b.name)==='#')) letters.push('#');
  alphabet.innerHTML = letters.map(letter => '<button type="button" class="brand-letter" data-brand-letter="'+letter+'" aria-pressed="'+(letter===state.letter)+'" aria-controls="brand-results"'+(letter && !brands.some(b=>firstLetter(b.name)===letter)?' disabled':'')+'>'+(letter || 'Все')+'</button>').join('');
  list.innerHTML = slice.length ? '<ul class="brand-list">'+slice.map(b=>'<li><a class="brand-list-link" href="'+url(b.name)+'"><span class="brand-list-name">'+esc(b.name)+'</span><span class="brand-list-count" aria-label="'+countCopy(b.count)+' в базе">'+b.count.toLocaleString('ru')+'</span></a></li>').join('')+'</ul>' : '<div class="brand-empty"><h3>Такой бренд не найден</h3><p>Проверьте название или сбросьте поиск и выбранную букву.</p><button type="button" class="button secondary" data-brand-reset>Показать все бренды</button></div>';
  pager.innerHTML = pages>1 ? '<button type="button" class="brand-page-button" data-brand-page="'+(state.page-1)+'" aria-label="Предыдущая страница"'+(state.page===1?' disabled':'')+'>'+icon('left')+'</button>'+Array.from({length:pages},(_,i)=>'<button type="button" class="brand-page-button" data-brand-page="'+(i+1)+'" aria-label="Страница '+(i+1)+'"'+(i+1===state.page?' aria-current="page"':'')+'>'+(i+1)+'</button>').join('')+'<button type="button" class="brand-page-button" data-brand-page="'+(state.page+1)+'" aria-label="Следующая страница"'+(state.page===pages?' disabled':'')+'>'+icon('arrow')+'</button>' : '';
  list.setAttribute('aria-busy','false');
  syncUrl();
 }
 input.value = state.text;
 input.addEventListener('input',()=>{ state.text=input.value; state.page=1; render(); });
 root.querySelector('.brand-search-form').addEventListener('submit',event=>{event.preventDefault(); state.page=1; render();});
 root.addEventListener('click',event=>{
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-brand-letter')) { state.letter=button.dataset.brandLetter; state.page=1; render(); alphabet.querySelector('[data-brand-letter="'+state.letter+'"]')?.focus({preventScroll:true}); }
  if (button.hasAttribute('data-brand-page')) { state.page=Number(button.dataset.brandPage); render(); list.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); list.querySelector('a')?.focus({preventScroll:true}); }
  if (button.hasAttribute('data-brand-clear') || button.hasAttribute('data-brand-reset')) { state.text=''; if(button.hasAttribute('data-brand-reset'))state.letter=''; state.page=1; input.value=''; render(); input.focus({preventScroll:true}); }
 });
 fetch('assets/data/brands.json?v=1').then(response=>{if(!response.ok)throw new Error('Brand directory unavailable');return response.json();}).then(data=>{
  if (!Array.isArray(data.brands) || !data.brands.length) throw new Error('Empty brand directory');
  brands=data.brands;
  root.querySelector('#brand-total').textContent=brands.length+' '+plural(brands.length,['бренд','бренда','брендов']);
  const names=['Byredo','Chanel','Creed','Dior','Dolce&Gabbana','Tom Ford'];
  const logos={'Byredo':'byredo','Chanel':'chanel','Creed':'creed','Dior':'dior','Dolce&Gabbana':'dolcegabbana','Tom Ford':'tomford'};
  root.querySelector('.brand-featured-grid').innerHTML=names.map(name=>brands.find(b=>b.name===name)).filter(Boolean).map(b=>'<a class="brand-feature-link" href="'+url(b.name)+'" aria-label="'+esc(b.name)+'"><img class="brand-feature-logo brand-feature-logo-'+logos[b.name]+'" src="assets/brand-logos/'+logos[b.name]+'.svg" alt="" width="112" height="40"></a>').join('');
  render();
 }).catch(()=>{status.textContent='Не удалось загрузить справочник';list.setAttribute('aria-busy','false');list.innerHTML='<div class="brand-empty"><h3>Бренды пока не загрузились</h3><p>Обновите страницу, чтобы попробовать ещё раз.</p><a class="button secondary" href="brands.html">Обновить страницу</a></div>';});
})();
