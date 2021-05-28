import ViewModel from "./ViewModel";

export type Errors = {
  text1?: string;
  text2?: string;
  textArea?: string;
  radioList?: string;
  select?: string;
  switch?: string;
  inlineCheck?: string;
  inlineRadio?: string;
};

export type RadioOption = '' | 'radio1' | 'radio2' | 'radio3';
export type SelectOption = '' | 'option1' | 'option2'| 'option3';
export type InlineRadioOption = '' | 'radio1' | 'radio2' | 'radio3';

type InlineCheckOption = '1' | '2';
export type InlineCheckOptions = { [key in InlineCheckOption]: boolean };

export type Props = {
  errors?: Errors;
  text1: string;
  text2: string;
  textArea: string;
  radioList: string;
  select: SelectOption;
  switch: boolean;
  inlineCheck: InlineCheckOptions;
  inlineRadio: InlineRadioOption;
};

// A ViewModel MUST implement 2 ways data transformer.
// 1. Repository -> ViewModel: to transform persistent layer to UI layer
//   This is done by implementing constructor.
// 2. ViewModel -> Repository: to transform application layer data to persistent layer data
//   This is done by implementing `get requestData()`.
export default class FormViewModel implements ViewModel {
  #errors: Errors = {};

  #text1: string;

  #text2: string;

  #textArea: string;

  #radioList: string;

  #select: SelectOption;

  #switch: boolean;

  #inlineRadio: InlineRadioOption;

  #inlineCheck: InlineCheckOptions;

  constructor(props: Props) {
    this.#errors = props.errors || {};
    this.#text1 = props.text1;
    this.#text2 = props.text2;
    this.#textArea = props.textArea;
    this.#radioList = props.radioList
    this.#select = props.select;
    this.#switch = props.switch;
    this.#inlineRadio = props.inlineRadio;
    this.#inlineCheck = { ...{1: false, 2: false}, ...props.inlineCheck};
  }

  // Interfaces used by UI components

  get serialized() {
    return {
      errors: this.errors,
      text1: this.#text1,
      text2: this.#text2,
      textArea: this.#textArea,
      radioList: this.#radioList,
      select: this.#select,
      switch: this.#switch,
      inlineRadio: this.#inlineRadio,
      inlineCheck: {...this.#inlineCheck},
    }
  }

  get text1() { return this.#text1 }

  set text1(value: string) {
    this.#text1 = value
    this.validateText1();
  }

  get text2() { return this.#text2 }

  set text2(value: string) {
    this.#text2 = value
    this.validateText2();
  }

  get textArea() { return this.#textArea }

  set textArea(value: string) {
    this.#textArea = value
    this.validateTextArea();
  }

  get radioList() { return this.#radioList }

  set radioList(value: string) {
    this.#radioList = value
    this.validateRadioList();
  }

  get select() { return this.#select }

  set select(value: SelectOption) {
    this.#select = value
    this.validateSelect();
  }

  get switch() { return this.#switch }

  set switch(value: boolean) {
    this.#switch = value
    this.validateSwitch();
  }

  get inlineRadio() { return this.#inlineRadio }

  set inlineRadio(value: InlineRadioOption) {
    this.#inlineRadio = value
    this.validateInlineRadio();
  }

  get inlineCheck() { return this.#inlineCheck }

  set inlineCheck(value: InlineCheckOptions) {
    this.#inlineCheck = {...value}
    this.validateInlineCheck();
  }

  replaceInlineCheck(value: InlineCheckOptions) {
    this.#inlineCheck = { ...this.#inlineCheck, ...value }
    this.validateInlineCheck();
  }

  // ViewModel Validation

  get errors() {
    return {...this.#errors};
  }

  validate() {
    this.#errors = {};

    this.validateText1();
    this.validateText2();
    this.validateTextArea();
    this.validateRadioList();
    this.validateSelect();
    this.validateSwitch();
    this.validateInlineCheck();
    this.validateInlineRadio();

    return this.errors;
  }

  private validateText1() {
    if (this.#text1.length === 0) {
      this.#errors.text1 = 'Required';
      return;
    }

    delete this.#errors.text1;
  }

  private validateText2() {
    if (this.#text2.length === 0) {
      this.#errors.text2 = 'Required';
      return;
    }

    delete this.#errors.text2;
  }

  private validateTextArea() {
    if (this.#textArea.length === 0) {
      this.#errors.textArea = 'Required';
      return;
    }

    delete this.#errors.textArea;
  }

  private validateRadioList() {
    if (this.#radioList.length === 0) {
      this.#errors.radioList = 'Required';
      return;
    }

    delete this.#errors.radioList;
  }

  private validateSelect() {
    if (this.#select.length === 0) {
      this.#errors.select = 'Required';
      return;
    }

    delete this.#errors.select;
  }

  private validateSwitch() {
    if (this.#switch === false) {
      this.#errors.switch = 'Required';
      return;
    }

    delete this.#errors.switch;
  }

  private validateInlineCheck() {
    if (!Object.values(this.#inlineCheck).find((v) => v === true)) {
      this.#errors.inlineCheck = 'Required';
      return;
    }

    delete this.#errors.inlineCheck;
  }

  private validateInlineRadio() {
    if (this.#inlineRadio === '') {
      this.#errors.inlineRadio = 'Required';
      return;
    }

    delete this.#errors.inlineRadio;
  }
}
