import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { PaymentMethods } from './components/PaymentMethods';
import { ScenarioMenu, Subnav, TopNav } from './components/Shell';
import {
  Banner,
  Button,
  CheckIllustration,
  FloatInput,
  IconBank,
  IconChevron,
  IconCircleCheck,
  IconClose,
  IconCoin,
  IconDoc,
} from './components/ui';
import {
  defaultForm,
  isFuzzyScenario,
  maskAccount,
  type AccountStatus,
  type FormData,
  type ModalStep,
  type Scenario,
} from './types';

const SUCCESS_TOAST = 'Bank account successfully added.';
const MICRO_ERROR = "That amount doesn’t match. Check your bank account and try again.";
const MAX_OWNERSHIP_ATTEMPTS = 1;

function modalTitleForStep(step: ModalStep | null): string {
  switch (step) {
    case 'add-form':
      return 'Add bank account';
    case 'verifying':
      return 'Verifying bank account';
    case 'ownership-passed':
    case 'verify-method':
    case 'fail-review':
      return 'Verify account ownership';
    case 'upload-statement':
      return 'Upload bank statement';
    case 'micro-setup':
      return 'Verify with a micro-deposit';
    case 'micro-pending':
      return 'Micro-deposit sent';
    case 'micro-amount':
      return 'Enter deposit amount';
    case 'backup-fail':
      return "Can't add bank account";
    default:
      return 'Add bank account';
  }
}

function validateForm(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!form.bankAccountName.trim()) errors.bankAccountName = 'Enter a bank account name.';
  if (!/^\d{9}$/.test(form.routingNumber)) {
    errors.routingNumber = 'Enter a valid 9-digit routing number.';
  }
  if (!form.accountNumber.trim()) errors.accountNumber = 'Enter an account number.';
  if (form.accountNumber !== form.confirmAccountNumber) {
    errors.confirmAccountNumber = 'Account numbers do not match.';
  }
  if (!form.businessName.trim()) errors.businessName = 'Enter a legal business name.';
  return errors;
}

function freshScenarioState(scenario: Scenario) {
  return {
    scenario,
    modalOpen: false,
    step: null as ModalStep | null,
    resumeStep: null as ModalStep | null,
    form: defaultForm(),
    accountStatus: 'none' as AccountStatus,
    toast: null as string | null,
    fieldErrors: {} as Partial<Record<keyof FormData, string>>,
    microError: null as string | null,
    failAttempt: 0,
    statementComplete: false,
    microInitiated: false,
    microComplete: false,
  };
}

export default function App() {
  const [state, setState] = useState(() => freshScenarioState('pass'));

  const masked = useMemo(
    () => `${state.form.bankAccountName || 'Bank account'} ${maskAccount(state.form.accountNumber)}`,
    [state.form.accountNumber, state.form.bankAccountName],
  );

  const bothBackupComplete = state.statementComplete && state.microComplete;

  useEffect(() => {
    if (!state.toast) return;
    const id = window.setTimeout(() => {
      setState((prev) => ({ ...prev, toast: null }));
    }, 4500);
    return () => window.clearTimeout(id);
  }, [state.toast]);

  useEffect(() => {
    if (state.step !== 'verifying') return;
    const id = window.setTimeout(() => {
      setState((prev) => {
        if (prev.scenario === 'pass') {
          return {
            ...prev,
            modalOpen: false,
            step: null,
            resumeStep: null,
            accountStatus: 'verified',
            toast: SUCCESS_TOAST,
          };
        }

        // Both fuzzy scenarios: 2 attempts on warning/re-enter screen, then backup methods
        const nextAttempt = prev.failAttempt + 1;
        if (nextAttempt > MAX_OWNERSHIP_ATTEMPTS) {
          return {
            ...prev,
            failAttempt: nextAttempt,
            step: 'verify-method',
          };
        }
        return {
          ...prev,
          step: 'fail-review',
          failAttempt: nextAttempt,
        };
      });
    }, 1400);
    return () => window.clearTimeout(id);
  }, [state.step]);

  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setState((prev) => ({
      ...prev,
      form: { ...prev.form, [key]: value },
      fieldErrors: { ...prev.fieldErrors, [key]: undefined },
      microError: key === 'microAmount' ? null : prev.microError,
    }));
  };

  const selectScenario = (scenario: Scenario) => {
    setState(freshScenarioState(scenario));
  };

  const openAdd = () => {
    setState((prev) => ({
      ...prev,
      modalOpen: true,
      step: 'add-form',
      fieldErrors: {},
      microError: null,
    }));
  };

  const cancelOrClose = () => {
    setState((prev) => {
      if (prev.accountStatus === 'verified') {
        return {
          ...prev,
          modalOpen: false,
          step: null,
          fieldErrors: {},
          microError: null,
        };
      }
      return {
        ...prev,
        modalOpen: false,
        step: null,
        resumeStep: null,
        form: defaultForm(),
        accountStatus: 'none',
        fieldErrors: {},
        microError: null,
        failAttempt: 0,
        statementComplete: false,
        microInitiated: false,
        microComplete: false,
      };
    });
  };

  const saveProgress = (resumeStep: ModalStep, accountStatus: AccountStatus) => {
    setState((prev) => ({
      ...prev,
      modalOpen: false,
      step: null,
      resumeStep,
      accountStatus,
      toast: null,
    }));
  };

  const resume = () => {
    setState((prev) => ({
      ...prev,
      modalOpen: true,
      step: prev.resumeStep ?? 'add-form',
    }));
  };

  const submitAddForm = () => {
    const errors = validateForm(state.form);
    if (Object.keys(errors).length) {
      setState((prev) => ({ ...prev, fieldErrors: errors }));
      return;
    }
    setState((prev) => ({ ...prev, step: 'verifying', fieldErrors: {} }));
  };

  const finishBackupPath = () => {
    setState((prev) => {
      if (prev.scenario === 'fuzzy-success') {
        return {
          ...prev,
          modalOpen: false,
          step: null,
          resumeStep: null,
          accountStatus: 'verified',
          toast: SUCCESS_TOAST,
          microError: null,
        };
      }
      // fuzzy-fail — return to Payment methods (no bank added)
      return {
        ...prev,
        modalOpen: false,
        step: null,
        resumeStep: null,
        accountStatus: 'none',
        form: defaultForm(),
        failAttempt: 0,
        statementComplete: false,
        microInitiated: false,
        microComplete: false,
        toast: null,
        microError: null,
      };
    });
  };

  const saveVerifyMethod = () => {
    if (bothBackupComplete && isFuzzyScenario(state.scenario)) {
      finishBackupPath();
      return;
    }
    saveProgress('verify-method', state.accountStatus === 'pending' ? 'pending' : 'incomplete');
  };

  const completeStatement = () => {
    setState((prev) => {
      const bothDone = prev.microComplete;
      if (bothDone && prev.scenario === 'fuzzy-success') {
        return {
          ...prev,
          statementComplete: true,
          modalOpen: false,
          step: null,
          resumeStep: null,
          accountStatus: 'verified',
          toast: SUCCESS_TOAST,
          microError: null,
        };
      }
      return {
        ...prev,
        statementComplete: true,
        step: 'verify-method',
        accountStatus: 'incomplete',
      };
    });
  };

  const verifyMicroAmount = () => {
    const normalized = state.form.microAmount.replace(/[^0-9.]/g, '');
    const value = Number.parseFloat(normalized);
    if (Number.isFinite(value) && value > 0 && value < 0.1) {
      setState((prev) => {
        const bothDone = prev.statementComplete;
        if (bothDone && prev.scenario === 'fuzzy-success') {
          return {
            ...prev,
            microComplete: true,
            microError: null,
            modalOpen: false,
            step: null,
            resumeStep: null,
            accountStatus: 'verified',
            toast: SUCCESS_TOAST,
          };
        }
        return {
          ...prev,
          microComplete: true,
          microError: null,
          step: 'verify-method',
          accountStatus: 'incomplete',
        };
      });
      return;
    }
    setState((prev) => ({ ...prev, microError: MICRO_ERROR }));
  };

  const goToVerifyMethod = () => {
    setState((prev) => ({ ...prev, step: 'verify-method' }));
  };

  const showSave =
    state.modalOpen &&
    state.step !== null &&
    state.step !== 'verifying' &&
    state.step !== 'ownership-passed' &&
    state.step !== 'backup-fail';

  return (
    <div className="app-shell">
      <TopNav />
      <Subnav />
      <ScenarioMenu
        active={state.scenario}
        onSelect={selectScenario}
        onReset={() => setState(freshScenarioState('pass'))}
      />

      <main className="main-content">
        <PaymentMethods
          accountStatus={state.accountStatus}
          form={state.form}
          resumeStep={state.resumeStep}
          onAdd={openAdd}
          onResume={resume}
          onDelete={() => setState(freshScenarioState(state.scenario))}
          onSetDefault={() =>
            setState((prev) => ({
              ...prev,
              form: { ...prev.form, makeDefault: true },
            }))
          }
        />
      </main>

      {state.modalOpen && state.step && (
        <div className="overlay" role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal__heading">
              <div className="modal__title">
                <IconBank />
                <h2 id="modal-title">{modalTitleForStep(state.step)}</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close"
                onClick={cancelOrClose}
              >
                <IconClose />
              </button>
            </div>

            {state.step === 'add-form' && (
              <>
                <p className="modal__intro">
                  Account and routing numbers can be found at the bottom of your business&apos;s
                  checks.
                </p>
                <CheckIllustration />
                <FloatInput
                  label="Bank account name"
                  value={state.form.bankAccountName}
                  onChange={(v) => updateForm('bankAccountName', v)}
                  helper="Max 50 characters"
                  maxLength={50}
                  error={state.fieldErrors.bankAccountName}
                />
                <FloatInput
                  label="Routing number"
                  value={state.form.routingNumber}
                  onChange={(v) => updateForm('routingNumber', v.replace(/\D/g, '').slice(0, 9))}
                  helper="Max 9 digits"
                  maxLength={9}
                  inputMode="numeric"
                  error={state.fieldErrors.routingNumber}
                />
                <FloatInput
                  label="Account number"
                  value={state.form.accountNumber}
                  onChange={(v) => updateForm('accountNumber', v.replace(/\D/g, '').slice(0, 17))}
                  helper="Max 17 digits"
                  maxLength={17}
                  inputMode="numeric"
                  error={state.fieldErrors.accountNumber}
                />
                <FloatInput
                  label="Confirm account number"
                  value={state.form.confirmAccountNumber}
                  onChange={(v) =>
                    updateForm('confirmAccountNumber', v.replace(/\D/g, '').slice(0, 17))
                  }
                  helper="Max 17 digits"
                  maxLength={17}
                  inputMode="numeric"
                  error={state.fieldErrors.confirmAccountNumber}
                />
                <FloatInput
                  label="Legal business name"
                  value={state.form.businessName}
                  onChange={(v) => updateForm('businessName', v)}
                  helper="Max 100 characters"
                  maxLength={100}
                  error={state.fieldErrors.businessName}
                />
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={state.form.makeDefault}
                    onChange={(e) => updateForm('makeDefault', e.target.checked)}
                  />
                  <span>Make this my default payment method</span>
                </label>
                <div className="modal__actions">
                  {showSave && (
                    <Button
                      variant="text"
                      onClick={() => saveProgress('add-form', 'incomplete')}
                    >
                      Save
                    </Button>
                  )}
                  <Button variant="text" onClick={cancelOrClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={submitAddForm}>
                    Add account
                  </Button>
                </div>
              </>
            )}

            {state.step === 'verifying' && (
              <>
                <p className="modal__intro">
                  Account and routing numbers can be found at the bottom of your business&apos;s
                  checks.
                </p>
                <CheckIllustration />
                <div className="verifying">
                  <div className="spinner" aria-hidden="true" />
                  <p>Verifying the bank account…</p>
                </div>
                <div className="modal__actions">
                  <Button variant="text" onClick={cancelOrClose}>
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {state.step === 'fail-review' && (
              <>
                <p className="modal__intro">
                  Account and routing numbers can be found at the bottom of your business&apos;s
                  checks.
                </p>
                <Banner
                  summary="We couldn't verify this bank account"
                  detail="Check that the account details match your business records, then try again."
                />
                <CheckIllustration />
                <FloatInput
                  label="Bank account name"
                  value={state.form.bankAccountName}
                  onChange={(v) => updateForm('bankAccountName', v)}
                  helper="Max 50 characters"
                  maxLength={50}
                />
                <FloatInput
                  label="Routing number"
                  value={state.form.routingNumber}
                  onChange={(v) => updateForm('routingNumber', v.replace(/\D/g, '').slice(0, 9))}
                  helper="Max 9 digits"
                  maxLength={9}
                  inputMode="numeric"
                />
                <FloatInput
                  label="Account number"
                  value={state.form.accountNumber}
                  onChange={(v) => updateForm('accountNumber', v.replace(/\D/g, '').slice(0, 17))}
                  helper="Max 17 digits"
                  maxLength={17}
                  inputMode="numeric"
                />
                <FloatInput
                  label="Confirm account number"
                  value={state.form.confirmAccountNumber}
                  onChange={(v) =>
                    updateForm('confirmAccountNumber', v.replace(/\D/g, '').slice(0, 17))
                  }
                  helper="Max 17 digits"
                  maxLength={17}
                  inputMode="numeric"
                />
                <FloatInput
                  label="Legal business name"
                  value={state.form.businessName}
                  onChange={(v) => updateForm('businessName', v)}
                  helper="Max 100 characters"
                  maxLength={100}
                />
                <div className="modal__actions">
                  <Button
                    variant="text"
                    onClick={() => saveProgress('fail-review', 'incomplete')}
                  >
                    Save
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setState((prev) => ({ ...prev, step: 'verifying' }))}
                  >
                    Try again
                  </Button>
                </div>
              </>
            )}

            {state.step === 'verify-method' && (
              <>
                <p className="modal__intro">
                  Account and routing numbers can be found at the bottom of your business&apos;s
                  checks.
                </p>
                <Banner
                  summary="We couldn't instantly verify this bank account"
                  detail="We couldn't instantly verify this bank account. Choose another way to verify it."
                />
                <div className="option-list">
                  <button
                    type="button"
                    className={`option-row${state.statementComplete ? ' is-complete' : ''}`}
                    onClick={() =>
                      setState((prev) => ({ ...prev, step: 'upload-statement' }))
                    }
                  >
                    <IconDoc />
                    <span className="option-row__label">Upload a bank statement</span>
                    {state.statementComplete ? (
                      <span className="option-row__status" aria-label="Complete">
                        <IconCircleCheck size={20} />
                      </span>
                    ) : (
                      <span className="option-row__chevron">
                        <IconChevron />
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className={`option-row${state.microComplete ? ' is-complete' : ''}`}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        step:
                          prev.microComplete || prev.microInitiated
                            ? 'micro-amount'
                            : 'micro-setup',
                      }))
                    }
                  >
                    <IconCoin />
                    <span className="option-row__label">Verify with a micro-deposit</span>
                    {state.microComplete ? (
                      <span className="option-row__status" aria-label="Complete">
                        <IconCircleCheck size={20} />
                      </span>
                    ) : (
                      <span className="option-row__chevron">
                        <IconChevron />
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="option-row"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        step: 'add-form',
                        form: defaultForm(),
                        fieldErrors: {},
                        failAttempt: 0,
                        statementComplete: false,
                        microInitiated: false,
                        microComplete: false,
                      }))
                    }
                  >
                    <IconBank size={16} />
                    <span className="option-row__label">Use another bank account</span>
                    <span className="option-row__chevron">
                      <IconChevron />
                    </span>
                  </button>
                </div>
                <div className="masked-account">{masked}</div>
                <div className="modal__actions">
                  <Button
                    variant={bothBackupComplete ? 'primary' : 'text'}
                    onClick={saveVerifyMethod}
                  >
                    Save
                  </Button>
                  <Button variant="text" onClick={cancelOrClose}>
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {state.step === 'upload-statement' && (
              <>
                <p className="modal__intro">
                  Upload a recent bank statement that clearly shows your account details. The
                  statement must be complete and readable.
                </p>
                <div className="upload-drop">
                  <strong>Upload bank statement</strong>
                  <p>Your statement must clearly show:</p>
                  <ul>
                    <li>Financial institution</li>
                    <li>Account owner or legal business name</li>
                    <li>Account information</li>
                    <li>Statement date</li>
                  </ul>
                  <label className="btn btn-primary">
                    Choose file
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) updateForm('statementFileName', file.name);
                      }}
                    />
                  </label>
                  {state.form.statementFileName && (
                    <div className="upload-filename">{state.form.statementFileName}</div>
                  )}
                </div>
                <div className="masked-account">{masked}</div>
                <div className="modal__actions modal__actions--split">
                  <Button variant="text" onClick={goToVerifyMethod}>
                    Back
                  </Button>
                  <div className="modal__actions">
                    <Button
                      variant="text"
                      onClick={() => saveProgress('upload-statement', 'incomplete')}
                    >
                      Save
                    </Button>
                    <Button variant="primary" onClick={completeStatement}>
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            )}

            {state.step === 'micro-setup' && (
              <>
                <p className="modal__intro">
                  We&apos;ll send a small deposit to your bank account so you can verify ownership.
                </p>
                <div className="masked-account">{masked}</div>
                <div className="modal__actions">
                  <Button
                    variant="primary"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        step: 'micro-pending',
                        microInitiated: true,
                      }))
                    }
                  >
                    Send
                  </Button>
                </div>
              </>
            )}

            {state.step === 'micro-pending' && (
              <>
                <Banner
                  severity="neutral"
                  summary="Micro-deposit sent"
                  detail="It usually takes a couple of days for the deposit to appear in your bank account. Come back here to enter the amount once you see it."
                />
                <div className="masked-account">{masked}</div>
                <div className="modal__actions">
                  <Button
                    variant="primary"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        modalOpen: false,
                        step: null,
                        resumeStep: 'verify-method',
                        accountStatus: 'pending',
                        microInitiated: true,
                        toast: null,
                      }))
                    }
                  >
                    Close
                  </Button>
                </div>
              </>
            )}

            {state.step === 'micro-amount' && (
              <>
                <p className="modal__intro">
                  Enter the deposit amount that appears in your bank account.
                </p>
                <div className="masked-account">{masked}</div>
                <FloatInput
                  label="Deposit amount"
                  value={state.form.microAmount}
                  onChange={(v) => updateForm('microAmount', v)}
                  helper="For testing, enter any amount under $0.10"
                  inputMode="decimal"
                  error={state.microError || undefined}
                />
                <div className="modal__actions modal__actions--split">
                  <Button variant="text" onClick={goToVerifyMethod}>
                    Back
                  </Button>
                  <div className="modal__actions">
                    <Button
                      variant="text"
                      onClick={() => saveProgress('micro-amount', 'pending')}
                    >
                      Save
                    </Button>
                    <Button variant="primary" onClick={verifyMicroAmount}>
                      Verify
                    </Button>
                  </div>
                </div>
              </>
            )}

            {state.step === 'backup-fail' && (
              <>
                <Banner
                  severity="critical"
                  summary="We can't add this bank account"
                  detail="We weren't able to verify ownership of this account. You can close this window and try a different bank account."
                />
                <div className="masked-account">{masked}</div>
                <div className="modal__actions">
                  <Button
                    variant="primary"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        modalOpen: false,
                        step: null,
                        resumeStep: null,
                        accountStatus: 'none',
                        toast: null,
                        form: defaultForm(),
                        failAttempt: 0,
                        statementComplete: false,
                        microInitiated: false,
                        microComplete: false,
                      }))
                    }
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {state.toast && (
        <div className="toast" role="status">
          <div className="toast__body">
            <span className="toast__icon" aria-hidden="true">
              <IconCircleCheck />
            </span>
            <p className="toast__message">{state.toast}</p>
          </div>
          <button
            type="button"
            className="toast__close"
            aria-label="Dismiss"
            onClick={() => setState((prev) => ({ ...prev, toast: null }))}
          >
            <IconClose />
          </button>
        </div>
      )}
    </div>
  );
}
