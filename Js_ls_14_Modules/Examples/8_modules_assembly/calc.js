"use strict";

export function add(f, s) {
  return f + s;
}

export function sub(f, s) {
  return f - s;
}

/* Он не используется ни где и в bundle.js не попал */
export function div(f, s) {
  return f / s;
}
