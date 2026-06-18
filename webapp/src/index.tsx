import React from "react";
import type { Store } from "redux";
import manifest from "../../plugin.json";

const ERP_URL = "https://erp.fstack.asia";

type RightHandSidebarRegistration = {
    id?: string;
    showRHSPlugin?: unknown;
    hideRHSPlugin?: () => void;
    toggleRHSPlugin?: unknown;
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
                        ↻
                    </button>
                    <button
                        type="button"
                        style={styles.button}
                        title="Mở ERP trong tab mới"
                        aria-label="Mở ERP trong tab mới"
                        onClick={openInNewTab}
                    >
                        ↗
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
        <img
            style={{
                width: 20,
                height: 20,
                objectFit: "contain",
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADoCAMAAABVRrFMAAABy1BMVEX////19fUtqOARcLYWsJqSXKDdNkDxiVcAAAAAaLOOVZ0Arpfwg0wAq5PdND74+PiMUZsAa7QAZLG2lb/k9fL50MHgT1fxhlLePEb62cvwgUncKjbAo8f9+/jbIzDbHSvs7Oy80uaSAAD3v6cQot7znnjx9vr42dv97uiowd0UFBTKysr4ybb65OXwfULn9Pv+9PD2tps7gL1ovOey2/IAc2TnhorykmT1rY7W7fiVzu3xuLviXWTI6eP0ycve3t6VlZX74NbazN9dkcWc0e6Axerrlpqn3NPlcXfvqq1PvqwWjn3aDSBGRkbzl2yaaafZZjmle7C7nsPt5e8AVpHNuNPyvb+K0cXqj5OxJCg0NDRYAEzidEfg0+MAW5P1r5F2o84AWq17zL+c183men+/KjDgysq9gICuycVamZDNo6Oqqqq9vb1aWlrOP1d3O3eCPpPZXSeJr9NkIFoAltrXAACqAAClOTqWFxauWlrA1dK+hZZcu9AWmYfZurogrbd8gq42iH+3cXGCrqqFhYVUVFTNNlA9PT2liJ/GtsR/T3hvMGtaY6neelV5RXKdf4hwVKCXdJG1nrEAR4pDe6fvcSg1c6J5nbsAQqQ5ICHCAAAgAElEQVR4nO2di18iWZbnL4JaPCQAUeQRKAWEWAUCaiuoYCG+YHK1TBLNzixTUq3tR3V1Z5FV29m9Oz07OzUz1VVTszvTXVXz5+65N+LG80YQoPnoz8djikE8ML6cc3/n3BOBidC93du93du93du93du93du93dvIxgnFqmhFgXvbJ3MXJlTX9vZXV8fGMmobGxtb3d9bqxbf9umNZsW1zdUxiYNlZNPq5lr1bZ/oUFZdI1AmTHq+1b2/DboiobIBpcYbW117x0OzuDcslYpu752FGx3r3YZbW70VFoVbXXvbIFoTwF23xpLgxjbfHccV95nu0qqjffJMZv/dEMvqKvukM3vF6j4ZeXh7piqyYR0cy6xtikPSNNmtvn02My7MsrmKMptr8G8ss7+GxjYz+6tja3sZyHarq5m9tbGxTcgQ7yzbmmmUEbJVtLlZXBPgBxpDY2ubUDjC9+ra3l5xrbiK9pDZ0YD2lsmQ+bteLVZXV4tfrm1+iTbXvgSyzNp+EQIQ3AyI+xk0VvxSMCd76zpSNI9GyAOrxcy+UC2OoTWUKVaF/bViEUrFTaiTBXCdkDEly2y+NaJFurBvhrYqPmRWQS5W9+DZJgjKPuy+CdV/Zn8TbzT1+Bh9+Tc+53n84Iwump6cxgdjwwg/qCd9de/VG+VanEv6J+gTcxG5hdEXP5/yumpvDuxg3j8xkTygT++eK0MlPzzlcrmmzt8QV242OQHmT5akFdU7d9o+/V1trwujucJvAuwMApFY/IiuMtcBxQvD0GcE6YVr2GVg3qnD1w/2eF4Cm5iYp/poqvzKue5BpWUbbI/+MpdsU69bSLjt5IRs/lm6enMAGslO9pWGvuzhlAqt/Vr1vzARn1DZ/BbdMMgLWBEkp2XWzAsPaQf6NnpdKvO+zsFWT/rVYBN+P90ywB/kZKXlVcRZ7ywXjFcaMnDba5P/rXktGIiITeXPjK1VqcyAOuxbjTm5YAxPuXT2unSk9WDCYPMFaaOl8oPLFJFZs949o1N8Ldr16wA7mDeCqZTfyg04vjZF3c/sjxHlG1ww1gwue00S+ZgFBk6rS9sFc6eRUVbc3CTwaxksJ6Y+UwpGBtdrQVtng6mUf888wOjZ4j6B6ELznenLXbNc9hrQmKFILNmi+1j7DO1twuyFtAcy8KxqsqumYHwDaOZgE/44zaCmyi+Sre1t7u2R4UXUj72rrPgM+ZDR7rBAbpmDgYg8pruZqQKNxqI0QyNlIXtPfcHIRrszhaxbgU34Bys/jTFafJgFo1IwWrjMdXd5bdGQoHVo23RP08aBeB1NED2Fz99EQegLHVq5zHVX1Ugpbg1mQ/lXkSDgUBTEiMW7MvmVFoE1GKDdRQ05Owhswj9H9zUTc7wNoxUhYRORYBbFpgWj0byu24PdxAeBDVb+zGYVjzSQ/E1yraXKnKxZFIwMtPZtwSxlUXZafEDjAEaZ6jUF9gUOq4KREY+31P5FO2Cg/Ov0ANN6UP2q7D1sKb4K7VYqws8NHGSiycpv2jjYF9bGODzaqkUm/aCCkWG3mWTbGWRiPNpSfoi3VdN7DugLmBWMBrvNUNuyF4vEabRlzJmFo0hnuoUWjIJdsNsk7FLSZixOqJV/tJbxEIqvQhs1qx3ZjUVsNmp+K2cOo/i3jscz+7GInTY/uGW8YgomX1Oypfi3jEd+YFWltfgNPdJM+VeCTjM0euiggtGANoo+rg8Ti9gGtYxXgm4TtBEUX7JR4tFmjlaZovzMlvGXwWB1JcgMSFk+zoeKReK04fP1No7FeNLvtyWQfrzTvNXFwi+D7hS/4GSh6VoE3qkpE0CvF2914S/ylDwOC0bkI76+mDwqzPkxIHxj0Al/Mg5P4DsZh8cJvIRXb8OyP06PNip/xhlK8Q6uGAx+aSDTFozeq3C47RUh4As/ettAAauur6a87Zrr0FXz4l3DOEMMLSITxAmLpe0t7rG/tTUbPzg7SuLv7bMD/9xWKzm7dXCwNRFvbU3Mtc62t7kbOMK8ZQxgS7zD4eBTbgOavkWA2ufhqfPDtvfqEL6m2ofnU+HDdvvweuqwduhyXbXD3vM2ULVr4jsxHFiLXHJJFrYOFrda/oPW4jY6QA8er5eSqFVarx/UD87qhcXFFizU1wut0izXmsP+NGscOEN9DIbRQkHtNt01Je9VDVx1FT7kvOgavqbQdfiqVmu3r8JXh7Va7arWDrcdbe7axbXJEd7huiJk3Pjj3FG9cFPfBobtwlfIX6hzs9xXgFKvr9fXW62Dra1CvbVef4BgMxmX7JZxxunuiWCAthRyatHoIaLie9vhKfDW9RRyAdUU8qKp6+tae+o6HD4/PHdxhCzcrk21Ua0misgwyi+6zD+LHiDguilsEbI57oBPFhbR+lb9bLb+eKt1cAab1h/Xk2gOnc361covNw4yK05n0N2kYIDWDwWDzhUak7J80GtKU+FauAanHZbIuBpq12rntUMgC4cPCRnnQocu7lB6L4aZqfklPTyKb8/6j5I3B3P+7Th8HWwnD9ZLN8n1xxPbc7Ozc7PJo4PZuW3YeHRAJjy6i4VfrgBVKNjsO1TG95vOkNstwRkLRu/5FWjGucvVBp1oT6FzGE7nbRdeewVpoY2/ptqwdC0VLF77TmvRC5t+LOeiAOKf/rg/3iq0kkQbieFVdBM5QlU+greCIWdzqcjzvEODxvPFVM8JrlvJsApGoov4myjiofSUrqXr6bOhRppfSWGGZBZPWiY4v5++gSnwSzMFGJyDYRzvSPXAn336OxkFo0hnpyliF+xMuRbtn/VLcJgWe8fvn70hTkqy0ZSWcbO/wKaS4YQlp1WLoN1uu2xNamznNLkP50/OF26SJNDiOC+THB2fbcWTE5DPHrB9RxsHnC4GWQYOlX4nwxGHKFxzXZOaw+sSH72SGXa2B6ZUjMlFDh3dFAqzfvAEfzPLFWZLaP2onlwstLZRwRiqxGmkfLRyls51ePdrxvVNyNBTUHGEwZ+gllAghl1XELVtXKLo97VXPcrND/926avCduGgDk6qPz4qrNe/qj+eLR0tHhUec9sFs6b4//gTQra5RDbH37FDDCu8AJmtDRlbcNWuwhCgNcjX+tC1V/IrPQL/LDdfOCocPJ71J+sHN0D2oH6wTchubkzJXr3/++HAHA70q5/9jHG5HXx2hcnCbdSWyK6ugOzKqDa2+gYtRRridVSYuymVtoGM546OtpLbJe7mZhHqybP5QonVF//01ft/WDA4Bet+UfqQFs9SS0D7e70frnFaq7kgDl21cBgeAQkJzGi0pyHq802CxBOZh2icBwUBTUk+KKzDqrifqf4A9gvdGMP6Ln2sKSN9gCkl6NUF/ZKBJuUxrB6ijnjxBMdkkjMYrMCccfq355QYNZ9sA9ifkBZLWDO0GMnnl4paz6E//uxnjMFm22yE4wH7vK2StxrsvyMNV9XsMyUAV9WwcbdDs1E8GgePX9vqgVA0KUMwmOpkOc78Zn4CN1ZVxyS3cDuvDR+M/rn1bZUf4wetVmtrmz3GNGCF/6niEodYRvshwsz/CqsP2DGONfs2MBxb+mAkV5CO/NRZSbHEMDS2Pv35K80Y47hW8kGTUo3t71WrAqwWqtW1faUJ7po6V6PhgPz7EeEGlsUGZ/jxZBJXknGYZ25tnc0ayAgU2Ktfq8AWtpN+/2/FoNsrqpSegxRQ3BPD9B9A99oqt3GgkNjYeF7ND8PWAcm6ZAjGeBLKn6MkLrVQoVAobWvJXhGqV3/49Z8WONUpLorNrP89ltmvMupHnq/izz+RNoa3pjpu4Y+//Kd/lPD05y6FW80EbUqwAlOX+RLYUetoa7sFiplcXPxqHkxL9vNXf/gFQCFOxeVAZ2J94o+vFs3KYr64/w/iOU4damQHXuiPv/wV4Gk8AkkbHZ6D1ZCLURG7BiZr/fjBjbZcaRGKST+QkU7dVh3siAbtpzgz62oK1BLBkrOLVuU+X5Nqialr3QtwHKQ3tc+87av2ObqCqhEqyKs2o7zCrSFLMv01TrmFCHWHSDYx/wBMeQNevdLXStJlN//8Yz2yzjjufMroNfE1fqWWSeMYYsajFVhOP8yMZET1W4rQ/Fwj9fh868Rj/uTZ4MKYkwbNVE2HtqAJRqM7WE6z1H3DMFPI5h/UFx8wVB+Ho+ZkC0mxo7doZ4rGhelZafYGkfw7U7La4XWNSWY1STOUVjLZzdZZqXR2dlY3qP6rV9pznRXBCvbmnhTNpVmrDUYNWQ03RqZYzRHLAsuYzejd3TeLBY4D1S9s68m04YjWk/Y9JqKJ/agr9QELOmVUyA7F+0AOWRJikdF4Rqtqi3wErDCHo5Gh+iQc1YmM3EY9Xx+iWyDOkNVDTReMKrIwaPs1TEhReLiZDGMG43/AoTq5ZM1W/QmtOoqxmDwYZlbNSfdJqNZogxG8UauBPNRwex93RWoQeKzOibmE1I2dNnzLaZ0UjiaqrwlHjkzI/dtD9kGIHqiymi4YcaLGd2viCWgNtdu1cO2adaneQkIM5TCDLN7a0tX6P3//1/I5ka5k0qZ6yCYNNZn0j7rSCqKxjSfTNSSR4ZNldF7Ni2LGLTsaMpbq45bOAqd2WXyoWCTHkdDyyk4TdD7D46xGAnKqJrhcV4dcmDXQLKoQxqxLTVZi1vqfvv8HSkJKGL9/SC6MJp6ZHNT6cSbrefsKHbpw05HVVLYQR0YjQEW2VWDU+upg5OpiuA4Zi/hIcr1Ilke9NrrkU66BSkBgwqOBy2XV32c1d2ASsyVOPZPz8yzVf/X+jnRCJJr9cUNTzo6RcGzT90QvIXLktb3eMAQm4ph3xJheI2S2rfxHreRjVW1iUP1Xv9foR3x92FFGvETul1A05B+NnVX59NvXh1fsuw9MZZ99Cwi+aKZWlqS2w/Pp+/9HQhGDcZgkrSKracPxnyw6IsxLFiKZmewz0tlg+1QZZtiz/jlV2pZNeSK1WbXPHJKGyCWWYaDZM1OyrVHIlDzNYWmN38jByO08+YDYe5/Dk8/E5c9/g7dzX5MnT77ekeWQXCijA43bGYnMazatZiTqwfbqfTkv475kckt2A3ryHrUdbkFe/hzBicvPfkNZiDrKA82hr0LskZlV+wdJ//D26n16bkSA5pUiH8GJ/zds//oR5wCyD548efIBrPuM4z4Un2E0muXFT7vX6LF3TDZrbnNm9ur3soDgYJ5XVAHIPhBfGE5+ATsL7DfvvfcEYbKP8PqvMad0uEZCEIjjCHbHn02jIwUPU5ipasnoE0ImhaiDkHEOEpVf0zeGvOlygcWZW9jCXg8ZHqb+WS0Zt4CN+gyrIcQjxyTDudcrt4zv9hRHNEqGh2l8W0MmGZw9kP3zws7ODsTfP8vRuPC5KhqxOCoz63fijzzKZP/y29/+yw2L7AlyKNr43oeiguB0AEb3fpfJEp7xcc8pryb74CNiO5xC9gEkNEwmY9LDK8ux2HJZeFfJxnVkiNYgQPavn332RNQRTPbkc7DPFuQcIWQjk5MRmextQxGjZN0AkJ2wyBxU9XfEQUfHmfqKtnAMZL7061GQ7vQASzDsm2+oBOxisoCWbOdDbAucpPokDD9DVBvVJgDYpG+GvtiMtUXZ1jAhSwQ8w9vTp1S2LwhZR1ODSLbASfkMfUZqLQaZIwZksQbN1J984Rveli/NyPBAGdZePqUzzQVCtquQfa2qGx1S5sIrP8R57DMtGdcgZDn69OOPJ4c3X9osGgMjkH33lNbr3Ak89SRUs5jPRGn8CASQ+/Aj8R3gPoIimPuNDszB5X343OjT3Bef3CXZ7ihkv3v6Z+kk+Wnsc5WEKCUSWZZXqp/Jw4xIY1aSRi46GlnehOxiNLJvJBZRHAMdx0hGBCRPydIfj0QWNSHrjEI2/vJbKiHk+EB3pG7BDA7GWI4GdvbjyAhkMTNt5EYjkyWExwNt/GQUMhKMkxvyoZ+YC0jEnDmWMyFDo2gjSAgdaFI4XozQb8xhZZTzNNcwH2a+StqczAwMnQzmCIzr8WGg0TKE6L66dLTtsgp2xLKs+WWzYRaJlRHiYz4TNFOy6YFO83TQqX6nly+pk0R1HN5postkZXRw3zOD0ReLZdOl6CSaSUdiMQZ21pTMRqrGlYpu1XdPaXYWNWT8dFgycZTJBYhJMPrSpRksEfhTl5VSbmMyonNdpGxKNjihdRPd7qmB7M9yrhKdNqQ8CjOiy+RXmTGSgW7EeNSg4gdlVNp3nNeKiWk6Gyz7nml8aVfPr0QjdZqqeLRhXI6897LLwL7QRGPEF/NlK5PL/MxGPifaRhallxuoofGaqejDWQ+IRs8pw7O/e/ofyjyaf0he4mQolx2TLH0pyGvU6SwS8x2nySln+TTMTUWLTDaO+XIjp3FarGRKNlAcCZmuvFSGGTkpybn29ZGriG+8epUSjpEKUPHRch5VNvh0pVSqHF9WwHwbPMSkLmTNwQaKo2f85FQv+y9fas5TLNECttGEckwfi5A+5FLfl+fLGzFfLI98yyhdLqfL2Xw6nS9jsJxuKJpL44BqHxN5EmQkqeA0wQjGJ4ZC49IxUfcEzVo5HH35xrIoDhEgyzYa2Uqj0YgSMF0xYiEg1hLimcYnTMg8p0rYaoPRQZMaoA24n0xEuIyJb7egXS2HI5DFsIZIZLlctpLL5SMETEdmISBg5mSBXeD2jF+g04AnoSrEVMpIT0vM5Z6TziC3caVjMsYix4Y3gaoj9tmxr7wskpFoTGeJxwypGrKChRkKDIWsiy5eTKOLLtqFH3LxrKqt5PN1nIhonq71p7SEGfFtjxwbtiEajkBWLqVRJU3IwF+gIMcY7Lisc1nk2ArMfKAFurvd7u7JdCBwMv3wotvtnNBg/KbDIV4TeRRtPHBaNWXj+GJWfNsjGw7tjXLY6AQNyLIwqiSfbeTzx5HlHA8e49O6CsR0Qj1goAVIn8wj1oXEuzQYnz59+u03f+44VLemctyp+Dr/FuoVmWzA1Xv+C/Ku+7JaKkcjf/n9Fx9L6ghkGzMRRKMxP1P2VWbyOV8E6cmshxlCpsEoyFs1ZOO/+913GO7py2+/UdqiDk5USPKx3JSD1/mE51LNUNDpJNViWb0RoD7GVJ988okcjeloOr8hRmM5lysvN0ppiGIDmc8azDSjBXY7YOL46eJFTVIX8f5ddY78BaSGf3M6MZuzl6ryilWXek53EG/5v75IJKpSRe57kUo1goAMZmTRvEgWy2YjsY3lZZ/PpyeLVAaQmfZCAi+6AWmb58XDE+Nunu+efqsSE84x/f/w6YtwoeBKr99f6vd7K8GQW17/fcWhBst+/Il+wgxy38hDzZhGy8t8TtVL1ZP5ZgaQMUtHMrw8pPbykGmzA5eHHj3dS23S5lMrIcqAMURTrQit7KgjUaiw5pvH6SiUg3wJlbLaslCnjT6LotE0HD1dPHELIIgvz3QXFl90pmFufbqrLzN1aBwvDiemAVdK+2GmCrtF4PPFItl0tJHPHqdVVtYFo1VpJZpxjobnLqeekwvUOfGcQGLwjHeRY9oDamkI3ZdPv9XqP1/tOxlweOzpPqSFQ5EFJp434MGYVHe69aXVoGBEjDLEM+7oBALo4mQXnbzo4O/OaRc9fNFF04Z9Xz799wWtEPKOVH8l5HYHqbndoZW+QS8d34/UYZTNugBhh6PnIdrdRdPjARhXp3ixSxYDqLPLGdPfd09fXuiKEvzB6tRSv9dcga9ef4nxuXih8fHtwAYqIzb92Xq6eC1pkWhmnnjRYZRIkP//NOZm/AkmyRiFMpf+4nZgA9O0aCfmZNODyaCS/M+hP3V8aQUWMSwwzA6YoXY83QWTcGHpQpqldGGZ2ewClRniI/DiJWmLk45kN/APH0Sc6T6WUzPFDCktEKA5mix6DIvavS/EV3HYoeOkS+0zujkJ78PtRR9uMfrSWXiMzCz7ZvDTCNZIsk1NNjCZifZwpC64ZGLEYktxlpMYLC1ciu58HNGTxWZQA0qP3PFMpcKXJlFjoxERnx43lhuaUt+WfmAb7ZoMdRm9eJ76y7Ofdkz+OoiDaMpO/9lf6B8+acR0ZJFjPpar8JPRdONyJpr1oY0Yv4Ei0XS0nM3BlzqAl02vVOhNPf/0sGPOFCxBX2Tl2bNHj/66tMNQQ6yUO0t/ffTo2aMm3b2icRof82VLP+Qu+Ui03ChPlvlj9MMykP0wI5KVyqriykb9wXCaJ3FxAaBEGcUC0iMW/PinR7NKNPoaKbfT+QzD/fhTakdbmHA7qZ9+BKxnz5zOEI3H0rJaNXDLrYFyy+kSX45W8nwpkkOVUiSKYF4No9KX41VNVHuSr3daoNNNIM9J99Rz2j0NPEyMjyceBk5Px6dhOTANSXs6Abk8Ie++S19CKqkI3KNHqtKXT/3lkYSFbYUeoKndY8vLkVgk5mvk+SwWjdhkLAIPvlg0HYPSahKej+IytdMCnYfTKOBIcONctzvd6Z5cXHQSu90T7hR1p7mLDqy6gG9pHiqmcmx9t1IlYjq55uJ2FCps7iV6CEPNI8fprCZKI9ljw07DuEzltECngxIBtNs56ToS4zDh5DzTF93EuGP64sVu4sV4t3NxAatP6d7S8UUVGGH7UUoC3IIaixj9tHBUdgOUvvJiRHuVM2JI2EO5TOW0gOMUfMYlup7dBHfa7SQudiE+O13HdCfw0LELPktMT8NqcfDJit/U1ffPHv3IUTAdmbtHD6Lu8WWjeZGAcPnSlYgK0FfOqp9OLg/lMqUu9kApPD1+2k0EHnZPT7p4CpPweLqwDPOYRPcEvvFq6W1Q/iKUft7y7NFfcfeR+/GR3mXOEFX+3LIUgqjcmIkdlwHxMpa7jFSOY9lLXyRbJsXIZe4yVqn4ImXxjbCdy6jJFaGH/APlx1NoWQwDilQGZG0MdOnRK4YZGaD9xDu4vxrBnEFZ+S/FZlZ+xlfJHpdmclk+mm2UytF0mc9Fs6jBR0A1G6iSb+Quo42GOMps5zJqhkubg+2EHrvkNpIB2hL6iQGmVn5KtpHLVYBsI9fYyGWXIaVVfHw29wO/ETku/dCo5GCGXS6R64I+8+ucpqacsWfccNn9RH/hc1wuGBES2B0C8BoTTKX85BYlkITLaDRburzMphv5Rj4bTcMj1B2QqiOTqFyqRGfKx+lLRGRyeDBV24ALBBwnAYg5j1gFw/d0V1oKjNMaRVH8nknvwyAe1BTl36AK4vPh2iManTxulCtZ30x0Y6PsS2PsRn5yciZ6XGngBBgzu2vH0mTlR4EAN34xnkicOjod7hQeT6e7Jx2Y7nQ73cCuQxRGWfGrBvmQ0cw2uKn0iMpPVB/y8yT8xLU9WQCtjNBt4vqhFZ+aLCL4iccBCohb+4mLwEOYmO1Od06QhzuFjP2QzN1UBaNZu8rcgj16cNZqemkwu7MXvdEpKHrxghvHZPjOgoe7AEjIXiAPSiRgYiomP3qUUfFtWIj+fUrDxSMr0pi9CSfDpHjsBAKdcVD06W4i0Z3enXY4Eg93Ty8C3IsLR2dcvClJUfwRuNTKr+kj4nknBCO+rQUW82kfVJDK9hFjEZsUj0QbSfrC9b2UyMhK8cquR634faPiu41mdBpVfl7lJBD/Sb6RzeYakxsNmHOmN6LHuYbCPWIsYrN9L6csH4IxFhXlk63ISOV0W16pGdO5S1+pPFkqz8xE8+V0PspnZxpyN2Q0XaRm7JUyzbxgVKsDWL8q9FBqCVUNXnPLf31zQ2lWpUvZ0uQyP1mONiqRbL7ET07CtEaqH81uh7ZpJ7Ym1EqLYIDLelWhiVJ9JDBiltb8cuMAfMZDdZXO86gC1WE6n07n8jlenMdENm4HhgQ7ZJYFIyMYEYuMofy+442ILyv+2MAX632QxSW19A1dL+rN1s3FdGdWwQhkzhXFevghxSAzU379dOwuBplog+91V1oErEoYyEL4YqAbX5MJulFqZcm9xCILyuVj2ezOTEUWrS+327RBKjKgYASyYLX6/PlSCqctGGKQ8phkivJbtYzFUBx2UmZi5jeJiC4zaRGoyGBbFesmLPSe96vP2WSK8utbxjq7RYrWmaVAeh7S3YyKL5JxPYQ9hZoht1NoPseyzyZTlP/YymuRDRsXy+wZZ5ifqcnMWwQSmdCvroRCgJdKgVdSoPpmPnObtIy1YJFb1B56c1jE4qCCEaKx5wRvunFp2Cz2BfQ8ZEYWNGkZa8BGLfCHRbMqGCnZc7IQKkK8htzNfpCtjWQfuXFg6rTIrROZ1jpmLpNbBCbnSlRfIhMwYjDoNCczaRmr7PYZWm8O5lhTCkazFoFC5pR3siCzbBnjULxzMEBjKaRcMJq3CGSyquxYCzJnkP6+KOuzBpN3OsaocUY0VYvA7EwxmTsUCjn7qX6/GSL2nFldSbtbKH9k47WAgZ0aqhG6hdlhlAyGThGM/G1syaz217eMVUMse2d5zGC6QksuGDlzLlwPpvRmpqNkd13LWLbYHZVUbNOUx+xrSqwI05tld0tRfo08Lt9JEWxuF6rrm0rBOEq7yty0LWMqincwbbE2hzzYrFoEaheQG8gks9WKZCi/77Vph9oe0hs4BxSMElgxGOwt4QAMwkNzBfK02+lkdK9UFtS2jGGI3bLnYdfEiLRsEagcUO2Fqr1mtR/qVVPuVKrnhLoYNMWSrEdfOht5M5FIjdzabX1NSXWWqRAKQSncFHrVfiq1klpaSi0BoJVpGgex7JuIRGrdwIuBBSM1oQ9sS6mV4gow9Z6nUkvgN8HS0U5F+X2jt7hHM4dcfZgWjJK5UzDlrKaqbgHIloRUr1jtLQ0iU1rGb9RhGjMvGBUHgHqAdGAW+OleacKqgRds3haPYjauKQWditxLywMPYnYp36gt2UvS+G724FDX1dzWf1T+9Zv5beua02w2IZf1mm7nCvjYzqXD4PP+4F/+eq1qg82dEopVJ6py/eeo+Lw6+BJbMNSsDuXkjsgAAAEJSURBVP7Vr91ssKFQqO/k/qsHAll1CqxrTO8gF7Ziz7paWhFCwedY7ZrNaqoHdYjVO+EO9YoDf+MbtKUVC8cFhWZTcOJKpJfqQeJeMt01GFpZeif+iJfaqr2g2bwr2BQEqDtCzVSv7yyu9Pvs/eD43rsShlrDn5djw+Ey3+nGpx6EWQ1T/oNuAH/bBFaG/89H6ykzm8rZe6exRKv2m0H7dOT/+1x6N4OQZdUl8r+RWpYd5GNNzt7fEBU1IbXUb4Lahdyqz2iJn9Nyh0LOlWZ/qfq2S6jbmCBUYa7Z7/WaovV6fZimVYW/ZaZ7u7d7u7d7u7d7u7d7u7d7u7d7u7d7u7d7u7d7Y9r/B14xRDxz1sZcAAAAAElFTkSuQmCC"
            alt=""
        />
    </span>
);

export default class Plugin {
    initialize(registry: PluginRegistry, store: Store) {
        const rhsRegistration = registry.registerRightHandSidebarComponent(
            ERPEmbed,
            "ERP",
        );

        registry.registerChannelHeaderButtonAction(
            <ERPIcon />,
            () => {
                // toggleRHSPlugin: thunk     → (dispatch, getState) => ...
                // showRHSPlugin:   object    → { type: 'UPDATE_RHS_STATE', ... }
                // cả hai đều cần store.dispatch()
                const action =
                    rhsRegistration.toggleRHSPlugin ??
                    rhsRegistration.showRHSPlugin;
                if (action) {
                    store.dispatch(
                        action as Parameters<typeof store.dispatch>[0],
                    );
                    return;
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
