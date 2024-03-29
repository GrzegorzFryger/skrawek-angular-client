import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Group} from '../../../../../data/model/groups/group';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {YesNoDialogData} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {Child} from '../../../../../data/model/accounts/child';
import {AddChildToGroupComponent} from '../add-child-to-group/add-child-to-group.component';
import {AddGroupComponent} from '../add-group/add-group.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public groupListColumnsToDisplay: string[] = ['groupName', 'groupDescription', 'actions'];
  public childListColumnsToDisplay: string[] = ['name', 'surname', 'actions'];

  openedGroupDetailsTable = false;
  groupDetails: Group = new Group();
  selectedGroupId: string;
  dialogData: string;
  form: FormGroup;

  public groupListDataSource: MatTableDataSource<Group> = new MatTableDataSource();
  public groupDetailsDataSource: MatTableDataSource<Child> = new MatTableDataSource();

  constructor(private groupService: GroupService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeTables();
  }

  addGroup() {
    this.openAddGroupDialog();
  }

  private openAddGroupDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent);

    const sub = dialogRef.componentInstance.formResponse.subscribe(group => {
      this.dialog.closeAll();
      this.groupService.createGroup(group).subscribe(
        () => {
          this.snackMessageHandlingService.success('Pomyślnie utworzono grupę');
        },
        error => {
          this.snackMessageHandlingService.error('Nie udało się utworzyć grupy');
        }
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initializeTables();
      sub.unsubscribe();
    });
  }

  deleteGroup(groupId: string): void {
    this.openGroupRemovalDialog('Czy na pewno usunąć tą grupę?', groupId);
  }

  deleteChildFromGroup(childId: string): void {
    this.openChildRemovalDialog('Czy na pewno usunąć dziecko z grupy?', childId);
  }

  openGroupDetailsTable(groupId: string): void {
    this.selectedGroupId = groupId;
    this.groupService.getGroupById(groupId).subscribe(resp => {
      this.groupDetails = resp;
    });
    this.groupService.findAllChildrenInGroup(groupId).subscribe(resp => {
      this.groupDetailsDataSource.data = resp;
      this.groupDetailsDataSource.sort = this.sort.toArray()[1];
      this.groupDetailsDataSource.paginator = this.paginator.toArray()[1];
      this.groupDetailsDataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
    this.openedGroupDetailsTable = true;
  }

  closeGroupDetailsTable() {
    this.openedGroupDetailsTable = false;
  }

  addChildToGroup() {
    this.dialogData = this.selectedGroupId;
    this.openAddChildDialog(this.dialogData);
  }

  private openAddChildDialog(dataString: string): void {
    const dialogRef = this.dialog.open(AddChildToGroupComponent, {
      data: dataString
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.addChild(result);
        }
      }
    );
  }

  private addChild(childId: string) {
    this.groupService.addChildToGroup(this.selectedGroupId, childId).subscribe(
      resp => {
        this.openGroupDetailsTable(this.selectedGroupId);
        this.snackMessageHandlingService.success('Dziecko zostało dodane do grupy');
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z dodaniem dziecka');
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private removeChildFromGroup(confirmation: boolean, childId: string): void {
    if (confirmation) {
      this.groupService.removeChildFromGroup(this.groupDetails.id.toString(), childId).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Dziecko zostało usunięte z grupy');
          this.openGroupDetailsTable(this.groupDetails.id.toString());
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem dziecka');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private removeGroup(confirmation: boolean, groupId: string): void {
    if (confirmation) {
      this.groupService.deleteGroup(groupId).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Grupa została usunięta');
          this.initializeTables();
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem grupy');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private openGroupRemovalDialog(question: string, dayOffWorkId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.removeGroup(result.answer, dayOffWorkId);
      }
    );
  }

  private openChildRemovalDialog(question: string, childId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.removeChildFromGroup(result.answer, childId);
      }
    );
  }

  private initializeTables(): void {
    this.groupService.getAllGroups().subscribe(resp => {
      this.groupListDataSource.data = resp;
      this.groupListDataSource.sort = this.sort.toArray()[0];
      this.groupListDataSource.paginator = this.paginator.toArray()[0];
      this.groupListDataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

}
