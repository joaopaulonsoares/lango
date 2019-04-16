import React from 'react';
import { languages } from './languages';

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(`^${escapedValue}`, 'i');

  return languages.filter(language => regex.test(language.name));
}

export function getSuggestionValue(suggestion) {
  return suggestion.name;
}

export function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

