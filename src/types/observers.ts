import {Subject} from 'rxjs';
import {IRoom} from './room';
import {IUpdateUserReturn} from './services';

export interface IChatObserver {
	newMessageSubject: Subject<IRoom>;
	newRoomSubject: Subject<IRoom>;
}

export interface IAuthObserver {
	updateUserSubject: Subject<IUpdateUserReturn>;
}