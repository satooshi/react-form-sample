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
// 2. ViewModel -> Repository: to transform UI layer to persistent layer
//   This is done by implementing `get requestData()`.
export default class FormViewModel {
  private _errors: Errors = {};

  private _text1: string;

  private _text2: string;

  private _textArea: string;

  private _radioList: string;

  private _select: SelectOption;

  private _switch: boolean;

  private _inlineRadio: InlineRadioOption;

  private _inlineCheck: InlineCheckOptions;

  constructor(props: Props) {
    this._text1 = props.text1;
    this._text2 = props.text2;
    this._textArea = props.textArea;
    this._radioList = props.radioList
    this._select = props.select;
    this._switch = props.switch;
    this._inlineRadio = props.inlineRadio;
    this._inlineCheck = props.inlineCheck;
  }

  // Interfaces used by UI components

  serialize() {
    return {
      text1: this._text1,
      text2: this._text2,
      textArea: this._textArea,
      radioList: this._radioList,
      select: this._select,
      switch: this._switch,
      inlineRadio: this._inlineRadio,
      inlineCheck: this._inlineCheck,
    }
  }

  get text1() { return this._text1 }

  set text1(value: string) { this._text1 = value }

  get text2() { return this._text2 }

  set text2(value: string) { this._text2 = value }

  get textArea() { return this._textArea }

  set textArea(value: string) { this._textArea = value }

  get radioList() { return this._radioList }

  set radioList(value: string) { this._radioList = value }

  get select() { return this._select }

  set select(value: SelectOption) { this._select = value }

  get switch() { return this._switch }

  set switch(value: boolean) { this._switch = value }

  get inlineRadio() { return this._inlineRadio }

  set inlineRadio(value: InlineRadioOption) { this._inlineRadio = value }

  get inlineCheck() { return this._inlineCheck }

  set inlineCheck(value: InlineCheckOptions) { this._inlineCheck = value }

  replaceInlineCheck(value: InlineCheckOptions) {
    this._inlineCheck = { ...this._inlineCheck, ...value }
  }

  // Interfaces used for persistent layer (send data to the backend API)
  // TODO: Who should use theses interfaces?

  /** Flush changes to the backend API */
  async flush() {
    console.log('Flush changes to the Backend API', {data: this.requestData});

    return Promise.resolve(() => ({message: 'Saved!'}));
  }

  get requestData() {
    return {
      text1: this._text1,
      text2: this._text2,
      textArea: this._textArea,
      radioList: this._radioList,
      select: this._select,
      switch: this._switch,
      inlineRadio: this._inlineRadio,
      inlineCheck: this._inlineCheck,
    };
  }

  // ViewModel Validation

  get errors() {
    return {...this._errors};
  }

  validate() {
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
    if (this._text1.length === 0) {
      this._errors.text1 = 'Required';
    }
  }

  private validateText2() {
    if (this._text2.length === 0) {
      this._errors.text2 = 'Required';
    }
  }

  private validateTextArea() {
    if (this._textArea.length === 0) {
      this._errors.textArea = 'Required';
    }
  }

  private validateRadioList() {
    if (this._radioList.length === 0) {
      this._errors.radioList = 'Required';
    }
  }

  private validateSelect() {
    if (this._select.length === 0) {
      this._errors.select = 'Required';
    }
  }

  private validateSwitch() {
    if (this._switch === false) {
      this._errors.switch = 'Required';
    }
  }

  private validateInlineCheck() {
    if (!Object.values(this._inlineCheck).find((v) => v === true)) {
      this._errors.inlineCheck = 'Required';
    }
  }

  private validateInlineRadio() {
    if (this._inlineRadio === '') {
      this._errors.inlineRadio = 'Required';
    }
  }
}
