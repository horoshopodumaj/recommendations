import { useIntl } from "react-intl";

export function useFormatMessage(messageId) {
    return useIntl().formatMessage({ id: messageId });
}
