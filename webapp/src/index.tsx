import React from 'react';

const PLUGIN_ID = 'mattermost-plugin-erp';
const ERP_URL = 'https://erp.fstack.asia';
const RHS_PLUGIN_STATE = 'plugin';
const UPDATE_RHS_STATE = 'UPDATE_RHS_STATE';

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    height: '100dvh',
    minHeight: 0,
    background: '#f7f8fa',
    color: '#1f2329',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 52,
    padding: '10px 12px',
    borderBottom: '1px solid rgba(63, 67, 80, 0.16)',
    background: '#ffffff',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
  },
  title: {
    margin: 0,
    overflow: 'hidden',
    color: '#1f2329',
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '20px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  subtitle: {
    overflow: 'hidden',
    color: '#5b6573',
    fontSize: 12,
    lineHeight: '16px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: 8,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    border: '1px solid rgba(63, 67, 80, 0.2)',
    borderRadius: 6,
    background: '#ffffff',
    color: '#2f3742',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
  },
  content: {
    position: 'relative' as const,
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    background: '#ffffff',
  },
  frame: {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0,
    background: '#ffffff',
  },
  overlay: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#ffffff',
  },
  message: {
    width: 'min(320px, 100%)',
    textAlign: 'center' as const,
  },
  spinner: {
    width: 28,
    height: 28,
    margin: '0 auto 14px',
    border: '3px solid #d8dde6',
    borderTopColor: '#166de0',
    borderRadius: '50%',
    animation: 'erp-spin 0.9s linear infinite',
  },
  messageTitle: {
    margin: '0 0 6px',
    color: '#1f2329',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '20px',
  },
  messageText: {
    margin: 0,
    color: '#5b6573',
    fontSize: 13,
    lineHeight: '18px',
  },
};

const ERPEmbed = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadKey, setLoadKey] = React.useState(0);

  const refresh = () => {
    setIsLoading(true);
    setLoadKey((key) => key + 1);
  };

  const openInNewTab = () => {
    window.open(ERP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section style={styles.shell} aria-label="ERP sidebar">
      <style>
        {'@keyframes erp-spin { to { transform: rotate(360deg); } }'}
      </style>
      <header style={styles.header}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>ERP</h1>
          <span style={styles.subtitle}>erp.fstack.asia</span>
        </div>
        <div style={styles.actions}>
          <button
            type="button"
            style={styles.button}
            title="Tai lai ERP"
            aria-label="Tai lai ERP"
            onClick={refresh}
          >
            &#8635;
          </button>
          <button
            type="button"
            style={styles.button}
            title="Mo ERP trong tab moi"
            aria-label="Mo ERP trong tab moi"
            onClick={openInNewTab}
          >
            &#8599;
          </button>
        </div>
      </header>
      <div style={styles.content}>
        <iframe
          key={loadKey}
          title="ERP"
          src={ERP_URL}
          style={styles.frame}
          onLoad={() => setIsLoading(false)}
          referrerPolicy="strict-origin-when-cross-origin"
        />
        {isLoading && (
          <div style={styles.overlay} role="status" aria-live="polite">
            <div style={styles.message}>
              <div style={styles.spinner} />
              <p style={styles.messageTitle}>Dang tai ERP</p>
              <p style={styles.messageText}>Neu man hinh khong hien thi, hay mo ERP trong tab moi.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ERPIcon = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      color: '#166de0',
      fontSize: 11,
      fontWeight: 700,
      lineHeight: '20px',
    }}
  >
    ERP
  </span>
);

class Plugin {
  initialize(registry: any, store: any) {
    const rhsComponentId = registry.registerRightHandSidebarComponent(
      ERPEmbed,
      'ERP'
    );

    registry.registerChannelHeaderButtonAction(
      <ERPIcon />,
      () => {
        store.dispatch({
          type: UPDATE_RHS_STATE,
          state: RHS_PLUGIN_STATE,
          pluginId: rhsComponentId,
        });
      },
      'Mo ERP',
      'ERP'
    );
  }
}

(window as any).registerPlugin(PLUGIN_ID, new Plugin());
