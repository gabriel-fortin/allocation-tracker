import { IButton, IModal } from "@chakra-ui/core";

import { ModalButtonAction } from "./ModalButtonAction";


export interface ButtonWithLinkedModalProps {
    variantColor?: IButton["variantColor"];
    triggerButtonContent?: React.ReactNode;
    modalTitleContent?: React.ReactNode;
    modalButtonContent?: React.ReactNode;
    modalButtonAction: ModalButtonAction;

    propsForTriggerButton?: Omit<IButton, "children">;
    propsForModal?: Omit<IModal, "children">;
}
