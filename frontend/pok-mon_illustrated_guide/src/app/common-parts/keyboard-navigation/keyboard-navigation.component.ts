import {Component, OnInit} from '@angular/core';
import {
  IgxDropDownComponent,
  IgxDropDownItemComponent,
  IgxIconComponent,
  IgxInputGroupComponent,
  IgxSuffixDirective
} from "igniteui-angular";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {debounceTime, map, Observable, of, startWith} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOptgroup,
  MatOption
} from "@angular/material/autocomplete";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {
  VirtualEmployeeApiService
} from "../../../infra/VirtualEmployeeApi/VirtualEmployeeApiService";
import {Employee, EmployeeDto, Feature} from "../../../util/WebDTO/prompt/EmployeeDto";


@Component({
  selector: 'app-keyboard-navigation',
  standalone: true,
  imports: [
    IgxInputGroupComponent,
    IgxSuffixDirective,
    IgxIconComponent,
    IgxDropDownComponent,
    IgxDropDownItemComponent,
    NgForOf,
    MatFormField,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatLabel,
    AsyncPipe,
    NgClass,
    MatInput,
    MatOptgroup,
    NgIf
  ],
  templateUrl: './keyboard-navigation.component.html',
  styleUrl: './keyboard-navigation.component.css'
})
export class KeyboardNavigationComponent implements OnInit {
  myControl = new FormControl<string | Employee>('');
  employees: EmployeeDto | undefined;
  filteredOptions: Observable<Employee[]> = of([]);

  constructor(private router: Router, private virtualEmployeeApiService: VirtualEmployeeApiService) {

  }

  async ngOnInit() {

    await this.find();

    if (this.employees && this.employees.employees) {
      let array: Array<Employee> = this.employees.employees.slice();
      this.filteredOptions = this.myControl.valueChanges.pipe(
        debounceTime(300), // ユーザーの入力を300ms待ってからフィルタリング
        startWith(''),
        map(feature => (typeof feature === 'string' ? feature : feature ? feature.name : '')),
        map(employeeName => employeeName ? this.filterOptions(employeeName) : array),
      );
    } else {
      //@Todo error
    }


  }

  async find(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.virtualEmployeeApiService.get('/feature/find/all', null).subscribe({
        next: (res) => {
          console.log(res);
          this.employees = new EmployeeDto(res);
          resolve();
        },
        error: (error) => {
          console.error('Error:', error.message);
          reject();
        }
      });
    });
  }

  filterOptions(val: string): Employee[] {
    const filterValue = val.toLowerCase();

    // 入力された各文字が表示名に含まれているかどうかをチェックする新しいフィルタリングロジック
    const filteredList: any = undefined;
    if (this.employees && this.employees.employees) {
      this.employees?.employees.map(employee => ({
        ...employee,
        features: employee.features.filter(feature => {
          // 入力値の各文字がfeature.featureNameに含まれているかチェック
          return [...filterValue].every(char => feature.name.toLowerCase().includes(char));
        })
      }))
      .filter(employee => employee.features.length > 0); // 少なくとも1つのアイテムが条件にマッチするカテゴリのみを残す
    } else {
      return [];
    }

    if (filteredList.length === 0 && val !== '') {
      return [new Employee(-1, '該当するものがありません', '', '', [])];
    }

    return filteredList;
  }

  autoCompleteDisplayFn(feature?: Feature): string {
    return feature ? feature.name : '';
  }

  // 選択時のアクションを定義
  // onSelect(feature: Feature): void {
  //   this.router.navigate(['']).then(); // パスに基づいて遷移
  // }

  onCloseAutoCompleteOptions(): void {
    // if (typeof this.myControl.feature === 'string') {
    //   this.myControl.setValue('');
    // }
  }

  _allowSelection(id: number): { [className: string]: boolean } {
    return {
      'no-data-auto-complete': id === -1,
    };
  }
}


