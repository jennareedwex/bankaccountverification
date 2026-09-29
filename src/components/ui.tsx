import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export function IconClose({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBank({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M3 18h18M12 4l9 5H3l9-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPhone({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 3.5h8A1.5 1.5 0 0 1 17.5 5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.5h3M12 17.5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMail({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 6.5h15v11h-15v-11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7.5L12 13l7.5-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconWarning({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2.5L14 13H2L8 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 6.5v3.2M8 11.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.5 6.2l2.4 2.4 4.6-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCircleCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5 8.1l2 2 4-4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2.2l1.5 3.1 3.4.5-2.45 2.4.6 3.4L8 10.1 4.95 11.6l.6-3.4L3.1 5.8l3.4-.5L8 2.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTrash({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 4.5h9M6 4.5V3.2h4v1.3M5.2 4.5l.5 8.3h4.6l.5-8.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevron({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6 3.5L10.5 8 6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Coin with dollar sign — used for micro-deposit verification. */
export function IconCoin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="5.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 4.6v6.8M9.6 6.1c0-.7-.7-1.2-1.6-1.2S6.4 5.4 6.4 6.1c0 .6.5 1 1.4 1.2l.4.1c1 .2 1.6.6 1.6 1.4 0 .8-.8 1.4-1.8 1.4s-1.8-.6-1.8-1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDoc({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.5 2.5h5L12 5v8.5H4.5V2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M9.5 2.5V5H12M6 8h4M6 10.5h4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconSearch({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBack({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTree({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 5h4v3H4V5zm8 0h4v3h-4V5zM8 12h4v3H8v-3zM6 8v2h8V8M10 10v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'text' | 'disabled';
  type?: 'button' | 'submit';
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={variant === 'disabled'}
    >
      {children}
    </button>
  );
}

type FloatInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  error?: string;
  maxLength?: number;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
};

export function FloatInput({
  label,
  value,
  onChange,
  helper,
  error,
  maxLength,
  inputMode,
}: FloatInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return (
    <label className={`float-input ${error ? 'is-error' : ''} ${value ? 'has-value' : ''}`}>
      <span className="float-input__field">
        <span className="float-input__label">{label}</span>
        <input
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
        />
      </span>
      <span className={`float-input__helper ${error ? 'is-error' : ''}`}>{error || helper}</span>
    </label>
  );
}

type BannerProps = {
  summary: string;
  detail: string;
  severity?: 'warn' | 'critical' | 'info' | 'neutral';
};

export function Banner({ summary, detail, severity = 'warn' }: BannerProps) {
  const icon =
    severity === 'neutral' || severity === 'info' ? (
      <IconCircleCheck size={16} />
    ) : (
      <IconWarning />
    );

  return (
    <div className={`banner banner-${severity}`}>
      <div className="banner__icon">{icon}</div>
      <div className="banner__text">
        <p className="banner__summary">{summary}</p>
        <p className="banner__detail">{detail}</p>
      </div>
    </div>
  );
}

export function CheckIllustration() {
  return (
    <div className="check-panel">
      <div className="check-graphic">
        <div className="check-border">
          <span className="check-number">2400</span>
          <span className="check-payee-label">
            Pay to
            <br />
            the order of
          </span>
          <div className="check-line check-payee-line" />
          <div className="check-line check-date-line" />
          <div className="check-amount-row">
            <div className="check-line check-amount-line" />
            <span>Dollars</span>
          </div>
          <div className="check-amount-box">
            <span>$</span>
          </div>
          <div className="check-for">
            <span>FOR</span>
            <div className="check-line" />
          </div>
          <div className="check-line check-sig-line" />
          <div className="check-micr">
            <img src="/assets/check-micr-routing.svg" alt="" width={71} height={6} />
            <img src="/assets/check-micr-account.svg" alt="" width={63} height={6} />
            <img src="/assets/check-micr-checknum.svg" alt="" width={29} height={6} />
          </div>
          <div className="check-highlight check-highlight--routing" />
          <div className="check-highlight check-highlight--account" />
        </div>
      </div>
      <div className="check-legend">
        <span className="legend-chip legend-chip--routing">Routing number</span>
        <span className="legend-chip legend-chip--account">Account number</span>
      </div>
    </div>
  );
}
