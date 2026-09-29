export type Scenario = 'pass' | 'fuzzy-fail' | 'fuzzy-success';

export type ModalStep =
  | 'add-form'
  | 'verifying'
  | 'ownership-passed'
  | 'verify-method'
  | 'upload-statement'
  | 'micro-setup'
  | 'micro-pending'
  | 'micro-amount'
  | 'fail-review'
  | 'backup-fail';

export type AccountStatus =
  | 'none'
  | 'incomplete'
  | 'pending'
  | 'under_review'
  | 'verified';

export interface FormData {
  bankAccountName: string;
  routingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  businessName: string;
  makeDefault: boolean;
  statementFileName: string;
  microAmount: string;
}

export interface PrototypeState {
  scenario: Scenario;
  modalOpen: boolean;
  step: ModalStep | null;
  resumeStep: ModalStep | null;
  form: FormData;
  accountStatus: AccountStatus;
  toast: string | null;
  fieldErrors: Partial<Record<keyof FormData, string>>;
  microError: string | null;
  failAttempt: number;
  statementComplete: boolean;
  microInitiated: boolean;
  microComplete: boolean;
}

export const defaultForm = (): FormData => ({
  bankAccountName: '',
  routingNumber: '',
  accountNumber: '',
  confirmAccountNumber: '',
  businessName: '',
  makeDefault: true,
  statementFileName: '',
  microAmount: '',
});

export function maskAccount(accountNumber: string): string {
  const digits = accountNumber.replace(/\D/g, '');
  if (!digits) return '••••';
  const last4 = digits.slice(-4);
  return `••••${last4}`;
}

export function isFuzzyScenario(scenario: Scenario): boolean {
  return scenario === 'fuzzy-fail' || scenario === 'fuzzy-success';
}
