(() => {
  'use strict';
  const dataset = window.CALENDAR_DATA;
  if (!dataset || !Array.isArray(dataset.months)) {
    document.querySelector('#postGrid').textContent = 'Não foi possível carregar o planejamento. Confira data/calendario.js.';
    return;
  }
  const qs = s => document.querySelector(s);
  const el = (tag, cls, text) => { const x = document.createElement(tag); if (cls) x.className=cls; if (text!==undefined) x.textContent=text; return x; };
  const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad = n => String(n).padStart(2,'0');
  const formatDate = v => { const [y,m,d] = (v || '').split('-'); return (d && m) ? `${d}/${m}` : ''; };
  const LS_PREFIX='1727_editorial_review_v1_';
  let month = null, filter='todos', editMode=false, feedback={};
  const params=new URLSearchParams(location.search);
  const preferredMonth=params.get('mes');
  let selectedMonth = dataset.months.find(m => m.id===preferredMonth) || dataset.months.find(m => m.id===dataset.currentMonth) || dataset.months[0];

  function toast(message){ const t=qs('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>t.classList.remove('visible'),2600); }
  function loadFeedback(){try{feedback=JSON.parse(localStorage.getItem(LS_PREFIX+month.id) || '{}')}catch{feedback={}};}
  function saveFeedback(){try{localStorage.setItem(LS_PREFIX+month.id,JSON.stringify(feedback))}catch{toast('Não foi possível salvar neste navegador');} renderMetrics();}
  function state(post){const p=feedback[post.id];return {status:p?.status||'Pendente',note:p?.note||'',caption:p?.caption??post.caption};}
  function updatePost(post,key,value){feedback[post.id]??={};feedback[post.id][key]=value;saveFeedback();}
  function renderMetrics(){qs('#metricTotal').textContent=pad(month.posts.length);qs('#metricPhotos').textContent=pad(month.posts.filter(p=>p.type==='foto').length);qs('#metricVideos').textContent=pad(month.posts.filter(p=>p.type==='video').length);qs('#metricApproved').textContent=pad(month.posts.filter(p=>state(p).status==='Aprovado').length);qs('#filterCount').textContent=month.posts.length;}
  function render(){month=selectedMonth;loadFeedback();qs('#monthTitle').textContent=month.label;qs('#monthEyebrow').textContent=month.label.toUpperCase();qs('#monthSummary').textContent=month.summary||'';qs('#monthRange').textContent=`${month.posts.length} PUBLICAÇÕES · ${month.label.toUpperCase()}`;document.title=`1727 — ${month.label} · Calendário Editorial`;renderMetrics();const container=qs('#postGrid');container.replaceChildren();for(const p of month.posts){if(filter!=='todos'&&p.type!==filter)continue;container.append(renderCard(p));} }
  function renderCard(post){
    const st=state(post),card=el('article','post-card');card.dataset.postId=post.id;
    const media=el('div','media');
    media.append(el('span','date-pill',`${formatDate(post.date)} · POST ${post.id}`));
    if(post.type==='foto'){
      const img=el('img');img.src=post.image;img.alt=`Foto do post ${post.id}: ${post.title}`;img.loading='lazy';
      img.addEventListener('click',()=>openImage(post));media.append(img);media.append(el('span','type-pill','FOTO / FEED'));
    }else if(post.videoUrl){
      if(/\.(mp4|webm|ogg)(\?|$)/i.test(post.videoUrl)){
        const v=el('video');v.src=post.videoUrl;v.controls=true;v.playsInline=true;v.preload='metadata';media.append(v);
      }else{
        const p=el('div','media-placeholder');p.append(el('div','playcircle','▶'));p.append(el('strong',null,'Vídeo do mês'));const a=el('a',null,'Assistir ao vídeo ↗');a.href=post.videoUrl;a.target='_blank';a.rel='noopener noreferrer';p.append(a);media.append(p);
      }
    }else{const p=el('div','media-placeholder');p.append(el('div','playcircle','▶'));p.append(el('strong',null,'Vídeo em produção'));p.append(el('small',null,'Espaço reservado para inserir o vídeo quando estiver pronto.'));media.append(p);}
    const body=el('div','post-body');body.innerHTML=`<div class="meta"><small>${escapeHTML(post.type==='foto'?'Imagem / feed':'Vídeo / reels')}</small><span class="postnum">${escapeHTML(post.id)} / ${pad(month.posts.length)}</span></div><span class="category">${escapeHTML(post.category||'')}</span><h3>${escapeHTML(post.title)}</h3>`;
    const caption=el('div','caption',st.caption);body.append(caption);
    if(editMode){const ta=el('textarea','edit-caption');ta.value=st.caption;ta.setAttribute('aria-label','Editar legenda');ta.addEventListener('input',()=>{updatePost(post,'caption',ta.value);caption.textContent=ta.value;});body.append(ta);}
    const review=el('div','review-row');const statusLabel=el('label',null,'APROVAÇÃO');const statusSelect=el('select');statusSelect.setAttribute('aria-label','Status do post '+post.id);for(const option of ['Pendente','Aprovado','Ajustar']){const o=el('option',null,option);o.value=option;o.selected=(st.status===option);statusSelect.append(o);}statusSelect.addEventListener('change',()=>updatePost(post,'status',statusSelect.value));review.append(statusLabel,statusSelect);body.append(review);
    const noteLabel=el('label','comment-label','OBSERVAÇÕES / AJUSTES');const note=el('textarea','comment');note.placeholder='Anote o que precisa mudar neste post...';note.value=st.note;note.addEventListener('input',()=>updatePost(post,'note',note.value));body.append(noteLabel,note);
    const actions=el('div','download-actions');if(post.type==='foto'){
      const a=el('a','primary','↓ Baixar foto');a.href=post.image;a.download=post.filename || post.image.split('/').pop();actions.append(a);
      const view=el('button',null,'Ampliar ↗');view.type='button';view.addEventListener('click',()=>openImage(post));actions.append(view);
    }else if(post.videoUrl){const a=el('a','primary','Ver vídeo ↗');a.href=post.videoUrl;a.target='_blank';a.rel='noopener noreferrer';actions.append(a);}
    else {const label=el('span','category','Aguardando material');actions.append(label);}
    const copy=el('button',null,'Copiar copy');copy.type='button';copy.addEventListener('click',()=>copyText(state(post).caption));actions.append(copy);body.append(actions);card.append(media,body);return card;
  }
  function openImage(post){const d=qs('#imageDialog');qs('#largePhoto').src=post.image;qs('#largePhoto').alt=post.title;qs('#dialogCaption').textContent=post.title;d.showModal();}
  async function copyText(text){try{await navigator.clipboard.writeText(text);toast('Copiado para a área de transferência');}catch{const t=el('textarea');t.value=text;document.body.append(t);t.select();document.execCommand('copy');t.remove();toast('Copiado');}}
  function reviewText(){const lines=[`1727 — Aprovação do calendário: ${month.label}`,''];for(const p of month.posts){const s=state(p);lines.push(`${p.id}. ${formatDate(p.date)} — ${p.title} [${s.status}]`);if(s.note.trim())lines.push(`   Observação: ${s.note.trim()}`);if(s.caption!==p.caption)lines.push('   Legenda alterada: '+s.caption.replaceAll('\n',' / '));}return lines.join('\n');}
  function downloadFeedback(){const payload={project:'1727',month:month.id,exportedAt:new Date().toISOString(),review:month.posts.map(p=>({id:p.id,title:p.title,date:p.date,type:p.type,...state(p)}))};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});const a=el('a');a.href=URL.createObjectURL(blob);a.download=`1727-aprovacoes-${month.id}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000);toast('Avaliação exportada');}
  function shareFeedback(){const text=reviewText();if(navigator.share){navigator.share({title:`1727 — ${month.label}`,text}).catch(()=>{});return;}copyText(text);const url=`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;window.open(url,'_blank','noopener,noreferrer');}
  const select=qs('#monthSelect');for(const m of dataset.months){const o=el('option',null,m.label);o.value=m.id;select.append(o);}select.value=selectedMonth.id;select.addEventListener('change',()=>{selectedMonth=dataset.months.find(m=>m.id===select.value);filter='todos';qs('[data-filter="todos"]').click();history.replaceState(null,'',location.pathname+'?mes='+selectedMonth.id);render();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('selected',b===button));render();}));
  qs('#editToggle').addEventListener('click',()=>{editMode=!editMode;qs('#editToggle').textContent=editMode?'✓ Concluir edição':'✎ Editar legendas';render();toast(editMode?'Edição local ativada; copie o feedback para enviar alterações.':'Edição local concluída.');});
  qs('#copySummary').addEventListener('click',()=>copyText(reviewText()));qs('#reviewButton').addEventListener('click',shareFeedback);qs('#downloadFeedback').addEventListener('click',downloadFeedback);qs('#backToTop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));qs('#closeDialog').addEventListener('click',()=>qs('#imageDialog').close());qs('#imageDialog').addEventListener('click',e=>{if(e.target===qs('#imageDialog'))qs('#imageDialog').close();});
  render();
})();
