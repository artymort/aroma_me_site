'use strict';

// Keep catalog source values intact; apply the site's spelling to rendered copy.
(() => {
 const spelling = value => value.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
 const displayCopy = value => {
  const corrected = spelling(value);
  return /https?:\/\/|www\./i.test(corrected) ? corrected : corrected.replace(/(\S)\s*&\s*(?=\S)/g, '$1 & ');
 };
 const copyAttributes = ['alt', 'aria-label', 'aria-description', 'aria-valuetext', 'placeholder', 'title', 'content'];
 const excluded = 'script, style, textarea';

 function normalizeOne(node) {
  if (node.nodeType === Node.TEXT_NODE) {
   if (node.parentElement?.closest(excluded)) return;
   const current = node.nodeValue;
   const corrected = displayCopy(current);
   if (corrected !== current) node.nodeValue = corrected;
  } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches(excluded)) {
   for (const name of copyAttributes) {
    const current = node.getAttribute(name);
    if (!current) continue;
    const corrected = name === 'content' && /^(?:https?:|\/)/i.test(current) ? spelling(current) : displayCopy(current);
    if (corrected !== current) node.setAttribute(name, corrected);
   }
  }
 }

 function normalizeTree(root) {
  normalizeOne(root);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
   acceptNode(node) {
    return node.nodeType === Node.ELEMENT_NODE && node.matches(excluded)
     ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
   }
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) normalizeOne(node);
 }

 normalizeTree(document.documentElement);
 new MutationObserver(records => {
  for (const record of records) {
   if (record.type === 'childList') {
    for (const node of record.addedNodes) normalizeTree(node);
   } else normalizeOne(record.target);
  }
 }).observe(document.documentElement, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: copyAttributes
 });
})();
