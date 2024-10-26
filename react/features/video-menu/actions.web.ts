import { SHOW_CONNECTION_INFO } from '../base/connection/actionTypes';
import { BAN_PARTICIPANT} from './types';

export * from './actions.any';

/**
 * Sets whether to render the connection status info into the Popover of the thumbnail or the context menu buttons.
 *
 * @param {boolean} showConnectionInfo - Whether it should show the connection
 * info or the context menu buttons on thumbnail popover.
 * @returns {Object}
 */
export function renderConnectionStatus(showConnectionInfo: boolean) {
    return {
        type: SHOW_CONNECTION_INFO,
        showConnectionInfo
    };
}

export function banParticipantIP(participantID: string) {
        return (dispatch, getState) => {
            const state = getState();
            const participant = state['features/base/participants'].find(
                p => p.id === participantID
            );
    
            if (participant) {
                const conference = state['features/base/conference'].conference;
                if (conference) {
                    conference.sendCommandOnce('ban-ip', { attributes: { jid: participant.jid } });
                }
            }
    
            // Optionally dispatch an action to update state or trigger reducers
            dispatch({
                type: BAN_PARTICIPANT,
                participantID
            });
        };
    
}
