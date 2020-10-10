import { IButton } from "@chakra-ui/core";

import { ModalButtonAction } from "./ModalButtonAction";


export interface ButtonWithLinkedModalProps {
    variantColor: IButton["variantColor"];
    triggerButtonContent: React.ReactNode;
    modalButtonContent: React.ReactNode;
    modalTitleContent: React.ReactNode;
    modalButtonAction: ModalButtonAction;

    propsForTriggerButton?: Omit<IButton, "children">;
}
