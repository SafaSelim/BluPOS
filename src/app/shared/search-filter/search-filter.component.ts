import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlValueAccessor } from './util/abstract-value-accessor';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '*' })),
      state('false', style({ width: '0' })),
      transition('true => false', animate('300ms ease-in')),
      transition('false => true', animate('300ms ease-out'))
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFilterComponent),
      multi: true
    }
  ]
})
export class SearchFilterComponent extends AbstractControlValueAccessor<string> implements OnInit {

  @ViewChild('input') inputElement: ElementRef;

  @Input() formControl: FormControl;
  @Input() placeholder = '';

  @Output() onBlur = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onEnter = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<string>();
  @Output() onOpen = new EventEmitter<void>();

  searchVisible = false;


  ngOnInit(): void {
  }

  public close(): void {
    this.searchVisible = false;
    this.value = '';
    this.updateChanges();
    this.onClose.emit();
  }

  public open(): void {
    this.searchVisible = true;
    this.inputElement.nativeElement.focus();
    this.onOpen.emit();
  }

  onBlurring(searchValue: string) {
    if (!searchValue) {
      this.searchVisible = false;
    }
    this.onBlur.emit(searchValue);
  }

  onEnterring(searchValue: string) {
    this.onEnter.emit(searchValue);
  }

  onFocussing(searchValue: string) {
    this.searchVisible = true;
    this.onFocus.emit(searchValue);
  }

}
