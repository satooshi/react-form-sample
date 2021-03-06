import { ViewModel } from 'Framework/ViewModels/Interfaces';
import { isBlank } from 'Framework/ViewModels/Validator';

export interface Errors {
  checkList?: string;
  inlineCheck?: string;
  inlineRadio?: string;
  password?: string;
  radioList?: string;
  select?: string;
  switch?: string;
  text1?: string;
  text2?: string;
  textArea?: string;
}

export type RadioValue = '' | 'R1' | 'R2' | 'R3';
export type SelectValue = '' | 'S1' | 'S2' | 'S3';
export type MultiSelectValue = { [key in SelectValue]: boolean };

export type CheckValue = 'C1' | 'C2' | 'C3' | 'C4';
export type CheckOptions = { [key in CheckValue]: boolean };

export interface Props {
  checkList: CheckOptions;
  errors?: Errors;
  inlineCheck: CheckOptions;
  inlineRadio: RadioValue;
  password: string;
  radioList: RadioValue;
  select: SelectValue;
  switch: boolean;
  text1: string;
  text2: string;
  textArea: string;
}

export class FormViewModel implements ViewModel {
  #errors: Errors;

  #text1: string;

  #text2: string;

  #password: string;

  #textArea: string;

  #checkList: CheckOptions;

  #radioList: RadioValue;

  #select: SelectValue;

  #switch: boolean;

  #inlineRadio: RadioValue;

  #inlineCheck: CheckOptions;

  constructor(props: Props) {
    this.#errors = props.errors || {};
    this.#text1 = props.text1;
    this.#text2 = props.text2;
    this.#password = props.password;
    this.#textArea = props.textArea;
    this.#checkList = props.checkList;
    this.#radioList = props.radioList;
    this.#select = props.select;
    this.#switch = props.switch;
    this.#inlineRadio = props.inlineRadio;
    this.#inlineCheck = { ...props.inlineCheck };
  }

  // Interfaces used by react bridge

  /**
   * @implements {ViewModel}
   * @inheritdoc
   */
  get serialized() {
    return {
      checkList: this.#checkList,
      errors: this.errors,
      inlineCheck: { ...this.#inlineCheck },
      inlineRadio: this.#inlineRadio,
      password: this.#password,
      radioList: this.#radioList,
      select: this.#select,
      switch: this.#switch,
      text1: this.#text1,
      text2: this.#text2,
      textArea: this.#textArea,
    };
  }

  // Interfaces used by UI components

  get text1() {
    return this.#text1;
  }

  set text1(value: string) {
    this.#text1 = value;
    this.validateText1();
  }

  get text2() {
    return this.#text2;
  }

  set text2(value: string) {
    this.#text2 = value;
    this.validateText2();
  }

  get password() {
    return this.#password;
  }

  set password(value: string) {
    this.#password = value;
    this.validatePassword();
  }

  get textArea() {
    return this.#textArea;
  }

  set textArea(value: string) {
    this.#textArea = value;
    this.validateTextArea();
  }

  get checkList() {
    return this.#checkList;
  }

  set checkList(value: CheckOptions) {
    this.#checkList = { ...value };
    this.validateCheckList();
  }

  replaceCheckList(value: CheckOptions) {
    this.#checkList = { ...this.#checkList, ...value };
    this.validateCheckList();
  }

  get radioList() {
    return this.#radioList;
  }

  set radioList(value: RadioValue) {
    this.#radioList = value;
    this.validateRadioList();
  }

  get select() {
    return this.#select;
  }

  set select(value: SelectValue) {
    this.#select = value;
    this.validateSelect();
  }

  get switch() {
    return this.#switch;
  }

  set switch(value: boolean) {
    this.#switch = value;
    this.validateSwitch();
  }

  get inlineRadio() {
    return this.#inlineRadio;
  }

  set inlineRadio(value: RadioValue) {
    this.#inlineRadio = value;
    this.validateInlineRadio();
  }

  get inlineCheck() {
    return this.#inlineCheck;
  }

  set inlineCheck(value: CheckOptions) {
    this.#inlineCheck = { ...value };
    this.validateInlineCheck();
  }

  replaceInlineCheck(value: CheckOptions) {
    this.#inlineCheck = { ...this.#inlineCheck, ...value };
    this.validateInlineCheck();
  }

  // ViewModel Validation

  /**
   * @implements {ViewModel}
   * @inheritdoc
   */
  get errors() {
    return { ...this.#errors };
  }

  /**
   * @implements {ViewModel}
   * @inheritdoc
   */
  get isValid() {
    this.validate();

    return Object.keys(this.#errors).length === 0;
  }

  private validate() {
    this.#errors = {};

    this.validateText1();
    this.validateText2();
    this.validatePassword();
    this.validateTextArea();
    this.validateCheckList();
    this.validateRadioList();
    this.validateSelect();
    this.validateSwitch();
    this.validateInlineCheck();
    this.validateInlineRadio();

    return this.errors;
  }

  private validateText1() {
    if (isBlank(this.#text1)) {
      this.#errors.text1 = 'Required';
      return;
    }

    delete this.#errors.text1;
  }

  private validateText2() {
    if (isBlank(this.#text2)) {
      this.#errors.text2 = 'Required';
      return;
    }

    delete this.#errors.text2;
  }

  private validatePassword() {
    if (isBlank(this.#password)) {
      this.#errors.password = 'Required';
      return;
    }

    delete this.#errors.password;
  }

  private validateTextArea() {
    if (isBlank(this.#textArea)) {
      this.#errors.textArea = 'Required';
      return;
    }

    delete this.#errors.textArea;
  }

  private validateCheckList() {
    if (isBlank(this.#checkList)) {
      this.#errors.checkList = 'Required';
      return;
    }

    delete this.#errors.checkList;
  }

  private validateRadioList() {
    if (isBlank(this.#radioList)) {
      this.#errors.radioList = 'Required';
      return;
    }

    delete this.#errors.radioList;
  }

  private validateSelect() {
    if (isBlank(this.#select)) {
      this.#errors.select = 'Required';
      return;
    }

    delete this.#errors.select;
  }

  private validateSwitch() {
    if (isBlank(this.#switch)) {
      this.#errors.switch = 'Required';
      return;
    }

    delete this.#errors.switch;
  }

  private validateInlineCheck() {
    if (isBlank(this.#inlineCheck)) {
      this.#errors.inlineCheck = 'Required';
      return;
    }

    delete this.#errors.inlineCheck;
  }

  private validateInlineRadio() {
    if (isBlank(this.#inlineRadio)) {
      this.#errors.inlineRadio = 'Required';
      return;
    }

    delete this.#errors.inlineRadio;
  }
}
