import React from "react";
import manifest from "../../plugin.json";

const ERP_URL = "https://erp.fstack.asia";

type RightHandSidebarRegistration =
    | string
    | {
          id?: string;
          showRHSPlugin?: () => void;
          toggleRHSPlugin?: () => void;
      };

type PluginRegistry = {
    registerRightHandSidebarComponent: (
        component: React.ComponentType,
        title: string,
    ) => RightHandSidebarRegistration;
    registerChannelHeaderButtonAction: (
        icon: React.ReactElement,
        action: () => void,
        dropdownText: string,
        tooltipText: string,
    ) => void;
};

const styles: Record<string, React.CSSProperties> = {
    shell: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100dvh",
        minHeight: 0,
        background: "#f7f8fa",
        color: "#1f2329",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        minHeight: 52,
        padding: "10px 12px",
        borderBottom: "1px solid rgba(63, 67, 80, 0.16)",
        background: "#ffffff",
    },
    titleGroup: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
    },
    title: {
        margin: 0,
        overflow: "hidden",
        color: "#1f2329",
        fontSize: 15,
        fontWeight: 700,
        lineHeight: "20px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    subtitle: {
        overflow: "hidden",
        color: "#5b6573",
        fontSize: 12,
        lineHeight: "16px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    actions: {
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        gap: 8,
    },
    button: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        border: "1px solid rgba(63, 67, 80, 0.2)",
        borderRadius: 6,
        background: "#ffffff",
        color: "#2f3742",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
    },
    content: {
        position: "relative",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        background: "#ffffff",
    },
    frame: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: "#ffffff",
    },
    overlay: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "#ffffff",
    },
    message: {
        width: "min(320px, 100%)",
        textAlign: "center",
    },
    spinner: {
        width: 28,
        height: 28,
        margin: "0 auto 14px",
        border: "3px solid #d8dde6",
        borderTopColor: "#166de0",
        borderRadius: "50%",
        animation: "erp-spin 0.9s linear infinite",
    },
    messageTitle: {
        margin: "0 0 6px",
        color: "#1f2329",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: "20px",
    },
    messageText: {
        margin: 0,
        color: "#5b6573",
        fontSize: 13,
        lineHeight: "18px",
    },
};

const openInNewTab = () => {
    window.open(ERP_URL, "_blank", "noopener,noreferrer");
};

const ERPEmbed = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadKey, setLoadKey] = React.useState(0);

    const refresh = () => {
        setIsLoading(true);
        setLoadKey((key) => key + 1);
    };

    return (
        <section style={styles.shell} aria-label="ERP sidebar">
            <style>
                {"@keyframes erp-spin { to { transform: rotate(360deg); } }"}
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
                        title="Tải lại ERP"
                        aria-label="Tải lại ERP"
                        onClick={refresh}
                    >
                        &#8635;
                    </button>
                    <button
                        type="button"
                        style={styles.button}
                        title="Mở ERP trong tab mới"
                        aria-label="Mở ERP trong tab mới"
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
                    <div
                        style={styles.overlay}
                        role="status"
                        aria-live="polite"
                    >
                        <div style={styles.message}>
                            <div style={styles.spinner} />
                            <p style={styles.messageTitle}>Đang tải ERP</p>
                            <p style={styles.messageText}>
                                Nếu màn hình không hiển thị, hãy mở ERP trong
                                tab mới.
                            </p>
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
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            color: "#166de0",
            fontSize: 11,
            fontWeight: 700,
            lineHeight: "20px",
        }}
    >
        ERP
    </span>
);

export default class Plugin {
    initialize(registry: PluginRegistry) {
        const rhsRegistration = registry.registerRightHandSidebarComponent(
            ERPEmbed,
            "ERP",
        );

        // showRHSPlugin / toggleRHSPlugin đã được Mattermost bind dispatch sẵn,
        // gọi trực tiếp như hàm thường — KHÔNG return gì để tránh Redux error #14
        const openRhs =
            typeof rhsRegistration !== "string"
                ? (rhsRegistration.showRHSPlugin ??
                  rhsRegistration.toggleRHSPlugin ??
                  openInNewTab)
                : openInNewTab;

        registry.registerChannelHeaderButtonAction(
            <ERPIcon />,
            () => {
                if (typeof rhsRegistration !== "string") {
                    const fn =
                        rhsRegistration.showRHSPlugin ??
                        rhsRegistration.toggleRHSPlugin;
                    if (typeof fn === "function") {
                        fn();
                        return;
                    }
                }
                openInNewTab();
            },
            "Mở ERP",
            "ERP",
        );
    }
}

declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void;
    }
}

window.registerPlugin(manifest.id, new Plugin());
