import { IconBack, IconSearch, IconTree } from './ui';
import type { Scenario } from '../types';

export function TopNav() {
  return (
    <header className="top-nav">
      <img className="top-nav__logo" src="/assets/wex-logo.svg" alt="wex" />
      <div className="top-nav__right">
        <div className="top-nav__search">
          <IconSearch />
          <span>Search</span>
        </div>
        <div className="top-nav__org">
          <IconTree />
          <span>Johnson &amp; Sons Delivery Services (L3)</span>
        </div>
        <div className="top-nav__avatar" aria-hidden="true">
          JD
        </div>
      </div>
    </header>
  );
}

export function Subnav() {
  return (
    <aside className="subnav">
      <div className="subnav__header">
        <IconBack />
        <span>Billing &amp; Payments</span>
      </div>
      <nav className="subnav__links">
        <span>Credit overview</span>
        <span>Statements</span>
        <span>Payments</span>
        <span className="is-active">Payment methods</span>
      </nav>
    </aside>
  );
}

type ScenarioMenuProps = {
  active: Scenario;
  onSelect: (scenario: Scenario) => void;
  onReset: () => void;
};

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'pass', label: 'Pass' },
  { id: 'fuzzy-success', label: 'Fuzzy match / Success' },
  { id: 'fuzzy-fail', label: 'Fuzzy match / Fail' },
];

export function ScenarioMenu({ active, onSelect, onReset }: ScenarioMenuProps) {
  return (
    <aside className="scenario-menu" aria-label="Prototype scenarios">
      <h2>Prototype scenarios</h2>
      <ul>
        {SCENARIOS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={active === id ? 'is-active' : undefined}
              onClick={() => onSelect(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="scenario-menu__footer">
        <button type="button" className="scenario-menu__reset" onClick={onReset}>
          Reset prototype
        </button>
      </div>
    </aside>
  );
}
