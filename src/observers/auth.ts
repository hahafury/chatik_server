import {socket} from '../../app';
import {SocketEventValue} from '../types/socket';
import {Subject} from 'rxjs';
import {IUpdateUserReturn} from '../types/services';
import {IAuthObserver} from '../types/observers';

const updateUserSubject = new Subject<IUpdateUserReturn>();

updateUserSubject.subscribe({
	next: updatedData => {
		socket
			.to('user-' + updatedData.id)
			.emit(SocketEventValue.SOCKET_UPDATE_USER, updatedData);
	}
});

export default {
	updateUserSubject
} as IAuthObserver;