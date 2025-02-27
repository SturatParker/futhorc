import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs';
import { ControlsOf } from '../common/types/ControlsOf.type';

type Model = {
  input: string;
  output: string;
};

@Component({
  selector: 'app-transliterate',
  imports: [ReactiveFormsModule],
  templateUrl: './transliterate.component.html',
  styleUrl: './transliterate.component.scss',
})
export class TransliterateComponent {
  protected form: FormGroup<ControlsOf<Model>>;
  private runemap: { [character: string]: string } = {
    ae: 'ᚫ',
    ea: 'ᛠ',
    io: 'ᛡ',
    ng: 'ᛝ',
    oe: 'ᛟ',
    st: 'ᛥ',
    th: 'ᚦ',
    a: 'ᚪ',
    b: 'ᛒ',
    c: 'ᚳ',
    d: 'ᛞ',
    e: 'ᛖ',
    f: 'ᚠ',
    g: 'ᚷ',
    h: 'ᚻ',
    i: 'ᛁ',
    ï: 'ᛇ',
    j: 'ᛡ',
    k: 'ᛣ',
    l: 'ᛚ',
    m: 'ᛗ',
    n: 'ᚾ',
    o: 'ᚩ',
    p: 'ᛈ',
    q: 'ᛢ',
    r: 'ᚱ',
    s: 'ᛋ',
    t: 'ᛏ',
    u: 'ᚢ',
    v: 'ᚢ',
    w: 'ᚹ',
    x: 'ᛉ',
    y: 'ᚣ',
    z: 'ᛋ',
    // g: "ᚸ",
    // "k": "ᛤ",
  };

  constructor(formBuilder: NonNullableFormBuilder) {
    this.form = formBuilder.group({
      input: formBuilder.control(''),
      output: formBuilder.control({ disabled: true, value: '' }),
    });

    this.form.controls.input.valueChanges
      .pipe(
        debounceTime(100),
        map((value) => this.f_cypher(value)),
        tap((value) => this.form.controls.output.setValue(value)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private f_cypher(input: string): string {
    let output = input.toLocaleLowerCase();

    for (const key of Object.keys(this.runemap)) {
      const regexp = new RegExp(`${key}`, 'g');
      output = output.replace(regexp, this.runemap[key]);
    }
    return output;
  }
}
