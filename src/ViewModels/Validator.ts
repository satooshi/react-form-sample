type SelectionValues = { [key: string]: boolean };

const isSelectionBlank = (values: SelectionValues) => !Object.values(values).find((v) => v === true);

const isTextBlank = (text: string) => text.trim().length === 0;

const maxSelectionLength = (values: SelectionValues, max: number) => Object.values(values).length <= max;

const maxTextLength = (text: string, max: number) => text.trim().length <= max;

const minSelectionLength = (values: SelectionValues, min: number) => Object.values(values).length >= min;

const minTextLength = (text: string, min: number) => text.trim().length >= min;

const rangeSelectionLength = (values: SelectionValues, min: number, max: number) => {
  const {length} = Object.values(values);
  return length >= min && length <= max;
};

const rangeTextLength = (text: string, min: number, max: number) => {
  const {length} = text.trim();
  return length >= min && length <= max;
};

export function isBlank(value: string | boolean | { [key:string]: boolean }) {
  if (typeof value === 'string') {
    return isTextBlank(value);
  }

  if (typeof value === 'boolean') {
    return value === false;
  }

  return isSelectionBlank(value);
}

export function minLength(value: string | SelectionValues, min: number) {
  if (typeof value === 'string') {
    return minTextLength(value, min);
  }

  return minSelectionLength(value, min);
}

export function maxLength(value: string | SelectionValues, max: number) {
  if (typeof value === 'string') {
    return maxTextLength(value, max);
  }

  return maxSelectionLength(value, max);
}

export function rangeLength(value: string | SelectionValues, min: number, max: number) {
  if (typeof value === 'string') {
    return rangeTextLength(value, min, max);
  }

  return rangeSelectionLength(value, min, max);
}

export function maxNumber(value: number, max: number) {
  return value <= max;
}

export function minNumber(value: number, min: number) {
  return value >= min;
}

export function rangeNumber(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
