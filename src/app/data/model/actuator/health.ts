export class Health {
  status: string;
  components: Components;
}

class Components {
  db: Db;
  diskSpace: DiskSpace;
  mail: Mail;
}

class Mail {
  status: string;
  details: MailDescription;
}

class MailDescription {
  location: string;
}

class DiskSpace {
  status: string;
  details: DiskSpaceDetails;
}

class DiskSpaceDetails {
  total: number;
  free: number;
  threshold: number;
}

class Db {
  status: string;
  components: DbComponents;
}

class DbComponents {
  accountModuleDataSource: AccountModuleDataSource;
  calendarModuleDataSource: CalendarModuleDataSource;
  financesModuleDataSource: FinancesModuleDataSource;
  groupsModuleDataSource: GroupsModuleDataSource;
  mealModuleDataSource: MealModuleDataSource;
  paymentDataSource: PaymentDataSource;
  receivablesModuleDataSource: ReceivablesModuleDataSource;
  schedulerDataSource: SchedulerDataSource;
}

class AccountModuleDataSource {
  moduleName = 'accountModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class CalendarModuleDataSource {
  moduleName = 'calendarModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class FinancesModuleDataSource {
  moduleName = 'financesModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class GroupsModuleDataSource {
  moduleName = 'groupsModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class MealModuleDataSource {
  moduleName = 'mealModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class PaymentDataSource {
  moduleName = 'paymentDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class ReceivablesModuleDataSource {
  moduleName = 'receivablesModuleDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}

class SchedulerDataSource {
  moduleName = 'schedulerDataSource';
  status: string;
  details: {
    database: string;
    result: string;
    validationQuery;
  };
}
