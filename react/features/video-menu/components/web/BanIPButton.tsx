import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog/actions';
import { IconUserDeleted } from '../../../base/icons/svg';
import ContextMenuItem from '../../../base/ui/components/web/ContextMenuItem';
import { NOTIFY_CLICK_MODE } from '../../../toolbox/types';
import { IButtonProps } from '../../types';

//Mush 10/25/24 creating banipdialog file
import KickRemoteParticipantDialog from './KickRemoteParticipantDialog';
//import BanIpDialog from './BanIpDialog';

/**
 * Implements a React {@link Component} which displays a button for kicking out
 * a participant from the conference.
 *
 * @returns {JSX.Element}
 */
const BanIPButton = ({
    notifyClick,
    notifyMode,
    participantID
}: IButtonProps): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        notifyClick?.();
        if (notifyMode === NOTIFY_CLICK_MODE.PREVENT_AND_NOTIFY) {
            return;
        }
        //Mush 10/25/24
        dispatch(openDialog(KickRemoteParticipantDialog, { participantID }));
    }, [ dispatch, notifyClick, notifyMode, participantID ]);
  //      dispatch(openDialog(BanIpDialog, { participantID }));
  //  }, [ dispatch, notifyClick, notifyMode, participantID ]);

    // return (
    //     <ContextMenuItem
    //         accessibilityLabel = { t('videothumbnail.kick') }
    //         className = 'kicklink'
    //         icon = { IconUserDeleted }
    //         id = { `ejectlink_${participantID}` }
    //         onClick = { handleClick }
    //         text = { t('videothumbnail.kick') } />
    // );
    return (
        <ContextMenuItem
            accessibilityLabel = { t('videothumbnail.banIP') }
            className = 'baniplink'
            icon = { IconUserDeleted }
            id = { `ejectlink_${participantID}` }
            onClick = { handleClick }
            text = { t('videothumbnail.kick') } />
    );
};

export default BanIPButton;