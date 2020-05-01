import {Component, OnInit, ViewChild} from '@angular/core';
import {Child} from '../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Absence} from '../../../../../../data/model/absence/absence';
import {AbsenceService} from '../../../../../../data/service/absence/absence.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss']
})
export class AddAbsenceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSourceChild: MatTableDataSource<Child> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'selected'];

  private children: Observable<Array<Child>>;

  absenceToAdd: Absence;
  selectedChildId: string;
  reason: string;
  dateFrom: Date = null;
  dateTo: Date = null;

  constructor(private childService: ChildService, private absenceService: AbsenceService) {
    this.children = this.childService.getAllChildren();
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.dataSourceChild.data = children;
      this.dataSourceChild.sort = this.sort;
      this.dataSourceChild.paginator = this.paginator;
      this.dataSourceChild.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  filterChildren($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSourceChild.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(submittedForm) {
    this.dateFrom = submittedForm.value.dateFrom;
    this.dateTo = submittedForm.value.dateTo;
    this.reason = submittedForm.value.reason;

    if (this.dateTo == null && this.dateFrom != null) {
      this.absenceToAdd = new Absence();
      this.absenceToAdd.date = this.dateFrom;
      this.absenceToAdd.childId = this.selectedChildId;
      this.absenceToAdd.reason = this.reason;
      this.absenceService.createAbsence(this.absenceToAdd).subscribe(resp => {
        console.log(resp);
      });
    }
    // TODO: implement adding absence range
    submittedForm.reset();
  }

  getChildIdOnClick(childId: string): void {
    this.selectedChildId = childId;
  }

}