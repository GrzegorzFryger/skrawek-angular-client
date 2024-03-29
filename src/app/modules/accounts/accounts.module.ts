import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountsRoutingModule} from './accounts-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AccountsComponent} from './accounts.component';
import {ChildListComponent} from './child-list/child-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {ActionMenuComponent} from './action-menu/action-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {GuardianListComponent} from './guardian-list/guardian-list.component';
import {ChildDetailsComponent} from './child-details/child-details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ChildFormComponent} from './child-details/child-form/child-form.component';
import {BoroughDetailsComponent} from './child-details/borough-details/borough-details.component';
import {GuardiansChildComponent} from './child-details/guardians-child/guardians-child.component';
import {ChildFullNameCardComponent} from './child-details/child-full-name-card/child-full-name-card.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';


@NgModule({
  declarations: [AccountsComponent, ChildListComponent, ActionMenuComponent, AccountDetailsComponent, GuardianListComponent,
    ChildDetailsComponent, ChildFormComponent, BoroughDetailsComponent, GuardiansChildComponent, ChildFullNameCardComponent, CreateAccountComponent, CustomStepperComponent],
  imports: [
    SharedModule,
    CommonModule,
    AccountsRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRippleModule,
    CdkStepperModule
  ]
})
export class AccountsModule {
}
