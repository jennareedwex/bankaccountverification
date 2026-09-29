import { useEffect, useRef, useState } from 'react';
import { Button, IconBank, IconMail, IconPhone, IconStar, IconTrash } from './ui';
import { maskAccount, type AccountStatus, type FormData, type ModalStep } from '../types';

type Props = {
  accountStatus: AccountStatus;
  form: FormData;
  resumeStep: ModalStep | null;
  onAdd: () => void;
  onResume: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
};

function statusLabel(status: AccountStatus): string {
  switch (status) {
    case 'incomplete':
      return 'Verification incomplete';
    case 'pending':
      return 'Pending verification';
    case 'under_review':
      return 'Under review';
    default:
      return '';
  }
}

function displayName(form: FormData): string {
  const name = form.bankAccountName.trim() || 'Bank account';
  const digits = form.accountNumber.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return last4 ? `${name} ....${last4}` : name;
}

export function PaymentMethods({
  accountStatus,
  form,
  resumeStep,
  onAdd,
  onResume,
  onDelete,
  onSetDefault,
}: Props) {
  const bankAdded = accountStatus === 'verified';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasProgress =
    !bankAdded &&
    resumeStep !== null &&
    (accountStatus === 'incomplete' ||
      accountStatus === 'pending' ||
      accountStatus === 'under_review');

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!bankAdded) setMenuOpen(false);
  }, [bankAdded]);

  return (
    <div className="pm-page">
      <header className="pm-page__header">
        <h1>Payment methods</h1>
      </header>

      <section className="pm-card pm-card--banks">
        <div className="pm-card__head">
          <div className="pm-card__title">
            <span className="pm-icon-circle" aria-hidden="true">
              <IconBank size={20} />
            </span>
            <h2>Bank accounts</h2>
          </div>
          <Button variant="primary" onClick={onAdd}>
            Add bank account
          </Button>
        </div>

        {bankAdded ? (
          <div className="pm-account-list" data-screen="banks-added">
            <div className="pm-account-row">
              <div className="pm-account-row__main">
                <span className="pm-account-avatar" aria-hidden="true">
                  <IconBank size={16} />
                </span>
                <span className="pm-account-row__name">{displayName(form)}</span>
              </div>
              <div className="pm-account-row__meta" ref={menuRef}>
                {form.makeDefault && (
                  <span className="pm-tag-default">
                    <span aria-hidden="true">★</span> Default
                  </span>
                )}
                <button
                  type="button"
                  className="pm-more"
                  aria-label="Account actions"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  ⋯
                </button>
                {menuOpen && (
                  <div className="pm-menu" role="menu">
                    <button
                      type="button"
                      className="pm-menu__item"
                      role="menuitem"
                      disabled={form.makeDefault}
                      onClick={() => {
                        onSetDefault();
                        setMenuOpen(false);
                      }}
                    >
                      <IconStar />
                      <span>Set as default</span>
                    </button>
                    <button
                      type="button"
                      className="pm-menu__item"
                      role="menuitem"
                      onClick={() => {
                        onDelete();
                        setMenuOpen(false);
                      }}
                    >
                      <IconTrash />
                      <span>Delete bank account</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="pm-empty" data-screen="no-bank-added">
            <div className="pm-empty__icon" aria-hidden="true">
              <IconBank size={16} />
            </div>
            <h3>No bank accounts added</h3>
            <p>Add a bank account to make payments.</p>

            {hasProgress && (
              <div className="pm-progress" role="status">
                <div className="pm-progress__text">
                  <span className={`status-pill ${accountStatus}`}>
                    {statusLabel(accountStatus)}
                  </span>
                  {(accountStatus === 'pending' || accountStatus === 'under_review') && (
                    <span className="pm-progress__masked">{maskAccount(form.accountNumber)}</span>
                  )}
                </div>
                {(accountStatus === 'incomplete' || accountStatus === 'pending') &&
                  resumeStep && (
                    <button type="button" className="link-btn" onClick={onResume}>
                      Resume verification
                    </button>
                  )}
              </div>
            )}
          </div>
        )}
      </section>

      <div className="pm-secondary">
        <section className="pm-card">
          <div className="pm-card__head">
            <div className="pm-card__title">
              <span className="pm-icon-circle" aria-hidden="true">
                <IconPhone size={20} />
              </span>
              <h2>Phone</h2>
            </div>
            <span className="pm-tag-info">Account #0496-00-268493-4</span>
          </div>
          <div className="pm-phone-row">
            <strong>Pay by phone</strong>
            <strong className="pm-phone-number">866-544-5796</strong>
          </div>
          <div className="pm-meta-block">
            <div>
              <span>Processing time</span>
              <strong>Same day if before 3:30 PM ET</strong>
            </div>
            <div>
              <span>Payment deadline</span>
              <strong>3:30 PM ET (on business days)</strong>
            </div>
          </div>
          <div className="pm-howto">
            <strong>How to pay by phone</strong>
            <ol>
              <li>Have your fleet account number, bank account number, and routing number ready.</li>
              <li>Call customer service.</li>
              <li>Follow the prompts to make a payment.</li>
            </ol>
          </div>
        </section>

        <section className="pm-card">
          <div className="pm-card__head">
            <div className="pm-card__title">
              <span className="pm-icon-circle" aria-hidden="true">
                <IconMail size={20} />
              </span>
              <h2>Mail</h2>
            </div>
          </div>
          <div className="pm-meta-block">
            <div>
              <span className="pm-label-strong">Send payments to</span>
              <strong>
                WEX BANK
                <br />
                P.O. BOX 6293
                <br />
                CAROL STREAM, IL 60197-6293
              </strong>
            </div>
            <div>
              <span>Processing time</span>
              <strong>1-2 business days after payment arrives</strong>
            </div>
            <div>
              <span>Mail by date</span>
              <strong>10 business days before due date</strong>
            </div>
          </div>
          <div className="pm-howto">
            <strong>How to pay by mail</strong>
            <ol>
              <li>Detach the payment stub from the bottom of your statement.</li>
              <li>Write your fleet account number or statement number on your check.</li>
              <li>Mail the payment stub and your check to the WEX Bank address printed on your statement.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
